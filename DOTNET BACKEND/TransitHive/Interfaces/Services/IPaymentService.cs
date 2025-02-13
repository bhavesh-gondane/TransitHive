using TransitHive.Dtos;
using TransitHive.Models;
namespace TransitHive.Interfaces.Services
{
    public interface IPaymentService
    {
        Task<IEnumerable<Payment1>> GetAllPayments();
        Task<Payment1> GetPayment(int id);
        Task ProcessPayment(Payment1 payment);

        Task<IEnumerable<Payment1>> GetPaymentByUserId(int userId);
    }
}
