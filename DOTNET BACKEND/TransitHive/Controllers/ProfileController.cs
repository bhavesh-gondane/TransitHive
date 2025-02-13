using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using TransitHive.Data;
using TransitHive.Dtos;
using TransitHive.Helpers;
using TransitHive.Models;

namespace TransitHive.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowAllPolicy")]
    public class ProfileController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly JwtTokenHelper _jwtTokenHelper;

        public ProfileController(AppDbContext context, JwtTokenHelper jwtTokenHelper)
        {
            _context = context;
            _jwtTokenHelper = jwtTokenHelper;
        }

        [HttpGet("details")]
        public IActionResult GetProfileDetails([FromHeader(Name = "Authorization")] string token)
        {
            if (token.StartsWith("Bearer "))
            {
                token = token.Substring(7);
            }

            var email = _jwtTokenHelper.DecodeTokenAndExtractEmail(token);

            // Find profile by email
            var user = _context.Users.SingleOrDefault(u => u.Email == email);
            if (user != null)
            {
                var userDTO = new UserDto
                {
                    Id = user.Id,
                    Name = user.Name,
                    Email = user.Email,
                    Phone = user.Phone,
                    City = user.City
                };
                return Ok(userDTO);
            }

            var vendor = _context.Vendors.SingleOrDefault(v => v.Email == email);
            if (vendor != null)
            {
                var vendorDTO = new VendorDto
                {
                    Id = vendor.Id,
                    CompanyName = vendor.CompanyName,
                    Email = vendor.Email,
                    Phone = vendor.Phone,
                    Gstin = vendor.Gstin,
                    CompanyOwnerName = vendor.CompanyOwnerName,
                    OwnerAadharNumber = vendor.OwnerAadharNumber,
                    PanNumber = vendor.PanNumber,
                    City = vendor.City,
                    Amount = vendor.Amount,
                    Status = vendor.Status
                };
                return Ok(vendorDTO);
            }

            var admin = _context.Admins.SingleOrDefault(a => a.Email == email);
            if (admin != null)
            {
                var adminDTO = new AdminDto
                {
                    Id = admin.Id,
                    Name = admin.Name,
                    Email = admin.Email,
                    Phone = admin.Phone
                };
                return Ok(adminDTO);
            }

            return NotFound("Profile not found");
        }
    }
}
