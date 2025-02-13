using TransitHive.Dtos;

namespace TransitHive.Interfaces.Services
{
    public interface IBookingItemService
    {
        Task<BookingItemDto> GetBookingItemByIdAsync(int id);
        Task<IEnumerable<BookingItemDto>> GetAllBookingItemsAsync();
        Task AddBookingItemAsync(BookingItemDto bookingItemDto);
        Task UpdateBookingItemAsync(BookingItemDto bookingItemDto);
        Task DeleteBookingItemAsync(int id);
        
    }
}
