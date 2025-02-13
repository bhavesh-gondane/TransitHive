using TransitHive.Models;

namespace TransitHive.Dtos
{
    public class PaymentDto
    {
        public int PaymentId { get; set; }
        public int BookingId { get; set; }
        public int UserId { get; set; }
        public int VendorId { get; set; }
        public string PaymentMethod { get; set; }
        public decimal Amount { get; set; }
        public DateTime PaymentDate { get; set; }
        public PaymentStatus Status { get; set; } = PaymentStatus.PENDING;
    }

   
}
