namespace TransitHive.Dtos
{
    public class ItemResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal BasePrice { get; set; }

        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
    }
}
