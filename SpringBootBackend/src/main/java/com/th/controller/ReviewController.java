package com.th.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.th.dto.ReviewDTO;
import com.th.dto.ReviewRequestDTO;
import com.th.service.BookingService;
import com.th.service.ReviewService;

@RestController
@RequestMapping("/reviews")
@CrossOrigin(origins="*")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;
    
    @Autowired
    private BookingService bookingService;

    @GetMapping("/{id}")
    public ResponseEntity<ReviewDTO> getReviewById(@PathVariable Long id) {
        ReviewDTO reviewDTO = reviewService.getReviewById(id);
        if (reviewDTO == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(reviewDTO);
    }

    @PostMapping
    public ResponseEntity<ReviewDTO> saveReview(@RequestBody ReviewDTO reviewDTO) {
    	
    	
    	
        ReviewDTO savedReview = reviewService.saveReview(reviewDTO);
        
        return ResponseEntity.status(201).body(savedReview);
    }

    @GetMapping
    public ResponseEntity<List<ReviewRequestDTO>> getAllReviews() {
        List<ReviewRequestDTO> reviewList = reviewService.getAllReviews();
        return ResponseEntity.ok(reviewList);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReviewById(@PathVariable Long id) {
        reviewService.deleteReviewById(id);
        return ResponseEntity.noContent().build();
    }
}
