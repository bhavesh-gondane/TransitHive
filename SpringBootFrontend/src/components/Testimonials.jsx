// import React from 'react';
// import '../styles/Testimonials.css'; // Importing CSS for styling

// const testimonialsData = [
//   {
//     name: 'Manoj More',
//     feedback: 'Excellent service! Very professional and efficient.',
//     rating: 5,
//   },
//   {
//     name: 'Dinesh Kulkarni',
//     feedback: 'They made my move stress-free and smooth.',
//     rating: 4,
//   },
//   {
//     name: 'Yugandhar Deshmukh',
//     feedback: 'Friendly staff and great care with my belongings.',
//     rating: 5,
//   },
//   {
//     name: 'Sunita Rao',
//     feedback: 'Highly recommend! Affordable and reliable.',
//     rating: 5,
//   },
//   {
//     name: 'Rahul Bharaskar',
//     feedback: 'Very punctual and safe delivery of items.',
//     rating: 4,
//     photo: rahul
//   },
//   {
//     name: 'Ashish Jadhav',
//     feedback: 'Fantastic service! Will use again.',
//     rating: 5,
//   },
//   {
//     name: 'Rohit Owal',
//     feedback: 'Handled everything professionally. Thank you!',
//     rating: 4,
//   },
//   {
//     name: 'Carlos Martinez',
//     feedback: 'Superb service from start to finish.',
//     rating: 5,
//   },
// ];

// const Testimonials = () => {
//   return (
//     <div id="testimonials">
//     <section className="testimonials-container">
//       <h2>What Our Customers Say</h2>
//       <div className="testimonials-grid">
//         {testimonialsData.map((testimonial, index) => (
//           <div key={index} className="testimonial-card">
//             <div className="testimonial-photo">
//               {/* Placeholder for user photo */}
//               <img
//                 src={`https://via.placeholder.com/100?text=${testimonial.name.charAt(
//                   0
//                 )}`}
//                 alt={`${testimonial.name}`}
//               />
//             </div>
//             <p className="testimonial-feedback">"{testimonial.feedback}"</p>
//             <p className="testimonial-name">- {testimonial.name}</p>
//             <div className="testimonial-stars">
//               {'★'.repeat(testimonial.rating)}
//               {'☆'.repeat(5 - testimonial.rating)}
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//     </div>
//   );
// };

// export default Testimonials;


























import React from 'react';
import '../styles/Testimonials.css'; 
import manojMorePhoto from '../assets/images/manojMore.jpg';
import sameerDehadraiPhoto from '../assets/images/sameerDehadrai.jpg';
import yugandharDeshmukhPhoto from '../assets/images/yugandharDeshmukh.jpg';
import adityaKansanaPhoto from '../assets/images/adityaKansana.jpg';
import rahulBharaskarPhoto from '../assets/images/rahulBharaskar.jpg';
import ashishJadhavPhoto from '../assets/images/ashishJadhav.jpg';
import rohitOwalPhoto from '../assets/images/rohitOwal.jpg';
import shilBhushanPhoto from '../assets/images/shilBhushan.jpg';

const testimonialsData = [
  {
    name: 'Manoj More',
    feedback: 'Excellent service! Very professional and efficient.',
    rating: 5,
    photo: manojMorePhoto
  },
  {
    name: 'Sameer Dehadrai',
    feedback: 'They made my move stress-free and smooth.',
    rating: 4,
    photo: sameerDehadraiPhoto
  },
  {
    name: 'Yugandhar Deshmukh',
    feedback: 'Friendly staff and great care with my belongings.',
    rating: 5,
    photo: yugandharDeshmukhPhoto
  },
  {
    name: 'Aditya Kansana',
    feedback: 'Highly recommend! Affordable and reliable.',
    rating: 5,
    photo: adityaKansanaPhoto
  },
  {
    name: 'Rahul Bharaskar',
    feedback: 'Very punctual and safe delivery of items.',
    rating: 4,
    photo: rahulBharaskarPhoto
  },
  {
    name: 'Ashish Jadhav',
    feedback: 'Fantastic service! Will use again.',
    rating: 5,
    photo: ashishJadhavPhoto
  },
  {
    name: 'Rohit Owal',
    feedback: 'Handled everything professionally. Thank you!',
    rating: 4,
    photo: rohitOwalPhoto
  },
  {
    name: 'Shilbhushan Khanderao',
    feedback: 'Superb service from start to finish.',
    rating: 5,
    photo: shilBhushanPhoto
  },
];

const Testimonials = () => {
  return (
    <div id="testimonials">
      <section className="testimonials-container">
        <h2>Hear From People Like You</h2>
        <div className="testimonials-grid">
          {testimonialsData.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-photo">
                <img
                  src={testimonial.photo}
                  alt={testimonial.name}
                />
              </div>
              <p className="testimonial-feedback">"{testimonial.feedback}"</p>
              <p className="testimonial-name">- {testimonial.name}</p>
              <div className="testimonial-stars">
                {'★'.repeat(testimonial.rating)}
                {'☆'.repeat(5 - testimonial.rating)}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
