using System.Collections.Generic;
using System.Threading.Tasks;
using TransitHive.Models;

namespace TransitHive.Interfaces.Repositories
{
    public interface IBookingRepository
    {
        Task<Booking> GetBookingByIdAsync(int id);
        Task<IEnumerable<Booking>> GetAllBookingsAsync();
        Task AddBookingAsync(Booking booking);
        Task UpdateBookingAsync(Booking booking);
        Task DeleteBookingAsync(int id);
        Task UpdateBookingStatusAsync(int id, BookingStatus status);
        Task AssignVendorToBookingAsync(int bookingId, int vendorId);
        Task<IEnumerable<Booking>> GetBookingsByCityAndStatusAsync(string city, BookingStatus status);
        Task<IEnumerable<Booking>> GetBookingsByUserIdAsync(int userId);
        Task UpdateBookingStatusAndCostAsync(int id, BookingStatus status, decimal cost);
        Task<IEnumerable<Booking>> GetBookingsByVendorIdAsync(int vendorId);

        Task IsPaidMark(int bookingid);
        Task IsUserReviewedMark(int bookingid);

        public Task<int> GetTotalBookingsAsync();

        public Task<decimal> GetTotalAmountAsync();


        Task setpaymentMethod(int bookingid, PaymentM PaymentMethod);
    }
}
