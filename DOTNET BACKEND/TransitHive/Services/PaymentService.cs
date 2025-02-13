using System.Runtime.InteropServices;
using AutoMapper;
using TransitHive.Dtos;
using TransitHive.Interfaces.Repositories;
using TransitHive.Interfaces.Services;
using TransitHive.Models;

namespace TransitHive.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly IPaymentRepository _repository;
        private readonly IBookingRepository bookingRepository;

        public PaymentService(IPaymentRepository repository, IBookingRepository bookingRepository)
        {
            _repository = repository;
            this.bookingRepository = bookingRepository;
        }

        public async Task<IEnumerable<Payment1>> GetAllPayments()
        {
            return await _repository.GetPayments();
        }

        public async Task<Payment1> GetPayment(int id)
        {
            return await _repository.GetPaymentById(id);
        }

        public async Task<IEnumerable<Payment1>> GetPaymentByUserId(int userId)
        {
            return await _repository.GetPaymentByUserId(userId);
        }

        public async Task ProcessPayment(Payment1 payment)
        {
            //if (string.IsNullOrEmpty(payment.UserId))
            //{
            //    throw new ArgumentException("UserId is required for processing payment.");
            //}
            await _repository.AddPayment(payment);
            await bookingRepository.IsPaidMark(payment.BookingId);
            await _repository.SaveChanges();
        }
    }
}
