namespace TransitHive.Models
{
    public class EmailVerification
    {
        public int Id { get; set; }
        public string Token { get; set; }
        public DateTime Expiration { get; set; }


        // Foreign keys for different roles
        public int? AdminId { get; set; }
        public Admin Admin { get; set; }

        public int? UserId { get; set; }
        public User User { get; set; }

        public int? VendorId { get; set; }
        public Vendor Vendor { get; set; }
    }
}
