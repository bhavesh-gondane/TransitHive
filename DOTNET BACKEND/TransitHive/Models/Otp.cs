using System;
using System.ComponentModel.DataAnnotations;

namespace TransitHive.Models
{
    public class Otp
    {
        [Key]
        public int Id { get; set; }

      
        public string Code { get; set; }

    
        public string Email { get; set; }

      
        public DateTime ExpirationTime { get; set; }

      
        public DateTime CreatedTime { get; set; } = DateTime.UtcNow;

      
    }
}
