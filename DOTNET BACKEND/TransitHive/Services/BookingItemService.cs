using AutoMapper;
using TransitHive.Dtos;
using TransitHive.Interfaces.Repositories;
using TransitHive.Interfaces.Services;
using TransitHive.Models;

namespace TransitHive.Services
{
    public class BookingItemService : IBookingItemService
    {
        private readonly IBookingItemRepository _bookingItemRepository;
        private readonly IMapper _mapper;

        public BookingItemService(IBookingItemRepository bookingItemRepository, IMapper mapper)
        {
            _bookingItemRepository = bookingItemRepository;
            _mapper = mapper;
        }

        public async Task<BookingItemDto> GetBookingItemByIdAsync(int id)
        {
            var bookingItem = await _bookingItemRepository.GetBookingItemByIdAsync(id);
            return _mapper.Map<BookingItemDto>(bookingItem);
        }

        public async Task<IEnumerable<BookingItemDto>> GetAllBookingItemsAsync()
        {
            var bookingItems = await _bookingItemRepository.GetAllBookingItemsAsync();
            return _mapper.Map<IEnumerable<BookingItemDto>>(bookingItems);
        }

        public async Task AddBookingItemAsync(BookingItemDto bookingItemDto)
        {
            var bookingItem = _mapper.Map<BookingItem>(bookingItemDto);
            await _bookingItemRepository.AddBookingItemAsync(bookingItem);
        }

        public async Task UpdateBookingItemAsync(BookingItemDto bookingItemDto)
        {
            var bookingItem = _mapper.Map<BookingItem>(bookingItemDto);
            await _bookingItemRepository.UpdateBookingItemAsync(bookingItem);
        }

        public async Task DeleteBookingItemAsync(int id)
        {
            await _bookingItemRepository.DeleteBookingItemAsync(id);
        }
    }
}
