using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using TransitHive.Dtos;
using TransitHive.Interfaces.Services;

namespace TransitHive.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingItemController : ControllerBase
    {
        private readonly IBookingItemService _bookingItemService;

        public BookingItemController(IBookingItemService bookingItemService)
        {
            _bookingItemService = bookingItemService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BookingItemDto>> GetBookingItem(int id)
        {
            var bookingItem = await _bookingItemService.GetBookingItemByIdAsync(id);
            if (bookingItem == null)
            {
                return NotFound();
            }
            return Ok(bookingItem);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookingItemDto>>> GetAllBookingItems()
        {
            var bookingItems = await _bookingItemService.GetAllBookingItemsAsync();
            return Ok(bookingItems);
        }

        [HttpPost]
        public async Task<ActionResult> AddBookingItem([FromBody] BookingItemDto bookingItemDto)
        {
            await _bookingItemService.AddBookingItemAsync(bookingItemDto);
            return CreatedAtAction(nameof(GetBookingItem), new { id = bookingItemDto.Id }, bookingItemDto);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateBookingItem(int id, [FromBody] BookingItemDto bookingItemDto)
        {
            if (id != bookingItemDto.Id)
            {
                return BadRequest();
            }
            await _bookingItemService.UpdateBookingItemAsync(bookingItemDto);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteBookingItem(int id)
        {
            await _bookingItemService.DeleteBookingItemAsync(id);
            return NoContent();
        }
    }
}
