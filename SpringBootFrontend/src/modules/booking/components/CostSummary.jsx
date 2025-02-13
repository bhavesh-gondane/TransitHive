import React from 'react';
import { Card } from 'react-bootstrap';

function CostSummary({ formData, cost }) {
  const getFloorCost = (floors) => floors * 100;
  const getDistanceCost = (distance) => {
    if (!distance) return 0;
    if (distance > 200) return distance * 80;
    if (distance > 100) return distance * 100;
    return distance * 150;
  };

  return (
    <Card className="mt-4 mb-4">
      <Card.Body>
        <Card.Title>Cost Summary</Card.Title>
        <div className="row">
          <div className="col-12">
            <h6>Items Cost:</h6>
            {formData.items.map((item, index) => (
              <div key={index} className="ms-3">
                {item.name && (
                  <small>
                    {item.name} × {item.quantity}: ₹{(item.basePrice || 0) * item.quantity}
                  </small>
                )}
              </div>
            ))}
          </div>
          
          {formData.pickupLift === 'No' && formData.pickupFloors > 0 && (
            <div className="col-12 mt-2">
              <small>Pickup Floor Charges: ₹{getFloorCost(formData.pickupFloors)}</small>
            </div>
          )}
          
          {formData.dropLift === 'No' && formData.dropFloors > 0 && (
            <div className="col-12">
              <small>Drop Floor Charges: ₹{getFloorCost(formData.dropFloors)}</small>
            </div>
          )}

          {formData.distance && (
            <div className="col-12 mt-2">
              <small>
                Distance Charges ({formData.distance.toFixed(2)} km): ₹{Math.round(getDistanceCost(formData.distance))}
                {formData.distance > 200 && ' (₹80/km)'}
                {formData.distance > 100 && formData.distance <= 200 && ' (₹100/km)'}
                {formData.distance <= 100 && ' (₹150/km)'}
              </small>
            </div>
          )}
          
          <div className="col-12 mt-2">
            <small>Packaging Type: {formData.packagingType}</small>
          </div>
          
          <div className="col-12 mt-3">
            <h5 className="text-primary">Total Estimated Cost: ₹{cost}</h5>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default CostSummary;