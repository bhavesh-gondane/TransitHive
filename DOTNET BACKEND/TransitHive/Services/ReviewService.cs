using AutoMapper;
using Microsoft.AspNetCore.Mvc.ViewEngines;
using TransitHive.Dtos;
using TransitHive.Interfaces.Repositories;
using TransitHive.Interfaces.Services;
using TransitHive.Models;

namespace TransitHive.Services
{
    public class ReviewService : IReviewService
    {
        private readonly IReviewRepository _reviewRepository;
        private readonly IMapper _mapper;

        public ReviewService(IReviewRepository reviewRepository, IMapper mapper)
        {
            _reviewRepository = reviewRepository;
            _mapper = mapper;
        }

        public async Task<ReviewDto> GetReviewByIdAsync(int id)
        {
            var review = await _reviewRepository.GetReviewByIdAsync(id);
            return _mapper.Map<ReviewDto>(review);
        }

        public async Task<IEnumerable<ReviewAdminDto>> GetAllReviewsAsync()
        {
            var reviews = await _reviewRepository.GetAllReviewsAsync();
            return _mapper.Map<IEnumerable<ReviewAdminDto>>(reviews);
        }

        public async Task AddReviewAsync(ReviewDto reviewDto)
        {
            var review = _mapper.Map<Review>(reviewDto);
            await _reviewRepository.AddReviewAsync(review);
        }

        public async Task UpdateReviewAsync(ReviewDto reviewDto)
        {
            var review = _mapper.Map<Review>(reviewDto);
            await _reviewRepository.UpdateReviewAsync(review);
        }

        public async Task DeleteReviewAsync(int id)
        {
            await _reviewRepository.DeleteReviewAsync(id);
        }

        public Task<IEnumerable<Review>> GetReviewByUserId(int userid)
        {
            return _reviewRepository.GetReviewByUserId(userid);
        }
    }
}
