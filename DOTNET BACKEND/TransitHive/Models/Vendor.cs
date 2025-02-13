using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using TransitHive.Interfaces;

namespace TransitHive.Models
{
    [Index(nameof(Gstin), IsUnique = true)]
    [Index(nameof(OwnerAadharNumber), IsUnique = true)]
    [Index(nameof(PanNumber), IsUnique = true)]
    [Index(nameof(Email), IsUnique = true)]
    public class Vendor : IAccount
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Company Name is required")]
        [StringLength(100, ErrorMessage = "Company name cannot be longer than 100 characters")]
        [RegularExpression("^[a-zA-Z0-9 ]*$", ErrorMessage = "Company name can only contain letters, numbers, and spaces")]
        public string CompanyName { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Email should be valid")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [RegularExpression("^(?=.*[A-Za-z])[A-Za-z\\d@$!%*?&]{6,}$", ErrorMessage = "Password must be at least 6 characters long and contain at least one alphabet")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Phone is required")]
        [RegularExpression("^[6-9][0-9]{9}$", ErrorMessage = "Phone number must be 10 digits and start with 6, 7, 8, or 9")]
        public string Phone { get; set; }

        [Required(ErrorMessage = "GSTIN is required")]
        [RegularExpression("^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$", ErrorMessage = "Invalid GSTIN format")]
        public string Gstin { get; set; }
        public string CompanyOwnerName { get; set; }

        [Required(ErrorMessage = "Owner Aadhar number is required")]
        [RegularExpression("^[0-9]{12}$", ErrorMessage = "Aadhar number must be 12 digits")]
        public string OwnerAadharNumber { get; set; }

        [Required(ErrorMessage = "PAN number is required")]
        [RegularExpression("^[A-Z]{5}[0-9]{4}[A-Z]{1}$", ErrorMessage = "Invalid PAN number format")]
        public string PanNumber { get; set; }

        [Required(ErrorMessage = "State is required")]
        public string State { get; set; }

        [Required(ErrorMessage = "City is required")]
        [StringLength(100, ErrorMessage = "City name cannot be longer than 100 characters")]
        [RegularExpression("^[a-zA-Z ]*$", ErrorMessage = "City name can only contain letters and spaces")]
        public string City { get; set; }

        [Required(ErrorMessage = "Address is required")]
        public string Address { get; set; }

        public string Amount { get; set; }
        public string? Comments { get; set; }

        public bool IsEmailVerified { get; set; } = false; // New field
        public string ResetToken { get; set; } // Stores password reset token
        public DateTime? ResetTokenExpiry { get; set; } // Expiry time for token

        [Column(TypeName = "ENUM('PENDING', 'APPROVED', 'SUSPENDED', 'REJECTED')")]
        public Status Status { get; set; } = Status.PENDING;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public ICollection<Booking> Bookings { get; set; }
        public ICollection<Payment> Payments { get; set; }
        public ICollection<Review> Reviews { get; set; }
    }

    public enum Status { PENDING, APPROVED, SUSPENDED, REJECTED }
}
