using TransitHive.Models;

namespace TransitHive.Interfaces.Repositories
{
    public interface IItemCategoryRepository
    {
        Task<IEnumerable<ItemCategory>> GetAllAsync();
        Task<ItemCategory> GetByIdAsync(int id);
        Task AddAsync(ItemCategory category);
        Task UpdateAsync(ItemCategory category);
        Task DeleteAsync(int id);
    }
}
