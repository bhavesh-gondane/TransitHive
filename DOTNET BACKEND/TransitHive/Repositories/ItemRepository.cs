using TransitHive.Interfaces.Repositories;
using TransitHive.Models;
using TransitHive.Data;
using Microsoft.EntityFrameworkCore;

namespace TransitHive.Repositories
{
    public class ItemRepository : IItemRepository
    {
        private readonly AppDbContext _context;

        public ItemRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Item>> GetAllAsync()
        {
            return await _context.Items.Include(i => i.Category).ToListAsync();
        }

        public async Task<Item> GetByIdAsync(int id)
        {
            return await _context.Items.Include(i => i.Category).FirstOrDefaultAsync(i => i.Id == id);
        }

        public async Task AddAsync(Item item)
        {
            await _context.Items.AddAsync(item);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Item item)
        {
            _context.Items.Update(item);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var item = await _context.Items.FindAsync(id);
            if (item != null)
            {
                _context.Items.Remove(item);
                await _context.SaveChangesAsync();
            }
        }

        public List<Item> FindByNameContaining(string query)
        {
            return _context.Items
        .Include(item => item.Category)  // Ensure Category is loaded
        .Where(item => item.Name.Contains(query))
        .ToList();
        }
    }
}
