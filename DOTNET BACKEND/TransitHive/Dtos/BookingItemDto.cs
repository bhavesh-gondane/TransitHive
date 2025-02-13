namespace TransitHive.Dtos
{
    public class BookingItemDto
    {
        public int Id { get; set; }
        public int BookingId { get; set; }
        public int ItemId { get; set; }
        public string ItemName { get; set; }
        public int Quantity { get; set; }
    }
}
