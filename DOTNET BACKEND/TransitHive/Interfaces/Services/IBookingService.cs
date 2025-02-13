using System.Collections.Generic;
using System.Threading.Tasks;
using TransitHive.Dtos;
using TransitHive.Models;

namespace TransitHive.Interfaces.Services
{
    public interface IBookingService
    {
        Task<BookingWithItemsDto> GetBookingByIdAsync(int id);
        Task<IEnumerable<BookingWithItemsDto>> GetAllBookingsAsync();
        Task AddBookingAsync(BookingWithItemsDto bookingDto);
        Task UpdateBookingAsync(BookingWithItemsDto bookingDto);
        Task DeleteBookingAsync(int id);
        Task UpdateBookingStatusAsync(int id, BookingStatus status);
        Task AssignVendorToBookingAsync(int bookingId, int vendorId);
        Task<IEnumerable<BookingWithItemsDto>> GetBookingsByCityAndStatusAsync(string city, BookingStatus status);
        Task<IEnumerable<BookingWithItemsDto>> GetBookingsByUserIdAsync(int userId);
        Task UpdateBookingStatusAndCostAsync(int id, BookingStatus status, decimal cost);
        Task<IEnumerable<BookingWithItemsDto>> GetBookingsByVendorIdAsync(int vendorId);
    }
}
