using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TransitHive.Data;
using TransitHive.Dtos;
using TransitHive.Helpers;
using TransitHive.Interfaces;
using TransitHive.Interfaces.Repositories;
using TransitHive.Interfaces.Services;
using TransitHive.Models;
using TransitHive.Repositories;
using TransitHive.Services;

namespace TransitHive.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly EmailHelper _emailHelper;
        private readonly AppDbContext _appDbContext;
        private readonly IAuthRepository _authRepository;


        public AuthController(IAuthService authService, EmailHelper emailHelper, AppDbContext appDbContext, IConfiguration configuration, IAuthRepository authRepository)
        {
            _authService = authService;
            _emailHelper = new EmailHelper(configuration);
            _appDbContext = appDbContext;
            _authRepository = authRepository;

        }

        //[HttpPost("login")]
        //public async Task<ActionResult<string>> Login([FromBody] AuthDto authDto)
        //{
        //    var response = await _authService.Login(authDto);
        //    if (response == null)
        //    {
        //        return Unauthorized();
        //    }
        //    return Ok(response);
        //}

        

        [HttpPost("login")]
        public async Task<ActionResult<ApiResponse>> Login([FromBody] AuthDto authDto)
        {
            var account = await _authService.GetAccountByEmail(authDto.Email);
            if (account == null)
            {
                return new ApiResponse("Invalid email or password" );
            }

            if (!account.IsEmailVerified)
            {


                return new ApiResponse("Email not verified! Please check your email to verify your account");

            }

            var response = await _authService.Login(authDto);
            if (response == null)
            {
                return new ApiResponse("Invalid email or password");
            }

            return Ok(new ApiResponse(response));
        }



        [HttpPost("admin/register")]
        public async Task<ActionResult<string>> RegisterAdmin([FromBody] AdminDto adminDto)
        {
            Console.WriteLine(adminDto);
            if (await _authRepository.IsEmailTaken(adminDto.Email))
            {
                return BadRequest("Email already in use.");
            }

            // Create the admin
            var admin = new Admin
            {
                Name = adminDto.Name,
                Email = adminDto.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(adminDto.Password),
                Phone = adminDto.Phone,
                CreatedAt = DateTime.Now,
                ResetToken = Guid.NewGuid().ToString()
            };
            await _appDbContext.Admins.AddAsync(admin);
            await _appDbContext.SaveChangesAsync();

            // Generate a verification token
            var token = Guid.NewGuid().ToString();
            var expiration = DateTime.Now.AddMinutes(15); // Token valid for 15 minutes

            var emailVerification = new EmailVerification
            {
                Token = token,
                AdminId = admin.Id, // Use the generated Id
                Expiration = expiration
            };
            _appDbContext.EmailVerifications.Add(emailVerification);
            await _appDbContext.SaveChangesAsync();

            // Send verification email
            var verificationLink = $"{Request.Scheme}://{Request.Host}/api/auth/verify-email?token={token}";
            await _emailHelper.SendEmailAsync(adminDto.Email, "Email Verification", $"Please verify your email by clicking <a href='{verificationLink}'>here</a>.");

            return Ok("Registration successful! Please check your email to verify your account.");
        }



        //[HttpPost("vendor/register")]
        //public async Task<ActionResult<ApiResponse>> RegisterVendor([FromBody] VendorDto vendorDto)
        //{
        //    Console.WriteLine(vendorDto);
        //    if (await _authRepository.IsEmailTaken(vendorDto.Email))
        //    {
        //        return new ApiResponse("Email already in use.");
        //    }

        //    // Create the vendor
        //    var vendor = new Vendor
        //    {
        //        CompanyName = vendorDto.CompanyName,
        //        Email = vendorDto.Email,
        //        Password = BCrypt.Net.BCrypt.HashPassword(vendorDto.Password),
        //        Phone = vendorDto.Phone,
        //        Gstin = vendorDto.Gstin,
        //        CompanyOwnerName = vendorDto.CompanyOwnerName,
        //        OwnerAadharNumber = vendorDto.OwnerAadharNumber,
        //        PanNumber = vendorDto.PanNumber,
        //        City = vendorDto.City,
        //        Amount = vendorDto.Amount,
        //        CreatedAt = DateTime.Now,
        //        Status = Status.PENDING, // Assuming initial status is PENDING
        //        ResetToken = Guid.NewGuid().ToString()
        //    };
        //    await _appDbContext.Vendors.AddAsync(vendor);
        //    await _appDbContext.SaveChangesAsync();


        //    // Generate a verification token
        //    var token = Guid.NewGuid().ToString();
        //    var expiration = DateTime.Now.AddMinutes(15); // Token valid for 15 minutes

        //    var emailVerification = new EmailVerification
        //    {
        //        Token = token,
        //        VendorId = vendor.Id, // Use the generated Id
        //        Expiration = expiration
        //    };
        //    _appDbContext.EmailVerifications.Add(emailVerification);
        //    await _appDbContext.SaveChangesAsync();

        //    // Send verification email
        //    var verificationLink = $"{Request.Scheme}://{Request.Host}/api/auth/verify-email?token={token}";
        //    await _emailHelper.SendEmailAsync(vendorDto.Email, "Email Verification", $"Please verify your email by clicking <a href='{verificationLink}'>here</a>.");

        //    return Ok(new ApiResponse("Registration successful! Please check your email to verify your account."));
        //}



        //[HttpPost("user/register")]
        //public async Task<ActionResult<ApiResponse>> RegisterUser([FromBody] UserDto userDto)
        //{
        //    Console.WriteLine(userDto);
        //    if (await _authRepository.IsEmailTaken(userDto.Email))
        //    {
        //        return new ApiResponse("Email already in use.");
        //    }

        //    // Create the user
        //    var user = new User
        //    {
        //        Name = userDto.Name,
        //        Email = userDto.Email,
        //        Password = BCrypt.Net.BCrypt.HashPassword(userDto.Password),
        //        Phone = userDto.Phone,
        //        City = userDto.City,
        //        CreatedAt = DateTime.Now,
        //        ResetToken = Guid.NewGuid().ToString()
        //    };
        //    _appDbContext.Users.AddAsync(user);
        //    await _appDbContext.SaveChangesAsync();

        //    // Generate a verification token
        //    var token = Guid.NewGuid().ToString();
        //    var expiration = DateTime.Now.AddMinutes(15); // Token valid for 15 minutes

        //    var emailVerification = new EmailVerification
        //    {
        //        Token = token,
        //        UserId = user.Id, // Use the generated Id
        //        Expiration = expiration
        //    };
        //    _appDbContext.EmailVerifications.Add(emailVerification);
        //    await _appDbContext.SaveChangesAsync();

        //    // Send verification email
        //    var verificationLink = $"{Request.Scheme}://{Request.Host}/api/auth/verify-email?token={token}";
        //    await _emailHelper.SendEmailAsync(userDto.Email, "Email Verification", $"Please verify your email by clicking <a href='{verificationLink}'>here</a>.");

        //    return Ok(new ApiResponse("Registration successful! Please check your email to verify your account."));
        //}



        [HttpPost("vendor/register")]
        public async Task<IActionResult> RegisterVendor([FromBody] VendorDto vendorDto)
        {
            Console.WriteLine(vendorDto);
            if (_appDbContext.Vendors.Any(v => v.Email == vendorDto.Email))
            {
                return BadRequest("Email already in use.");
            }

            // Create the vendor
            var vendor = new Vendor
            {
                CompanyName = vendorDto.CompanyName,
                Email = vendorDto.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(vendorDto.Password),
                Phone = vendorDto.Phone,
                Gstin = vendorDto.Gstin,
                CompanyOwnerName = vendorDto.CompanyOwnerName,
                OwnerAadharNumber = vendorDto.OwnerAadharNumber,
                PanNumber = vendorDto.PanNumber,
                State = vendorDto.State,
                City = vendorDto.City,
                Address = vendorDto.Address, // New field
                Amount = vendorDto.Amount,
                CreatedAt = DateTime.Now,
                Status = Status.PENDING, // Assuming initial status is PENDING
                ResetToken = Guid.NewGuid().ToString()
            };
            await _appDbContext.Vendors.AddAsync(vendor);
            await _appDbContext.SaveChangesAsync();

            // Generate a verification token
            var token = Guid.NewGuid().ToString();
            var expiration = DateTime.Now.AddMinutes(15); // Token valid for 15 minutes

            var emailVerification = new EmailVerification
            {
                Token = token,
                VendorId = vendor.Id, // Use the generated Id
                Expiration = expiration
            };
            _appDbContext.EmailVerifications.Add(emailVerification);
            await _appDbContext.SaveChangesAsync();

            // Send verification email
            var verificationLink = $"{Request.Scheme}://{Request.Host}/api/auth/verify-email?token={token}";
            await _emailHelper.SendEmailAsync(vendorDto.Email, "Email Verification", $"Please verify your email by clicking <a href='{verificationLink}'>here</a>.");

            return Ok("Registration successful! Please check your email to verify your account.");
        }




        [HttpPost("user/register")]
        public async Task<IActionResult> RegisterUser([FromBody] UserDto userDto)
        {
            Console.WriteLine(userDto);
            if (_appDbContext.Users.Any(u => u.Email == userDto.Email))
            {
                return BadRequest("Email already in use.");
            }

            // Create the user
            var user = new User
            {
                Name = userDto.Name,
                Email = userDto.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(userDto.Password),
                Phone = userDto.Phone,
                State = userDto.State,
                City = userDto.City,
                Address = userDto.Address, // New field
                CreatedAt = DateTime.Now,
                ResetToken = Guid.NewGuid().ToString()
            };
            await _appDbContext.Users.AddAsync(user);
            await _appDbContext.SaveChangesAsync();

            // Generate a verification token
            var token = Guid.NewGuid().ToString();
            var expiration = DateTime.Now.AddMinutes(15); // Token valid for 15 minutes

            var emailVerification = new EmailVerification
            {
                Token = token,
                UserId = user.Id, // Use the generated Id
                Expiration = expiration
            };
            _appDbContext.EmailVerifications.Add(emailVerification);
            await _appDbContext.SaveChangesAsync();

            // Send verification email
            var verificationLink = $"{Request.Scheme}://{Request.Host}/api/auth/verify-email?token={token}";
            await _emailHelper.SendEmailAsync(userDto.Email, "Email Verification", $"Please verify your email by clicking <a href='{verificationLink}'>here</a>.");

            return Ok("Registration successful! Please check your email to verify your account.");
        }



        [HttpGet("verify-email")]
        public async Task<IActionResult> VerifyEmail(string token)
        {
            var verification = _appDbContext.EmailVerifications.FirstOrDefault(ev => ev.Token == token);
            if (verification == null || verification.Expiration < DateTime.Now)
            {
                return BadRequest(new { message = "Invalid or expired token." });
            }

            IAccount account = _appDbContext.Users.Find(verification.UserId) as IAccount ??
                               _appDbContext.Vendors.Find(verification.VendorId) as IAccount ??
                               _appDbContext.Admins.Find(verification.AdminId) as IAccount;

            if (account == null)
            {
                Console.WriteLine("failed");
                return BadRequest(new { message = "Account not found." });
            }

            account.IsEmailVerified = true;
            _appDbContext.Update(account);
            await _appDbContext.SaveChangesAsync();

            _appDbContext.EmailVerifications.Remove(verification);
            await _appDbContext.SaveChangesAsync();

            string loginLink;
            if (verification.UserId.HasValue)
            {
                loginLink = "http://localhost:5173/login/user";
            }
            else if (verification.VendorId.HasValue)
            {
                loginLink = "http://localhost:5173/login/vendor";
            }
            else if (verification.AdminId.HasValue)
            {
                loginLink = "http://localhost:5173/login/admin";
            }
            else
            {
                return BadRequest(new { message = "Invalid account type." });
            }

            string htmlContent = $"<html><body><p>Email successfully verified. You can now <a href='{loginLink}'>Login</a>.</p></body></html>";
            return Content(htmlContent, "text/html");
        }



        //[HttpGet("verify-email")]
        //public async Task<IActionResult> VerifyEmail(string token)
        //{
        //    var verification = _appDbContext.EmailVerifications.FirstOrDefault(ev => ev.Token == token);
        //    if (verification == null || verification.Expiration < DateTime.Now)
        //    {
        //        return BadRequest("Invalid or expired token.");
        //    }

        //    Console.WriteLine($"Verification found: Token={verification.Token}, UserId={verification.UserId}, VendorId={verification.VendorId}, AdminId={verification.AdminId}");

        //    User user = _appDbContext.Users.Find(verification.UserId);
        //    Vendor vendor = _appDbContext.Vendors.Find(verification.VendorId);
        //    Admin admin = _appDbContext.Admins.Find(verification.AdminId);

        //    Console.WriteLine($"User found: {user != null}, UserId: {verification.UserId}");
        //    Console.WriteLine($"Vendor found: {vendor != null}, VendorId: {verification.VendorId}");
        //    Console.WriteLine($"Admin found: {admin != null}, AdminId: {verification.AdminId}");

        //    IAccount account = user as IAccount ?? vendor as IAccount ?? admin as IAccount;

        //    if (account == null)
        //    {
        //        Console.WriteLine("Account not found for the given verification record.");
        //        return BadRequest("Account not found.");
        //    }

        //    account.IsEmailVerified = true;
        //    _appDbContext.Update(account);
        //    await _appDbContext.SaveChangesAsync();

        //    _appDbContext.EmailVerifications.Remove(verification);
        //    await _appDbContext.SaveChangesAsync();

        //    string loginLink;
        //    if (verification.UserId.HasValue)
        //    {
        //        loginLink = "http://localhost:5173/login/user";
        //    }
        //    else if (verification.VendorId.HasValue)
        //    {
        //        loginLink = "http://localhost:5173/login/vendor";
        //    }
        //    else if (verification.AdminId.HasValue)
        //    {
        //        loginLink = "http://localhost:5173/login/admin";
        //    }
        //    else
        //    {
        //        return BadRequest("Invalid account type.");
        //    }

        //    string htmlContent = $"<html><body><p>Email successfully verified. You can now <a href='{loginLink}'>Login</a>.</p></body></html>";
        //    return Content(htmlContent, "text/html");
        //}



        // 1. Request Password Reset
        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequestDto request)
        {
            IAccount account = _appDbContext.Users.FirstOrDefault(u => u.Email == request.Email) as IAccount ??
                               _appDbContext.Vendors.FirstOrDefault(v => v.Email == request.Email) as IAccount ??
                               _appDbContext.Admins.FirstOrDefault(a => a.Email == request.Email) as IAccount;

            if (account == null)
                return BadRequest(new { message = "User, Vendor, or Admin not found" });

            account.ResetToken = Guid.NewGuid().ToString();
            account.ResetTokenExpiry = DateTime.UtcNow.AddMinutes(15);
            _appDbContext.Update(account);
            await _appDbContext.SaveChangesAsync();

            string resetLink = $"http://localhost:5173/reset-password?token={account.ResetToken}"; // Adjust URL as needed
            await _emailHelper.SendPasswordResetEmailAsync(request.Email, resetLink);

            return Ok(new { message = "Password reset link has been sent to your email" });
        }


        // 2. Verify Reset Token
        [HttpGet("verify-reset-token")]
        public IActionResult VerifyResetToken([FromQuery] string token)
        {
            IAccount account = _appDbContext.Users.FirstOrDefault(u => u.ResetToken == token && u.ResetTokenExpiry > DateTime.UtcNow) as IAccount ??
                               _appDbContext.Vendors.FirstOrDefault(v => v.ResetToken == token && v.ResetTokenExpiry > DateTime.UtcNow) as IAccount ??
                               _appDbContext.Admins.FirstOrDefault(a => a.ResetToken == token && a.ResetTokenExpiry > DateTime.UtcNow) as IAccount;

            if (account == null)
                return BadRequest(new { message = "Invalid or expired token" });

            return Ok(new { message = "Valid token" });
        }



        // 3. Reset Password
        [HttpPost("reset-password")]
        public IActionResult ResetPassword([FromBody] ResetPasswordRequest request)
        {
            IAccount account = _appDbContext.Users.FirstOrDefault(u => u.ResetToken == request.Token && u.ResetTokenExpiry > DateTime.UtcNow) as IAccount ??
                               _appDbContext.Vendors.FirstOrDefault(v => v.ResetToken == request.Token && v.ResetTokenExpiry > DateTime.UtcNow) as IAccount ??
                               _appDbContext.Admins.FirstOrDefault(a => a.ResetToken == request.Token && a.ResetTokenExpiry > DateTime.UtcNow) as IAccount;

            if (account == null)
                return BadRequest(new { message = "Invalid or expired token" });

            account.Password = BCrypt.Net.BCrypt.HashPassword(request.NewPassword); // Hash the password
            //account.ResetToken = null;
            //account.ResetTokenExpiry = null;
            _appDbContext.Update(account);
            _appDbContext.SaveChanges();

            return Ok(new { message = "Password successfully reset" });
        }
    }
}



























//[HttpPost("admin/register")]
//public async Task<ActionResult> RegisterAdmin([FromBody] AdminDto adminDto)
//{
//    try
//    {
//        await _authService.RegisterAdmin(adminDto);
//        return Ok("Admin registered successfully");
//    }
//    catch (Exception ex)
//    {
//        return BadRequest(ex.Message);
//    }
//}

//[HttpPost("vendor/register")]
//public async Task<ActionResult> RegisterVendor([FromBody] VendorDto vendorDto)
//{
//    try
//    {
//        await _authService.RegisterVendor(vendorDto);
//        return Ok("Vendor registered successfully");
//    }
//    catch (Exception ex)
//    {
//        return BadRequest(ex.Message);
//    }
//}

//[HttpPost("user/register")]
//public async Task<ActionResult> RegisterUser([FromBody] UserDto userDto)
//{
//    Console.WriteLine(userDto);
//    try
//    {
//        await _authService.RegisterUser(userDto);
//        return Ok("User registered successfully");
//    }
//    catch (Exception ex)
//    {
//        return BadRequest(ex.Message);
//    }
//}