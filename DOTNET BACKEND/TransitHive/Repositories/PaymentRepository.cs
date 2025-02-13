using System;
using Microsoft.EntityFrameworkCore;
using TransitHive.Data;
using TransitHive.Interfaces.Repositories;
using TransitHive.Models;

namespace TransitHive.Repositories
{
    public class PaymentRepository : IPaymentRepository
    {
        private readonly AppDbContext _context;

        public PaymentRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Payment1>> GetPayments()
        {
            return await _context.Payment.ToListAsync();
        }

        public async Task<Payment1> GetPaymentById(int id)
        {
            return await _context.Payment.FindAsync(id);
        }

        public async Task AddPayment(Payment1 payment)
        {
            await _context.Payment.AddAsync(payment);
        }

        public async Task SaveChanges()
        {
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Payment1>> GetPaymentByUserId(int userId)
        {
            return await _context.Payment.Where(p => p.UserId == userId).ToListAsync();
        }
    }
}
