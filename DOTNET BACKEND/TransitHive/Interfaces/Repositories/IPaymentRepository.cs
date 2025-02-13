using TransitHive.Models;
namespace TransitHive.Interfaces.Repositories
{
    public interface IPaymentRepository
    {
        Task<IEnumerable<Payment1>> GetPayments();
        Task<Payment1> GetPaymentById(int id);
        Task AddPayment(Payment1 payment);
        Task SaveChanges();

        Task<IEnumerable<Payment1>> GetPaymentByUserId(int userId);
    }
}
