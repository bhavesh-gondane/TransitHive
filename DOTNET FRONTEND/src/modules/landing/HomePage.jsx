// import { useNavigate } from 'react-router-dom';
// import { Navbar, Container, Button, Modal } from 'react-bootstrap';
// import { useState } from 'react';
// import { useAuth } from '../../context/AuthContext';

// function LandingPage() {
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const handleBookRide = () => {
//     if (user) {
//       navigate('/booking');
//     } else {
//       setShowLoginModal(true);
//     }
//   };

//   return (
//     <>
//       <Navbar bg="light" expand="lg">
//         <Container>
//           <Navbar.Brand href="/">TransitHive</Navbar.Brand>
//           <Button variant="primary" onClick={() => setShowLoginModal(true)}>
//             Login
//           </Button>
//         </Container>
//       </Navbar>

//       <Container className="text-center mt-5">
//         <h1>Welcome to TransitHive</h1>
//         <p>Your Trusted Partner for Seamless and Secure Moving</p>
//         <Button variant="success" size="lg" onClick={handleBookRide}>
//           Book Your Ride
//         </Button>
//       </Container>

//       <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Choose Login Type</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div className="d-grid gap-2">
//             <Button variant="primary" onClick={() => navigate('/login/user')}>
//               Login as User
//             </Button>
//             <Button variant="secondary" onClick={() => navigate('/login/vendor')}>
//               Login as Vendor
//             </Button>
//             <Button variant="info" onClick={() => navigate('/login/admin')}>
//               Login as Admin
//             </Button>
//           </div>
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// }

// export default LandingPage;









import React from 'react';
import Navbar from '../../components/Navbar';
import Starter from '../../components/Starter';
import SearchForm from '../../components/SearchForm';
import Testimonials from '../../components/Testimonials';
import AboutUs from '../../components/AboutUs';
import Footer from '../../components/Footer';
import ScrollToTopButton from '../../components/ScrollToTopButton';
import CarouselComponent from '../../components/CarouselComponent';
import '../../styles/HomePage.css'; // Add your custom CSS file here

const HomePage = () => {
  return (
    <div>
      <div className="section-gap">
        <Navbar /> {/* Include Navbar */}
      </div>

      <div className="section-gap">
        <CarouselComponent /> {/* Include Carousel */}
      </div>

      <div className="section-gap">
        <Testimonials /> {/* Include Testimonials */}
      </div>

      <AboutUs />

      <Footer />

      <ScrollToTopButton />
    </div>
  );
};

export default HomePage;






















// import React from 'react';
// import Navbar from '../../components/Navbar';
// import Starter from '../../components/Starter';
// import SearchForm from '../../components/SearchForm';
// import Testimonials from '../../components/Testimonials';
// import AboutUs from '../../components/AboutUs';
// import Footer from '../../components/Footer';
// import ScrollToTopButton from '../../components/ScrollToTopButton';
// import CarouselComponent from '../../components/CarouselComponent';

// const HomePage = () => {
//   return (
//     <div>
//       <Navbar /> {/* Include Navbar */}
//       {/* <Starter /> */}
//        {/* Include Starter */}

//       <div className="carousel-gap">
//         <CarouselComponent />
//       </div>
      
//       {/* Wrapper div to add some spacing between Starter and SearchForm */}
//       {/* <div className="search-form-gap">
//         <SearchForm /> 
//       </div> */}
      
//       {/* Wrapper div to add some spacing between SearchForm and Testimonials */}
//       <div className="testimonials-gap">
//         <Testimonials /> {/* Include Testimonials */}
//       </div>

//       <AboutUs/>

//       <Footer />

//       <ScrollToTopButton/>
//     </div>
//   );
// };

// export default HomePage;
