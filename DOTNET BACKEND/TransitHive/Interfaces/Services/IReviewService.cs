using TransitHive.Dtos;
using TransitHive.Models;

namespace TransitHive.Interfaces.Services
{
    public interface IReviewService
    {
        Task<ReviewDto> GetReviewByIdAsync(int id);
        Task<IEnumerable<ReviewAdminDto>> GetAllReviewsAsync();

        Task<IEnumerable<Review>> GetReviewByUserId(int userid);
        Task AddReviewAsync(ReviewDto reviewDto);
        Task UpdateReviewAsync(ReviewDto reviewDto);
        Task DeleteReviewAsync(int id);
        
    }
}
