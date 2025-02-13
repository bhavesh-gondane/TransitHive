using TransitHive.Models;

namespace TransitHive.Dtos
{
    public class VendorRespDto
    {
        public int Id { get; set; }
        public string CompanyName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Gstin { get; set; }
        public string CompanyOwnerName { get; set; }
        public string OwnerAadharNumber { get; set; }
        public string PanNumber { get; set; }
        public string City { get; set; }
        public string Amount { get; set; }
        public Status Status { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }



}
