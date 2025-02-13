using Microsoft.EntityFrameworkCore;
using TransitHive.Data;
using TransitHive.Interfaces.Repositories;
using TransitHive.Models;
using BCrypt.Net;
using TransitHive.Helpers;

namespace TransitHive.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        private readonly AppDbContext _context;

        private readonly EmailHelper emailHelper;

        public AuthRepository(AppDbContext context, EmailHelper emailHelper)
        {
            _context = context;
            this.emailHelper = emailHelper;
        }

        public async Task<bool> ValidateAdminCredentials(string email, string password)
        {
            var admin = await _context.Admins.SingleOrDefaultAsync(a => a.Email == email);
            if (admin == null || !BCrypt.Net.BCrypt.Verify(password, admin.Password))
            {
                return false;
            }
            return true;
        }

        public async Task<bool> ValidateVendorCredentials(string email, string password)
        {
            var vendor = await _context.Vendors.SingleOrDefaultAsync(v => v.Email == email);
            if (vendor == null || !BCrypt.Net.BCrypt.Verify(password, vendor.Password))
            {
                return false;
            }
            return true;
        }

        public async Task<bool> ValidateUserCredentials(string email, string password)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.Password))
            {
                return false;
            }
            return true;
        }

        public async Task<bool> IsEmailTaken(string email)
        {
            var isTaken = await _context.Admins.AnyAsync(a => a.Email == email) ||
                          await _context.Vendors.AnyAsync(v => v.Email == email) ||
                          await _context.Users.AnyAsync(u => u.Email == email);

            return isTaken;
        }

        public async Task RegisterAdmin(Admin admin)
        {
            await _context.Admins.AddAsync(admin);
            await _context.SaveChangesAsync();
        }

        public async Task RegisterVendor(Vendor vendor)
        {

            await _context.Vendors.AddAsync(vendor);

            emailHelper.SendEmailAsync(vendor.Email, "Registration Sucessfull", "Thank You registering as a vendor to our platform, your Regstrion is SucessFull and under Review now please be Patient while we review your application");

            await _context.SaveChangesAsync();
        }

        public async Task RegisterUser(User user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
        }
    }
}
