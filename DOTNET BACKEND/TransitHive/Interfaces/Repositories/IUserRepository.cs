﻿using TransitHive.Models;
namespace TransitHive.Interfaces.Repositories
{
    public interface IUserRepository
    {
        Task<User> GetUserByIdAsync(int id);
        Task<IEnumerable<User>> GetAllUsersAsync();
        Task AddUserAsync(User user);
        Task UpdateUserAsync(User user);
        Task DeleteUserAsync(int id);

        Task<User> GetUserByEmailAsync(string email);

        public Task<int> GetTotalUsersAsync();
    }
}
