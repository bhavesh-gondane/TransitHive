import React from 'react';
import { Card } from 'react-bootstrap';
import { GoogleMap, DirectionsRenderer } from '@react-google-maps/api';
import LocationInput from './LocationInput';

const mapContainerStyle = {
  width: '100%',
  height: '300px',
  borderRadius: '0.5rem'
};

const center = {
  lat: 20.5937,
  lng: 78.9629
};

// function LocationBox({ 
//   formData,
//   onPickupSelect,
//   onDropSelect,
//   directions, 
//   distance, 
//   duration, 
//   loading, 
//   error 
// }) {
//   return (
//     <Card className="mb-4">
//       <Card.Body>
//         <Card.Title>Location Details</Card.Title>
        
//         <div className="mb-3">
//           <LocationInput
//             label="Pickup Location"
//             onLocationSelect={onPickupSelect}
//             value={formData.pickupLocation}
//           />
//           <LocationInput
//             label="Drop Location"
//             onLocationSelect={onDropSelect}
//             value={formData.dropLocation}
//           />
//         </div>

//         {loading && <div className="text-center my-3">Calculating route...</div>}
//         {error && <div className="alert alert-danger my-3">{error}</div>}

//         {(distance || duration) && (
//           <div className="d-flex justify-content-around mb-3">
//             <div>
//               <strong>Distance:</strong>
//               <p className="mb-0">{distance ? `${distance.toFixed(2)} km` : 'N/A'}</p>
//             </div>
//             <div>
//               <strong>Estimated Time:</strong>
//               <p className="mb-0">{duration || 'N/A'}</p>
//             </div>
            
//           </div>
//         )}

//         <div className="map-container">
//           <GoogleMap
//             mapContainerStyle={mapContainerStyle}
//             center={center}
//             zoom={5}
//           >
//             {directions && (
//               <DirectionsRenderer
//                 directions={directions}
//                 options={{
//                   suppressMarkers: false,
//                   polylineOptions: {
//                     strokeColor: '#2196F3',
//                     strokeWeight: 4
//                   }
//                 }}
//               />
//             )}
//           </GoogleMap>
//         </div>
//       </Card.Body>
//     </Card>
//   );
// }

// export default LocationBox;

function calculateCost(distance) {
  if (distance <= 100) {
    return 150;
  } else if (distance <= 200) {
    return 100;
  } else {
    return 80;
  }
}

function LocationBox({ 
  formData,
  onPickupSelect,
  onDropSelect,
  directions, 
  distance, 
  duration, 
  loading, 
  error 
}) {
  const estimatedCost = distance ? calculateCost(distance) : 'N/A';

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>Location Details</Card.Title>
        
        <div className="mb-3">
          <LocationInput
            label="Pickup Location"
            onLocationSelect={onPickupSelect}
            value={formData.pickupLocation}
          />
          <LocationInput
            label="Drop Location"
            onLocationSelect={onDropSelect}
            value={formData.dropLocation}
          />
        </div>

        {loading && <div className="text-center my-3">Calculating route...</div>}
        {error && <div className="alert alert-danger my-3">{error}</div>}

        {(distance || duration) && (
          <div className="d-flex justify-content-around mb-3">
            <div>
              <strong>Distance:</strong>
              <p className="mb-0">{distance ? `${distance.toFixed(2)} km` : 'N/A'}</p>
            </div>
            <div>
              <strong>Estimated Time:</strong>
              <p className="mb-0">{duration || 'N/A'}</p>
            </div>
            <div>
              <strong>Estimated Cost per Km:</strong>
              <p className="mb-0">{estimatedCost !== 'N/A' ? `Rs.${estimatedCost.toFixed(2)}/KM` : 'N/A'}</p>
            </div>
          </div>
        )}

        <div className="map-container">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={5}
          >
            {directions && (
              <DirectionsRenderer
                directions={directions}
                options={{
                  suppressMarkers: false,
                  polylineOptions: {
                    strokeColor: '#2196F3',
                    strokeWeight: 4
                  }
                }}
              />
            )}
          </GoogleMap>
        </div>
      </Card.Body>
    </Card>
  );
}

export default LocationBox;