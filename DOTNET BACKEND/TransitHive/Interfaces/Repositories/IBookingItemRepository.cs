using TransitHive.Models;
namespace TransitHive.Interfaces.Repositories
{
    public interface IBookingItemRepository
    {
        Task<BookingItem> GetBookingItemByIdAsync(int id);
        Task<IEnumerable<BookingItem>> GetAllBookingItemsAsync();
        Task AddBookingItemAsync(BookingItem bookingItem);
        Task UpdateBookingItemAsync(BookingItem bookingItem);
        Task DeleteBookingItemAsync(int id);
    }
}
