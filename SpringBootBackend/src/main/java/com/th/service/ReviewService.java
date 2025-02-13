package com.th.service;

import java.util.List;

import com.th.dto.ReviewDTO;
import com.th.dto.ReviewRequestDTO;

public interface ReviewService {
    ReviewDTO getReviewById(Long id);
    ReviewDTO saveReview(ReviewDTO reviewDTO);
    List<ReviewRequestDTO> getAllReviews();
    void deleteReviewById(Long id);
}
