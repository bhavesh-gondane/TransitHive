namespace TransitHive.Models
{
    public class Item
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CategoryId { get; set; }
        public decimal BasePrice { get; set; }
        public ItemCategory Category { get; set; }
        public ICollection<BookingItem> BookingItems { get; set; }
    }
}
