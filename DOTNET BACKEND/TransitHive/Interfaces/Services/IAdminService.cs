using TransitHive.Dtos;

namespace TransitHive.Interfaces.Services
{
    public interface IAdminService
    {
        Task<AdminDto> GetAdminByIdAsync(int id);
        Task<IEnumerable<AdminDto>> GetAllAdminsAsync();
        Task AddAdminAsync(AdminDto adminDto);
        Task UpdateAdminAsync(AdminDto adminDto);
        Task DeleteAdminAsync(int id);
        
    }
}
