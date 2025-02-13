import React from 'react';
import { Carousel } from 'react-bootstrap';
import '../styles/Carousel.css';
import tr1 from '../assets/images/tr1.jpg';
import tr2 from '../assets/images/tr2.jpg';
import truck_intro1 from '../assets/images/truck_intro1.jpg';

const CarouselComponent = () => {
  return (
    <div className="carousel-container">
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={tr1}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>We Help You Move</h3>
            {/* <p>Some description about Slide 1</p> */}
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src={tr2}
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Your trusted Packers and Movers</h3>
            {/* <p>Some description about Slide 2</p> */}
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src={truck_intro1}
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Seamless Deliveries</h3>
            {/* <p>Some description about Slide 3</p> */}
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
