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
    public class ItemCategoryController : ControllerBase
    {
        private readonly IItemCategoryService _categoryService;
        private readonly IMapper _mapper;

        public ItemCategoryController(IItemCategoryService categoryService, IMapper mapper)
        {
            _categoryService = categoryService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCategories()
        {
            var categories = await _categoryService.GetAllCategoriesAsync();
            var response = _mapper.Map<IEnumerable<ItemCategoryResponseDto>>(categories);
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategoryById(int id)
        {
            var category = await _categoryService.GetCategoryByIdAsync(id);
            if (category == null) return NotFound();

            var response = _mapper.Map<ItemCategoryResponseDto>(category);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> AddCategory(ItemCategoryRequestDto categoryDto)
        {
            var category = _mapper.Map<ItemCategory>(categoryDto);
            await _categoryService.AddCategoryAsync(category);
            return CreatedAtAction(nameof(GetCategoryById), new { id = category.Id }, category);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategory(int id, ItemCategoryRequestDto categoryDto)
        {
            if (id <= 0) return BadRequest("Invalid ID");

            var category = _mapper.Map<ItemCategory>(categoryDto);
            category.Id = id;

            await _categoryService.UpdateCategoryAsync(category);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            await _categoryService.DeleteCategoryAsync(id);
            return NoContent();
        }
    }
}
