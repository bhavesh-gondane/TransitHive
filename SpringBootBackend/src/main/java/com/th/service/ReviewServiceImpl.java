package com.th.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.th.dto.ReviewDTO;
import com.th.dto.ReviewRequestDTO;
import com.th.entity.Review;
import com.th.repository.BookingRepository;
import com.th.repository.ReviewRepository;
import com.th.repository.UserRepository;
import com.th.repository.VendorRepository;

@Service
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VendorRepository vendorRepository;
    
    @Autowired
    private BookingService bookingService;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public ReviewDTO getReviewById(Long id) {
        Review review = reviewRepository.findById(id).orElse(null);
        if (review == null) {
            return null;
        }
        return convertToDTO(review);
    }

    @Override
    public ReviewDTO saveReview(ReviewDTO reviewDTO) {
        Review review = convertToEntity(reviewDTO);
        review.setBooking(bookingRepository.findById(reviewDTO.getBookingId()).orElseThrow(() -> new RuntimeException("Booking not found")));
        review.setUser(userRepository.findById(reviewDTO.getUserId()).orElseThrow(() -> new RuntimeException("User not found")));
        review.setVendor(vendorRepository.findById(reviewDTO.getVendorId()).orElseThrow(() -> new RuntimeException("Vendor not found")));
       
        
        boolean isReviewd=bookingService.markAsReviewd(reviewDTO.getBookingId());
		if (!isReviewd) {
			throw new RuntimeException("review Not Updated");
		}
		
		 review = reviewRepository.save(review);
        return convertToDTO(review);
    }

    @Override
    public List<ReviewRequestDTO> getAllReviews() {
        return reviewRepository.findAll().stream()
                .map(this::convertToRequestDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteReviewById(Long id) {
        reviewRepository.deleteById(id);
    }

    private ReviewDTO convertToDTO(Review review) {
        return modelMapper.map(review, ReviewDTO.class);
    }
    private ReviewRequestDTO convertToRequestDTO(Review review) {
        return modelMapper.map(review, ReviewRequestDTO.class);
    }

    private Review convertToEntity(ReviewDTO reviewDTO) {
        return modelMapper.map(reviewDTO, Review.class);
    }
}
