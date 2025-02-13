namespace TransitHive.Dtos
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Phone { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
