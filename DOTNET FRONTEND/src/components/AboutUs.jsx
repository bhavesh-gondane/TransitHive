import React from 'react';
import '../styles/AboutUs.css';
import aboutImage from '../assets/images/tr2.jpg';

const AboutUs = () => {
  return (
    <div id="about-us" className="about-us-container">
      <div className="about-us-content">
        {/* Left Side: Image */}
        <div className="about-image">
          <img 
            src={aboutImage} 
            alt="About Transit Hive" 
          />
        </div>

        {/* Right Side: Text Content */}
        <div className="about-text">
          <h1 className="about-title">About Transit Hive</h1>
          <p className="about-description">
            At Transit Hive, we are committed to revolutionizing the moving and transportation industry. Our goal is to provide 
            seamless, efficient, and cost-effective services to individuals and businesses alike. With years of experience, 
            we have become a trusted name in the industry, offering reliable and safe packing and moving solutions.
          </p>

          <div className="about-mission">
            <h2 className="mission-title">Our Mission</h2>
            <p>
              We strive to deliver top-notch service by focusing on customer satisfaction, innovation, and sustainable practices. 
              Our mission is to make your moving experience as smooth and stress-free as possible, while ensuring the safety of your belongings.
            </p>
          </div>

          <div className="about-values">
            <h2 className="values-title">Core Values</h2>
            <ul className="values-list">
              <li>Reliability: We provide dependable services, ensuring on-time deliveries and secure handling.</li>
              <li>Integrity: We uphold the highest standards of honesty and transparency in all our operations.</li>
              <li>Innovation: We embrace technology and innovation to offer more efficient and modern moving solutions.</li>
              <li>Sustainability: We are dedicated to environmentally-friendly practices throughout our operations.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
