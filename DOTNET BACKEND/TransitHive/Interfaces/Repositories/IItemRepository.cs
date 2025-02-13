using TransitHive.Models;

namespace TransitHive.Interfaces.Repositories
{
    public interface IItemRepository
    {
        Task<IEnumerable<Item>> GetAllAsync();
        Task<Item> GetByIdAsync(int id);
        Task AddAsync(Item item);
        Task UpdateAsync(Item item);
        Task DeleteAsync(int id);
        List<Item> FindByNameContaining(string query);
    }
}
