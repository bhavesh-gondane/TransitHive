using Microsoft.AspNetCore.Mvc.ViewEngines;
using System;
using Microsoft.EntityFrameworkCore;
using TransitHive.Data;
using TransitHive.Interfaces.Repositories;
using TransitHive.Models;

namespace TransitHive.Repositories
{
    public class ReviewRepository : IReviewRepository
    {
        private readonly AppDbContext _context;

        public ReviewRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Review> GetReviewByIdAsync(int id)
        {
            return await _context.Reviews.FindAsync(id);
        }

        public async Task<IEnumerable<Review>> GetAllReviewsAsync()
        {
            return await _context.Reviews.ToListAsync();
        }

        public async Task AddReviewAsync(Review review)
        {
            //var bookingexist = await _context.Bookings.FindAsync(review.BookingId);
            //review.VendorId = bookingexist.VendorId;
            await _context.Reviews.AddAsync(review);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateReviewAsync(Review review)
        {
            _context.Reviews.Update(review);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteReviewAsync(int id)
        {
            var review = await _context.Reviews.FindAsync(id);
            if (review != null)
            {
                _context.Reviews.Remove(review);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Review>> GetReviewByUserId(int userid)
        {
            return await _context.Reviews.Where(b => b.UserId == userid).ToListAsync();
        }
    }
}
