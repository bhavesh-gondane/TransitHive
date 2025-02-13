using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TransitHive.Dtos;
using TransitHive.Interfaces.Repositories;
using TransitHive.Interfaces.Services;
using TransitHive.Models;

namespace TransitHive.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OtpController : ControllerBase
    {
        private readonly IOtpService _otpService;
       

        public OtpController(IOtpService otpService)
        {
            _otpService = otpService;
        }

        [HttpPost("generate/{bookingId}")]
        public async Task<IActionResult> GenerateOtp(int bookingId)
        {
            var isSuccess = await _otpService.GenerateAndSendOtpAsync(bookingId);
            if (!isSuccess)
            {
                return NotFound("Booking not found.");
            }

            return Ok("success");
        }

        [HttpPost("verify/{bookingId}")]
        public async Task<IActionResult> VerifyOtp(int bookingId, [FromBody] VerifyOtpDto verifyOtpDto)
        {
            var isValid = await _otpService.VerifyOtpAsync(bookingId, verifyOtpDto.Code,verifyOtpDto.PaymentMethod);
            if (!isValid)
            {
                return BadRequest("Invalid or expired OTP.");
            }           

            return Ok("success");
        }
    }

    
}
