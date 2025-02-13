using AutoMapper;
using System.Collections.Generic;
using System.Threading.Tasks;
using TransitHive.Dtos;
using TransitHive.Interfaces.Repositories;
using TransitHive.Interfaces.Services;
using TransitHive.Models;

namespace TransitHive.Services
{
    public class BookingService : IBookingService
    {
        private readonly IBookingRepository _bookingRepository;
        private readonly IMapper _mapper;

        public BookingService(IBookingRepository bookingRepository, IMapper mapper)
        {
            _bookingRepository = bookingRepository;
            _mapper = mapper;
        }

        public async Task<BookingWithItemsDto> GetBookingByIdAsync(int id)
        {
            var booking = await _bookingRepository.GetBookingByIdAsync(id);
            return _mapper.Map<BookingWithItemsDto>(booking);
        }

        public async Task<IEnumerable<BookingWithItemsDto>> GetAllBookingsAsync()
        {
            var bookings = await _bookingRepository.GetAllBookingsAsync();
            return _mapper.Map<IEnumerable<BookingWithItemsDto>>(bookings);
        }

        public async Task AddBookingAsync(BookingWithItemsDto bookingDto)
        {
            var booking = _mapper.Map<Booking>(bookingDto);
            await _bookingRepository.AddBookingAsync(booking);
        }

        public async Task UpdateBookingAsync(BookingWithItemsDto bookingDto)
        {
            var booking = _mapper.Map<Booking>(bookingDto);
            await _bookingRepository.UpdateBookingAsync(booking);
        }

        public async Task DeleteBookingAsync(int id)
        {
            await _bookingRepository.DeleteBookingAsync(id);
        }

        public async Task UpdateBookingStatusAsync(int id, BookingStatus status)
        {
            await _bookingRepository.UpdateBookingStatusAsync(id, status);
            
        }

        public async Task AssignVendorToBookingAsync(int bookingId, int vendorId)
        {
            await _bookingRepository.AssignVendorToBookingAsync(bookingId, vendorId);
        }

        //public async Task<IEnumerable<BookingWithItemsDto>> GetBookingsByCityAndStatusAsync(string city, BookingStatus status)
        //{
        //    var bookings = await _bookingRepository.GetBookingsByCityAndStatusAsync(city, status);
        //    return _mapper.Map<IEnumerable<BookingWithItemsDto>>(bookings);
        //}
        public async Task<IEnumerable<BookingWithItemsDto>> GetBookingsByCityAndStatusAsync(string city, BookingStatus status)
        {
            var bookings = await _bookingRepository.GetBookingsByCityAndStatusAsync(city, status);
            var bookingDtos = _mapper.Map<IEnumerable<BookingWithItemsDto>>(bookings);

            // Set the specified fields to null
            foreach (var bookingDto in bookingDtos)
            {
                bookingDto.Name = null;
                bookingDto.Mobile = null;
                bookingDto.Email = null;
            }

            return bookingDtos;
        }


        public async Task<IEnumerable<BookingWithItemsDto>> GetBookingsByUserIdAsync(int userId)
        {
            var bookings = await _bookingRepository.GetBookingsByUserIdAsync(userId);
            return _mapper.Map<IEnumerable<BookingWithItemsDto>>(bookings);
        }

        public async Task UpdateBookingStatusAndCostAsync(int id, BookingStatus status, decimal cost)
        {
            await _bookingRepository.UpdateBookingStatusAndCostAsync(id, status, cost);
        }

        //public async Task<IEnumerable<BookingWithItemsDto>> GetBookingsByVendorIdAsync(int vendorId)
        //{
        //    var bookings = await _bookingRepository.GetBookingsByVendorIdAsync(vendorId);
        //    return _mapper.Map<IEnumerable<BookingWithItemsDto>>(bookings);
        //}
        public async Task<IEnumerable<BookingWithItemsDto>> GetBookingsByVendorIdAsync(int vendorId)
        {
            var bookings = await _bookingRepository.GetBookingsByVendorIdAsync(vendorId);
            var bookingDtos = _mapper.Map<IEnumerable<BookingWithItemsDto>>(bookings);

            foreach (var bookingDto in bookingDtos)
            {
                if ((bookingDto.MoveDate - DateTime.UtcNow).TotalHours > 24)
                {
                    bookingDto.Name = null;
                    bookingDto.Mobile = null;
                    bookingDto.Email = null;
                }
            }

            return bookingDtos;
        }

    }
}
