namespace TransitHive.Models
{
    public class BookingItem
    {
        public int Id { get; set; }
        public int BookingId { get; set; }
        public string Name { get; set; }

        public int Quantity { get; set; }

        public decimal BasePrice { get; set; }
        public Booking Booking { get; set; }
        
    }
}
