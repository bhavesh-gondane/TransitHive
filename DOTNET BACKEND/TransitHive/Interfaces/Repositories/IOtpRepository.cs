using System.Threading.Tasks;
using TransitHive.Models;

namespace TransitHive.Interfaces.Repositories
{
    public interface IOtpRepository
    {
        Task<Otp> GenerateOtpAsync(int bookingId);
        Task SendOtpAsync(Otp otp);
        Task<Otp> VerifyOtpAsync(int bookingId, string code);
        Task<Otp> GetOtpByEmailAndCodeAsync(string email, string code);
    }
}
