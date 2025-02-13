using TransitHive.Dtos;
namespace TransitHive.Interfaces.Services
{
    public interface IUserService
    {
        Task<UserRespDto> GetUserByIdAsync(int id);
        Task<IEnumerable<UserRespDto>> GetAllUsersAsync();
        Task AddUserAsync(UserRespDto userDto);
        Task UpdateUserAsync(UserRespDto userDto);
        Task DeleteUserAsync(int id);
    }
}
