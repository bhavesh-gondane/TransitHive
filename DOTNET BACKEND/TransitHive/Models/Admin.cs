using System.ComponentModel.DataAnnotations;
using TransitHive.Interfaces;

namespace TransitHive.Models
{
    public class Admin : IAccount
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Name is required")]
        [StringLength(100, ErrorMessage = "Name cannot be longer than 100 characters")]
        [RegularExpression("^[a-zA-Z ]*$", ErrorMessage = "Name can only contain letters and spaces")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Email should be valid")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [RegularExpression("^(?=.*[A-Za-z])[A-Za-z\\d@$!%*?&]{6,}$", ErrorMessage = "Password must be at least 6 characters long and contain at least one alphabet")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Phone is required")]
        [RegularExpression("^[6-9][0-9]{9}$", ErrorMessage = "Phone number must be 10 digits and start with 6, 7, 8, or 9")]
        public string Phone { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;


        public bool IsEmailVerified { get; set; } = false; // New field
        public string ResetToken { get; set; } // Stores password reset token
        public DateTime? ResetTokenExpiry { get; set; } // Expiry time for token    
        public string? City { get ; set; }
    }
}
