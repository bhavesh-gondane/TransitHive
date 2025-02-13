using System.Threading.Tasks;
using TransitHive.Interfaces.Repositories;
using TransitHive.Interfaces.Services;
using TransitHive.Models;

namespace TransitHive.Services
{
    public class OtpService : IOtpService
    {
        private readonly IOtpRepository _otpRepository;
        private readonly IBookingRepository _bookingRepository;

        public OtpService(IOtpRepository otpRepository, IBookingRepository bookingRepository)
        {
            _otpRepository = otpRepository;
            _bookingRepository = bookingRepository;

        }

        public async Task<bool> GenerateAndSendOtpAsync(int bookingId)
        {
            var otp = await _otpRepository.GenerateOtpAsync(bookingId);
            if (otp == null)
            {
                return false;
            }

            await _otpRepository.SendOtpAsync(otp);
            return true;
        }

        public async Task<bool> VerifyOtpAsync(int bookingId, string code, PaymentM paymentMethod)
        {
            var otp = await _otpRepository.VerifyOtpAsync(bookingId, code);
            if (otp != null)
            {
               await  _bookingRepository.setpaymentMethod(bookingId, paymentMethod);

            }

            return otp != null;
        }
    }
}
