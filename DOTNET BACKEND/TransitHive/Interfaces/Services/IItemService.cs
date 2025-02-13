using TransitHive.Models;
using TransitHive.Dtos;

namespace TransitHive.Interfaces.Services
{
    public interface IItemService
    {
        Task<IEnumerable<Item>> GetAllItemsAsync();
        Task<Item> GetItemByIdAsync(int id);
        Task AddItemAsync(Item item);
        Task UpdateItemAsync(Item item);
        Task DeleteItemAsync(int id);

        List<ItemResponseDto> SearchItems(string query);
    }
}
