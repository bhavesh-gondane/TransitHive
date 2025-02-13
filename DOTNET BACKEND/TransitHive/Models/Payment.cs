using System.ComponentModel.DataAnnotations.Schema;
using System.Numerics;

namespace TransitHive.Models
{
    public class Payment
    {
        public int PaymentId { get; set; }
        public int BookingId { get; set; }
        public int UserId { get; set; }
        public int VendorId { get; set; }
        public string PaymentMethod { get; set; }
        public decimal Amount { get; set; }
        public DateTime PaymentDate { get; set; } = DateTime.Now;

        [Column(TypeName = "ENUM('SUCCESS', 'FAILED', 'PENDING')")]
        public PaymentStatus Status { get; set; } = PaymentStatus.SUCCESS;
        public Booking Booking { get; set; }
        public User User { get; set; }
        public Vendor Vendor { get; set; }
    }

    public enum PaymentStatus
    {
        SUCCESS, FAILED, PENDING
    }
}
