using TransitHive.Models;

namespace TransitHive.Dtos
{
    public class EmailVerificationDto
    {
        public int Id { get; set; }
        public string Token { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public DateTime Expiration { get; set; }
    }
}
