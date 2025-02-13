export const calculateTotalCost = (formData) => {
  let cost = 0;

  // Base cost from items
  formData.items.forEach(item => {
    if (!item.name || !item.basePrice) return;
    const basePrice = item.basePrice || 0;
    cost += basePrice * item.quantity;
  });

  // Floor charges
  const floorCharge = 100; // Rs. 100 per floor
  if (formData.pickupLift === 'No') {
    cost += formData.pickupFloors * floorCharge;
  }
  if (formData.dropLift === 'No') {
    cost += formData.dropFloors * floorCharge;
  }

  // Distance-based charges
  if (formData.distance) {
    if (formData.distance > 200) {
      cost += formData.distance * 80; // Rs. 80 per km for distance > 200km
    } else if (formData.distance > 100) {
      cost += formData.distance * 100; // Rs. 100 per km for distance between 100-200km
    } else {
      cost += formData.distance * 150; // Rs. 150 per km for distance < 100km
    }
  }

  // Packaging charges
  const packagingMultiplier = {
    'Single-Layered': 1,
    'Double-Layered': 1.2,
    'Wooden': 1.5
  };
  cost *= packagingMultiplier[formData.packagingType] || 1;

  return Math.round(cost);
};