using System.Numerics;

namespace TransitHive.Models
{
    public class Review
    {
        public int ReviewId { get; set; }
        public int? BookingId { get; set; }
        public int UserId { get; set; }
        public int? VendorId { get; set; }
        public int Rating { get; set; }
        public string Comment { get; set; }
        public DateTime ReviewDate { get; set; } = DateTime.Now;
        public Booking Booking { get; set; }
        public User User { get; set; }
        public Vendor Vendor { get; set; }
    }
}
