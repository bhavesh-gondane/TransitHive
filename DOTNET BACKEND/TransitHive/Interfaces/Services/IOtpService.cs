using System.Threading.Tasks;
using TransitHive.Models;

namespace TransitHive.Interfaces.Services
{
    public interface IOtpService
    {
        Task<bool> GenerateAndSendOtpAsync(int bookingId);
        Task<bool> VerifyOtpAsync(int bookingId, string code, PaymentM paymentMethod);
    }
}
