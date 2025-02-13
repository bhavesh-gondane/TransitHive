using TransitHive.Interfaces.Repositories;
using TransitHive.Interfaces.Services;
using TransitHive.Models;

namespace TransitHive.Services
{
    public class ItemCategoryService : IItemCategoryService
    {
        private readonly IItemCategoryRepository _categoryRepository;

        public ItemCategoryService(IItemCategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        public async Task<IEnumerable<ItemCategory>> GetAllCategoriesAsync()
        {
            return await _categoryRepository.GetAllAsync();
        }

        public async Task<ItemCategory> GetCategoryByIdAsync(int id)
        {
            return await _categoryRepository.GetByIdAsync(id);
        }

        public async Task AddCategoryAsync(ItemCategory category)
        {
            await _categoryRepository.AddAsync(category);
        }

        public async Task UpdateCategoryAsync(ItemCategory category)
        {
            await _categoryRepository.UpdateAsync(category);
        }

        public async Task DeleteCategoryAsync(int id)
        {
            await _categoryRepository.DeleteAsync(id);
        }
    }
}
