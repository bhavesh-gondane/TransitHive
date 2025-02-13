using TransitHive.Interfaces.Repositories;
using TransitHive.Models;
using TransitHive.Data;
using Microsoft.EntityFrameworkCore;

namespace TransitHive.Repositories
{
    public class ItemCategoryRepository : IItemCategoryRepository
    {
        private readonly AppDbContext _context;

        public ItemCategoryRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ItemCategory>> GetAllAsync()
        {
            return await _context.ItemCategories.Include(c => c.Items).ToListAsync();
        }

        public async Task<ItemCategory> GetByIdAsync(int id)
        {
            return await _context.ItemCategories.Include(c => c.Items).FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task AddAsync(ItemCategory category)
        {
            await _context.ItemCategories.AddAsync(category);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(ItemCategory category)
        {
            _context.ItemCategories.Update(category);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var category = await _context.ItemCategories.FindAsync(id);
            if (category != null)
            {
                _context.ItemCategories.Remove(category);
                await _context.SaveChangesAsync();
            }
        }
    }
}
