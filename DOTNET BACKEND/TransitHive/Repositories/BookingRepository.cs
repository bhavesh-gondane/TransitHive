using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TransitHive.Data;
using TransitHive.Interfaces.Repositories;
using TransitHive.Models;

namespace TransitHive.Repositories
{
    public class BookingRepository : IBookingRepository
    {
        private readonly AppDbContext _context;

        public BookingRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Booking> GetBookingByIdAsync(int id)
        {
            return await _context.Bookings.Include(b => b.Items).FirstOrDefaultAsync(b => b.Id == id);
        }

        public async Task<IEnumerable<Booking>> GetAllBookingsAsync()
        {
            return await _context.Bookings.Include(b => b.Items).ToListAsync();
        }

        public async Task AddBookingAsync(Booking booking)
        {
            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateBookingAsync(Booking booking)
        {
            _context.Bookings.Update(booking);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteBookingAsync(int id)
        {
            var booking = await _context.Bookings.FindAsync(id);
            if (booking != null)
            {
                _context.Bookings.Remove(booking);
                await _context.SaveChangesAsync();
            }
        }

        public async Task UpdateBookingStatusAsync(int id, BookingStatus status)
        {
            var booking = await _context.Bookings.FindAsync(id);
            if (booking != null)
            {
                booking.Status = status;
                await _context.SaveChangesAsync();
            }
        }

        public async Task AssignVendorToBookingAsync(int bookingId, int vendorId)
        {
            var booking = await _context.Bookings.FindAsync(bookingId);
            if (booking != null)
            {
                if (booking.Status == BookingStatus.CONFIRMED)
                {
                    booking.VendorId = vendorId;
                    booking.Status = BookingStatus.ASSIGNED;
                    await _context.SaveChangesAsync();
                }
                
                
            }
        }

        public async Task<IEnumerable<Booking>> GetBookingsByCityAndStatusAsync(string city, BookingStatus status)
        {
            return await _context.Bookings
                .Where(b => b.City == city && b.Status == status)
                .Include(b => b.Items)
                .ToListAsync();
        }

        public async Task<IEnumerable<Booking>> GetBookingsByUserIdAsync(int userId)
        {
            return await _context.Bookings
                .Where(b => b.UserId == userId)
                .Include(b => b.Items)
                .ToListAsync();
        }

        public async Task UpdateBookingStatusAndCostAsync(int id, BookingStatus status, decimal cost)
        {
            var booking = await _context.Bookings.FindAsync(id);
            if (booking != null)
            {
                booking.Status = status;
                booking.Cost = cost;
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Booking>> GetBookingsByVendorIdAsync(int vendorId)
        {
            return await _context.Bookings
                .Where(b => b.VendorId == vendorId)
                .Include(b => b.Items)
                .ToListAsync();
        }

        public async Task IsPaidMark(int bookingid)
        {
            var booking = await _context.Bookings.FindAsync(bookingid);
            if(booking != null)
            {
                booking.IsPaid = true;
                await _context.SaveChangesAsync();
            }
        }

        public async Task IsUserReviewedMark(int bookingid)
        {
            var booking = await _context.Bookings.FindAsync(bookingid);
            if (booking != null)
            {
                booking.IsReviewed = true;
                await _context.SaveChangesAsync();
            }

        }

        public async Task<int> GetTotalBookingsAsync()
        {
            return await _context.Bookings.CountAsync();
        }

        public async Task<decimal> GetTotalAmountAsync()
        {
            return await _context.Bookings
                         .Where(b => b.Status == BookingStatus.COMPLETED)
                         .SumAsync(b => b.Cost);
        }

        public async Task setpaymentMethod(int bookingid, PaymentM paymentMethod)
        {
            var booking = await _context.Bookings.FindAsync(bookingid);
            if (booking != null) {
                booking.PaymentMethod = paymentMethod;

                await _context.SaveChangesAsync();
            }
        }
    }
}
