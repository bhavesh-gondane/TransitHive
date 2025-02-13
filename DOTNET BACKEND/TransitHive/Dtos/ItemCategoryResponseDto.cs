namespace TransitHive.Dtos
{
    public class ItemCategoryResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<string> ItemNames { get; set; }
    }
}
