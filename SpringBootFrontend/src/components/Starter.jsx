// import React from 'react';
// import '../styles/Starter.css'; // Import custom CSS for the background image

// const Starter = () => {
//   return (
//     <section className="starter-container">
//       <div className="starter-content">
//         <h1>Logistics made easy</h1>
//         <p>Your trusted Packers and Movers service</p>
//         <button className="starter-button">Search</button>
//       </div>
//     </section>
//   );
// };

// export default Starter;



import React from 'react';
import '../styles/Starter.css'; // Import custom CSS for the background image and animations

const Starter = () => {
  return (
    <section className="starter-container">
      <div className="starter-content">
        <h1 className="animated-text line1">We Help You Move</h1>
        <p className="animated-text line2">Your trusted Packers and Movers service</p>
        {/* <button className="starter-button animated-text line3"><a href="#search">Search</a></button> */}
        <a href="#search" className="starter-button animated-text line3">Search</a>
      </div>
    </section>
  );
};

export default Starter;

