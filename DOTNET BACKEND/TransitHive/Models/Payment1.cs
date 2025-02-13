namespace TransitHive.Models
{
    public class Payment1
    {
        public int Id { get; set; }
        public string TransactionId { get; set; }
        public decimal Amount { get; set; }
        public string PaymentMethod { get; set; }
        public DateTime PaymentDate { get; set; }
        public int UserId { get; set; }
        public int BookingId { get; set; }
    }
}
