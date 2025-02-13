using TransitHive.Models;

namespace TransitHive.Interfaces.Services
{
    public interface IItemCategoryService
    {
        Task<IEnumerable<ItemCategory>> GetAllCategoriesAsync();
        Task<ItemCategory> GetCategoryByIdAsync(int id);
        Task AddCategoryAsync(ItemCategory category);
        Task UpdateCategoryAsync(ItemCategory category);
        Task DeleteCategoryAsync(int id);
    }
}
