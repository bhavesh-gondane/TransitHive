using TransitHive.Models;

namespace TransitHive.Dtos
{
    public class VerifyOtpDto
    {

        public string Code { get; set; }

        public PaymentM PaymentMethod { get; set; }
    }
}
