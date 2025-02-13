import React from 'react';
import { Card } from 'react-bootstrap';

function LocationDetails({ distance, duration }) {
  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>Journey Details</Card.Title>
        <div className="d-flex justify-content-around">
          <div>
            <strong>Distance:</strong>
            <p>{distance ? `${distance.toFixed(2)} km` : 'N/A'}</p>
          </div>
          <div>
            <strong>Estimated Time:</strong>
            <p>{duration || 'N/A'}</p>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default LocationDetails;