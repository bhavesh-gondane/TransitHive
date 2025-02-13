using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TransitHive.Data;
using TransitHive.Helpers;
using TransitHive.Interfaces.Repositories;
using TransitHive.Models;

namespace TransitHive.Repositories
{
    public class OtpRepository : IOtpRepository
    {
        private readonly AppDbContext _context;
        private readonly EmailHelper _emailService;

        public OtpRepository(AppDbContext context, EmailHelper emailService)
        {
            _context = context;
            _emailService = emailService;
        }

        public async Task<Otp> GenerateOtpAsync(int bookingId)
        {
            var otpCode = new Random().Next(100000, 999999).ToString();
            var expirationTime = DateTime.UtcNow.AddMinutes(10);

            var booking = await _context.Bookings.FindAsync(bookingId);
            if (booking == null)
            {
                return null;
            }

            var otp = new Otp
            {
                Code = otpCode,
                Email = booking.Email,
                ExpirationTime = expirationTime,
                
            };
            
            _context.otps.Add(otp);
            await _context.SaveChangesAsync();

            return otp;
        }

        public async Task SendOtpAsync(Otp otp)
        {
            var message = $"Your OTP code is: {otp.Code}. It will expire at {otp.ExpirationTime} UTC.";
            await _emailService.SendEmailAsync(otp.Email, "Your OTP Code", message);
        }

        public async Task<Otp> VerifyOtpAsync(int bookingId, string code)
        {

            var booking = await _context.Bookings.FindAsync(bookingId);
            if (booking == null)
            {
                return null;
            }
            var email = booking.Email;
            var otp = await _context.otps
                .FirstOrDefaultAsync(o => o.Email == email && o.Code == code);

            if (otp == null || otp.ExpirationTime < DateTime.UtcNow)
            {
                return null;
            }

            return otp;
        }

        public async Task<Otp> GetOtpByEmailAndCodeAsync(string email, string code)
        {
            return await _context.otps
                .FirstOrDefaultAsync(o => o.Email == email && o.Code == code && o.ExpirationTime >= DateTime.UtcNow);
        }
    }
}
