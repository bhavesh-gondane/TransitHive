using System;
using Microsoft.EntityFrameworkCore;
using TransitHive.Data;
using TransitHive.Interfaces.Repositories;
using TransitHive.Models;

namespace TransitHive.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<User> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task AddUserAsync(User user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateUserAsync(User user)
        {

            User user1 = await _context.Users.FindAsync(user.Id);
            if (user1 != null)
            {

                user1.Name = user.Name;
                user1.Phone = user.Phone;
                user1.City = user.City;

                _context.Users.Update(user1);
                await _context.SaveChangesAsync();
            }

        }

        public async Task DeleteUserAsync(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user != null)
            {
                _context.Users.Remove(user);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            User user = await _context.Users.SingleOrDefaultAsync(u => u.Email == email);
            return user;
        }

        public async Task<int> GetTotalUsersAsync()
        {
            return await _context.Users.CountAsync();
        }
    }
}
