// import React from 'react';
// import { GoogleMap, DirectionsRenderer, LoadScript } from '@react-google-maps/api';

// const containerStyle = {
//   width: '100%',
//   height: '300px'
// };

// const center = {
//   lat: 20.5937,
//   lng: 78.9629
// };

// function MapPreview({ directions }) {
//   return (
//     <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
//       <GoogleMap
//         mapContainerStyle={containerStyle}
//         center={center}
//         zoom={5}
//       >
//         {directions && (
//           <DirectionsRenderer
//             directions={directions}
//             options={{
//               suppressMarkers: false,
//               polylineOptions: {
//                 strokeColor: '#2196F3',
//                 strokeWeight: 4
//               }
//             }}
//           />
//         )}
//       </GoogleMap>
//     </LoadScript>
//   );
// }

// export default MapPreview;