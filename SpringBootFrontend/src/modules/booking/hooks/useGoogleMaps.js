import { useState, useCallback } from 'react';

export const useGoogleMaps = () => {
  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const calculateRoute = useCallback(async (pickup, drop) => {
    if (!pickup || !drop) return;

    setLoading(true);
    setError(null);

    const directionsService = new google.maps.DirectionsService();
    const distanceMatrixService = new google.maps.DistanceMatrixService();

    try {
      // Get directions
      const directionsResult = await directionsService.route({
        origin: pickup.coordinates,
        destination: drop.coordinates,
        travelMode: google.maps.TravelMode.DRIVING,
      });

      // Get distance matrix
      const distanceMatrix = await distanceMatrixService.getDistanceMatrix({
        origins: [pickup.coordinates],
        destinations: [drop.coordinates],
        travelMode: google.maps.TravelMode.DRIVING,
      });

      const distanceValue = distanceMatrix.rows[0].elements[0].distance.value / 1000; // Convert to km
      const durationText = distanceMatrix.rows[0].elements[0].duration.text;

      setDirections(directionsResult);
      setDistance(distanceValue);
      setDuration(durationText);
    } catch (err) {
      setError('Error calculating route. Please try again.');
      console.error('Route calculation error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    directions,
    distance,
    duration,
    error,
    loading,
    calculateRoute,
  };
};