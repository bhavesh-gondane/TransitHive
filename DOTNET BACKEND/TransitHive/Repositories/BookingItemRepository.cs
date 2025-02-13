using System;
using Microsoft.EntityFrameworkCore;
using TransitHive.Data;
using TransitHive.Interfaces.Repositories;
using TransitHive.Models;

namespace TransitHive.Repositories
{
    public class BookingItemRepository : IBookingItemRepository
    {
        private readonly AppDbContext _context;

        public BookingItemRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<BookingItem> GetBookingItemByIdAsync(int id)
        {
            return await _context.BookingItems.FindAsync(id);
        }

        public async Task<IEnumerable<BookingItem>> GetAllBookingItemsAsync()
        {
            return await _context.BookingItems.ToListAsync();
        }

        public async Task AddBookingItemAsync(BookingItem bookingItem)
        {
            await _context.BookingItems.AddAsync(bookingItem);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateBookingItemAsync(BookingItem bookingItem)
        {
            _context.BookingItems.Update(bookingItem);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteBookingItemAsync(int id)
        {
            var bookingItem = await _context.BookingItems.FindAsync(id);
            if (bookingItem != null)
            {
                _context.BookingItems.Remove(bookingItem);
                await _context.SaveChangesAsync();
            }
        }
    }
}
