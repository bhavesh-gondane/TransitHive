using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TransitHive.Dtos;
using TransitHive.Interfaces.Services;
using TransitHive.Models;

namespace TransitHive.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly IBookingService _bookingService;

        public BookingController(IBookingService bookingService)
        {
            _bookingService = bookingService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BookingWithItemsDto>> GetBookingByIdAsync(int id)
        {
            var booking = await _bookingService.GetBookingByIdAsync(id);
            if (booking == null)
            {
                return NotFound("Booking not found.");
            }
            return Ok(booking);
        }

        [HttpPost]
        public async Task<ActionResult<String>> AddBookingAsync([FromBody] BookingWithItemsDto bookingDto)
        {
            Console.WriteLine(bookingDto);
            await _bookingService.AddBookingAsync(bookingDto);
            return "Booking Created SucessFully";
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<String>> UpdateBookingAsync(int id, [FromBody] BookingWithItemsDto bookingDto)
        {
             await _bookingService.UpdateBookingAsync(bookingDto);
            //if (updatedBooking == null)
            //{
            //    return NotFound("Booking not found.");
            //}
            return Ok("Booking Updated SucessFully");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBookingAsync(int id)
        {
            await _bookingService.DeleteBookingAsync(id);
            return NoContent();
        }

        [HttpPatch("{id}/status/{status}")]
        public async Task<ActionResult<BookingWithItemsDto>> UpdateBookingStatusAsync(int id, BookingStatus status)
        {
            await _bookingService.UpdateBookingStatusAsync(id, status);
            var updatedBooking = await _bookingService.GetBookingByIdAsync(id);
            return Ok(updatedBooking);
        }

        [HttpPatch("{bookingId}/vendor/{vendorId}")]
        public async Task<ActionResult<BookingWithItemsDto>> AssignVendorToBookingAsync(int bookingId, int vendorId)
        {
            await _bookingService.AssignVendorToBookingAsync(bookingId, vendorId);
            var updatedBooking = await _bookingService.GetBookingByIdAsync(bookingId);
            return Ok(updatedBooking);
        }

        [HttpGet("city/{city}/status/{status}")]
        public async Task<ActionResult<IEnumerable<BookingWithItemsDto>>> GetBookingsByCityAndStatusAsync(string city, BookingStatus status)
        {
            var bookings = await _bookingService.GetBookingsByCityAndStatusAsync(city, status);
            return Ok(bookings);
        }

       
        [HttpGet("user/{userId}")]
        //[Authorize(Policy = "UserPolicy,AdminPolicy")]
        public async Task<ActionResult<IEnumerable<BookingWithItemsDto>>> GetBookingsByUserIdAsync(int userId)
        {
            var bookings = await _bookingService.GetBookingsByUserIdAsync(userId);
            return Ok(bookings);
        }

        [HttpPatch("{id}/statusandcost")]
        public async Task<ActionResult<BookingWithItemsDto>> UpdateBookingStatusAndCostAsync(int id, BookingStatus status, decimal cost)
        {
            await _bookingService.UpdateBookingStatusAndCostAsync(id, status, cost);
            var updatedBooking = await _bookingService.GetBookingByIdAsync(id);
            return Ok(updatedBooking);
        }

        [HttpGet("vendor/{vendorId}")]
        public async Task<ActionResult<IEnumerable<BookingWithItemsDto>>> GetBookingsByVendorIdAsync(int vendorId)
        {
            var bookings = await _bookingService.GetBookingsByVendorIdAsync(vendorId);
            return Ok(bookings);
        }




        [Authorize(Roles = "Admin,User")]
        [HttpGet("getAllBooking")]
   
        public async Task<ActionResult<IEnumerable<BookingWithItemsDto>>> GetAllBookingsAsync()
        {
            var bookings = await _bookingService.GetAllBookingsAsync();
            return Ok(bookings);
        }



    }
}
