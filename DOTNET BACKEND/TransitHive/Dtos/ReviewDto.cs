namespace TransitHive.Dtos
{
    public class ReviewDto
    {
        public int ReviewId { get; set; }
        public int? BookingId { get; set; }
        public int UserId { get; set; }
        public int? VendorId { get; set; }
        public int Rating { get; set; }
        public string Comment { get; set; }
        public DateTime ReviewDate { get; set; }
    }
}
