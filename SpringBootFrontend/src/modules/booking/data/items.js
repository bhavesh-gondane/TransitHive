// export const itemsDatabase = [
//   { id: 1, name: 'Sofa - 3 Seater', category: 'Furniture', basePrice: 1000 },
//   { id: 2, name: 'Sofa - 2 Seater', category: 'Furniture', basePrice: 800 },
//   { id: 3, name: 'Double Bed', category: 'Furniture', basePrice: 1200 },
//   { id: 4, name: 'Single Bed', category: 'Furniture', basePrice: 800 },
//   { id: 5, name: 'Dining Table', category: 'Furniture', basePrice: 900 },
//   { id: 6, name: 'TV (32-43 inch)', category: 'Electronics', basePrice: 800 },
//   { id: 7, name: 'TV (44-55 inch)', category: 'Electronics', basePrice: 1000 },
//   { id: 8, name: 'Refrigerator', category: 'Electronics', basePrice: 1200 },
//   { id: 9, name: 'Washing Machine', category: 'Electronics', basePrice: 800 },
//   { id: 10, name: 'Microwave', category: 'Electronics', basePrice: 400 }
// ];

// export const getItemSuggestions = (query) => {
//   if (!query) return [];
//   return itemsDatabase.filter(item => 
//     item.name.toLowerCase().includes(query.toLowerCase())
//   );
// };

// export const getItemPrice = (itemName) => {
//   const item = itemsDatabase.find(item => item.name === itemName);
//   return item ? item.basePrice : 0;
// };