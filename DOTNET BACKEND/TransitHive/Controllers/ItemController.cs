using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using TransitHive.Dtos;
using TransitHive.Interfaces.Services;
using TransitHive.Models;
using TransitHive.Services;

namespace TransitHive.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly IItemService _itemService;
        private readonly IMapper _mapper;

        public ItemController(IItemService itemService, IMapper mapper)
        {
            _itemService = itemService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllItems()
        {
            var items = await _itemService.GetAllItemsAsync();
            var response = _mapper.Map<IEnumerable<ItemResponseDto>>(items);
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetItemById(int id)
        {
            var item = await _itemService.GetItemByIdAsync(id);
            if (item == null) return NotFound();

            var response = _mapper.Map<ItemResponseDto>(item);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> AddItem(ItemRequestDto itemDto)
        {
            var item = _mapper.Map<Item>(itemDto);
            await _itemService.AddItemAsync(item);
            return CreatedAtAction(nameof(GetItemById), new { id = item.Id }, item);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateItem(int id, ItemRequestDto itemDto)
        {
            if (id <= 0) return BadRequest("Invalid ID");

            var item = _mapper.Map<Item>(itemDto);
            item.Id = id;

            await _itemService.UpdateItemAsync(item);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(int id)
        {
            await _itemService.DeleteItemAsync(id);
            return NoContent();
        }

        [HttpGet("search")]
        public ActionResult<List<ItemResponseDto>> SearchItems([FromQuery] string query)
        {
            var itemList = _itemService.SearchItems(query);
            return Ok(itemList);
        }
    }
}
