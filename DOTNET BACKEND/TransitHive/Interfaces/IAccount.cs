namespace TransitHive.Interfaces
{
    public interface IAccount
    {
        int Id { get; set; }
        string Email { get; set; }
        string Password { get; set; }
        string Phone { get; set; }
        string City { get; set; }
        bool IsEmailVerified { get; set; }
        string ResetToken { get; set; }
        DateTime? ResetTokenExpiry { get; set; }
    }
}