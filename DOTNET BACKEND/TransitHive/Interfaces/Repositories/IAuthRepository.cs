using TransitHive.Models;

namespace TransitHive.Interfaces.Repositories
{
    public interface IAuthRepository
    {
        Task<bool> ValidateAdminCredentials(string email, string password);
        Task<bool> ValidateVendorCredentials(string email, string password);
        Task<bool> ValidateUserCredentials(string email, string password);
        Task<bool> IsEmailTaken(string email);
        Task RegisterAdmin(Admin admin);
        Task RegisterVendor(Vendor vendor);
        Task RegisterUser(User user);
    }
}
