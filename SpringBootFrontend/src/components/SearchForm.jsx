// import React, { useState } from 'react';
// import '../styles/SearchForm.css';

// const SearchForm = () => {
//   // State to manage the selected relocation type
//   const [relocationType, setRelocationType] = useState('within-city'); // Default is 'within-city'

//   // Cities list for selection (Example: this can be extended to 20 cities)
//   const cities = [
//     'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 
//     'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Surat',
//     'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Nasik',
//     'Vadodara', 'Ghaziabad', 'Chandigarh'
//   ];

//   // Handle option change (Within City or Between Cities)
//   const handleRelocationChange = (event) => {
//     setRelocationType(event.target.value);
//   };

//   return (
//     <div className="search-form-container">
//       <h2>Where are you going to relocate?</h2>
      
//       {/* Radio Buttons for selection */}
//       <div className="option-selection">
//         <input
//           type="radio"
//           id="within-city"
//           name="relocation"
//           value="within-city"
//           checked={relocationType === 'within-city'}
//           onChange={handleRelocationChange}
//         />
//         <label htmlFor="within-city">Within City</label>

//         <input
//           type="radio"
//           id="between-cities"
//           name="relocation"
//           value="between-cities"
//           checked={relocationType === 'between-cities'}
//           onChange={handleRelocationChange}
//         />
//         <label htmlFor="between-cities">Between Cities</label>
//       </div>

//       {/* Conditionally render the form fields based on the selected relocation type */}
//       {relocationType === 'within-city' && (
//         <div className="within-city-form">
//           {/* Fields for Within City */}
//           <label>Select City</label>
//           <select>
//             {cities.map((city, index) => (
//               <option key={index} value={city}>
//                 {city}
//               </option>
//             ))}
//           </select>
// <br></br>
//           <label>Search your Locality</label>
//           <div className="locality-fields">
//             <input type="text" placeholder="Shifting From" />
//             <input type="text" placeholder="Shifting To" />
//           </div>

//           <label>Select Shifting Date</label>
//           <input type="date" />
//         </div>
//       )}

//       {relocationType === 'between-cities' && (
//         <div className="between-cities-form">
//           {/* Fields for Between Cities */}
//           <label>Select Source City</label>
//           <select>
//             {cities.map((city, index) => (
//               <option key={index} value={city}>
//                 {city}
//               </option>
//             ))}
//           </select>

//           <label>Select Destination City</label>
//           <select>
//             {cities.map((city, index) => (
//               <option key={index} value={city}>
//                 {city}
//               </option>
//             ))}
//           </select>

//           <label>Select Shifting Date</label>
//           <input type="date" />

//           {/* Optional checkbox */}
//           {/* <div className="checkbox">
//             <input type="checkbox" id="flexible" />
//             <label htmlFor="flexible">I’m flexible on my shifting date</label>
//           </div> */}
//         </div>
//       )}

//       <button className="check-prices-btn">Check Prices</button>
//     </div>
//   );
// };

// export default SearchForm;



















import React, { useState } from 'react';
import '../styles/SearchForm.css';

// Declare the cities array before using it
const cities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad',
  'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Surat',
  'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Patna',
  'Vadodara', 'Ghaziabad', 'Ludhiana', 'Agra', 'Madurai'
];

const SearchForm = () => {
  const [relocationType, setRelocationType] = useState('within-city');
  const [sourceCity, setSourceCity] = useState('');
  const [destinationCities, setDestinationCities] = useState(cities); // Initialize with cities list

  const handleRelocationChange = (event) => {
    setRelocationType(event.target.value);
  };

  const handleSourceCityChange = (event) => {
    const selectedCity = event.target.value;
    setSourceCity(selectedCity);
    // Exclude selected source city from destination cities list
    setDestinationCities(cities.filter(city => city !== selectedCity));
  };

  return (
    <div className="search-form-container" id="search">
      <h2>Where are you going to relocate?</h2>

      <div className="option-selection">
        <input
          type="radio"
          id="within-city"
          name="relocation"
          value="within-city"
          checked={relocationType === 'within-city'}
          onChange={handleRelocationChange}
        />
        <label htmlFor="within-city">Within City</label>

        <input
          type="radio"
          id="between-cities"
          name="relocation"
          value="between-cities"
          checked={relocationType === 'between-cities'}
          onChange={handleRelocationChange}
        />
        <label htmlFor="between-cities">Between Cities</label>
      </div>

      {relocationType === 'within-city' && (
        <div className="within-city-form">
          <label>Select City</label>
          <select>
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
          <br />
          <label>Search your Locality</label>
          <div className="locality-fields">
            <input type="text" placeholder="Shifting From" />
            <input type="text" placeholder="Shifting To" />
          </div>
          <label>Select Shifting Date</label>
          <input type="date" />
        </div>
      )}

      {relocationType === 'between-cities' && (
        <div className="between-cities-form">
          <label>Select Source City</label>
          <select value={sourceCity} onChange={handleSourceCityChange}>
            <option value="">-- Select Source City --</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>

          <label>Select Destination City</label>
          <select>
            <option value="">-- Select Destination City --</option>
            {destinationCities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>

          <label>Select Shifting Date</label>
          <input type="date" />

          <div className="checkbox">
            <input type="checkbox" id="flexible" />
            <label htmlFor="flexible">I’m flexible on my shifting date</label>
          </div>
        </div>
      )}

      <button className="check-prices-btn">Check Prices</button>
    </div>
  );
};

export default SearchForm;


















// AIzaSyC3UENXk3OuYOCgamdZz0-UY2RBWyaE7d8