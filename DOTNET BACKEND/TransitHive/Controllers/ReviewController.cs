using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using TransitHive.Dtos;
using TransitHive.Interfaces.Services;

namespace TransitHive.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private readonly IReviewService _reviewService;

        public ReviewController(IReviewService reviewService)
        {
            _reviewService = reviewService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ReviewDto>> GetReview(int id)
        {
            var review = await _reviewService.GetReviewByIdAsync(id);
            if (review == null)
            {
                return NotFound();
            }
            return Ok(review);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReviewAdminDto>>> GetAllReviews()
        {
            var reviews = await _reviewService.GetAllReviewsAsync();
            return Ok(reviews);
        }

        [HttpPost]
        public async Task<ActionResult> AddReview([FromBody] ReviewDto reviewDto)
        {
            await _reviewService.AddReviewAsync(reviewDto);
            return CreatedAtAction(nameof(GetReview), new { id = reviewDto.ReviewId }, reviewDto);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateReview(int id, [FromBody] ReviewDto reviewDto)
        {
            if (id != reviewDto.ReviewId)
            {
                return BadRequest();
            }
            await _reviewService.UpdateReviewAsync(reviewDto);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteReview(int id)
        {
            await _reviewService.DeleteReviewAsync(id);
            return NoContent();
        }
    }
}
