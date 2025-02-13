using Microsoft.AspNetCore.Mvc.ViewEngines;
using System.Collections.Generic;
using System.Numerics;
using System.Reflection.Emit;
using Microsoft.EntityFrameworkCore;
using TransitHive.Models;
using TransitHive.Dtos;

namespace TransitHive.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Admin> Admins { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Vendor> Vendors { get; set; }
        public DbSet<ItemCategory> ItemCategories { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<BookingItem> BookingItems { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Payment1> Payment { get; set; }
        public DbSet<Review> Reviews { get; set; }

        public DbSet<Otp> otps { get; set; }

        public DbSet<EmailVerification> EmailVerifications { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Admin
            modelBuilder.Entity<Admin>()
                .Property(a => a.Email)
                .IsRequired();
            modelBuilder.Entity<Admin>()
                .HasIndex(a => a.Email)
                .IsUnique();

            // User
            modelBuilder.Entity<User>()
                .Property(u => u.Email)
                .IsRequired();
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();
            modelBuilder.Entity<User>()
                .Property(u => u.ResetToken)
                .IsRequired(false); // Allow ResetToken to be nullable
            modelBuilder.Entity<User>()
                .Property(u => u.State)
                .IsRequired(); // Ensure State is not nullable
            modelBuilder.Entity<User>()
                .Property(u => u.City)
                .IsRequired(); // Ensure City is not nullable
            modelBuilder.Entity<User>()
                .Property(u => u.Address)
                .IsRequired(); // Address is required

            // Vendor
            modelBuilder.Entity<Vendor>()
                .Property(v => v.Email)
                .IsRequired();
            modelBuilder.Entity<Vendor>()
                .HasIndex(v => v.Email)
                .IsUnique();
            modelBuilder.Entity<Vendor>()
                .HasIndex(v => v.Gstin)
                .IsUnique();
            modelBuilder.Entity<Vendor>()
                .Property(v => v.Gstin)
                .IsRequired();
            modelBuilder.Entity<Vendor>()
                .HasIndex(v => v.OwnerAadharNumber)
                .IsUnique();
            modelBuilder.Entity<Vendor>()
                .Property(v => v.OwnerAadharNumber)
                .IsRequired();
            modelBuilder.Entity<Vendor>()
                .HasIndex(v => v.PanNumber)
                .IsUnique();
            modelBuilder.Entity<Vendor>()
                .Property(v => v.PanNumber)
                .IsRequired();
            modelBuilder.Entity<Vendor>()
                .Property(v => v.State)
                .IsRequired(); // Ensure State is not nullable
            modelBuilder.Entity<Vendor>()
                .Property(v => v.City)
                .IsRequired(); // Ensure City is not nullable
            modelBuilder.Entity<Vendor>()
                .Property(u => u.Address)
                .IsRequired(); // Address is required
            modelBuilder.Entity<Vendor>()
                .Property(v => v.Status)
                .HasConversion(v => v.ToString(), v => (Status)Enum.Parse(typeof(Status), v)) // Store enum as string (if using text-based enum storage)
                .HasColumnType("ENUM('PENDING', 'APPROVED', 'SUSPENDED')");

            // ItemCategory
            modelBuilder.Entity<ItemCategory>()
                .Property(ic => ic.Name)
                .IsRequired();
            modelBuilder.Entity<ItemCategory>()
                .HasIndex(ic => ic.Name)
                .IsUnique();

            // Item
            modelBuilder.Entity<Item>()
                .Property(i => i.Name)
                .IsRequired();
            modelBuilder.Entity<Item>()
                .HasOne(i => i.Category)
                .WithMany(ic => ic.Items)
                .HasForeignKey(i => i.CategoryId)
                .OnDelete(DeleteBehavior.Cascade);

            // Booking
            modelBuilder.Entity<Booking>()
                .Property(b => b.Name)
                .IsRequired();
            modelBuilder.Entity<Booking>()
                .Property(b => b.Mobile)
                .IsRequired();
            modelBuilder.Entity<Booking>()
                .HasOne(b => b.Vendor)
                .WithMany(v => v.Bookings)
                .HasForeignKey(b => b.VendorId);

            modelBuilder.Entity<Booking>()
                .HasOne(b => b.User)
                .WithMany(u => u.Bookings)
                .HasForeignKey(b => b.UserId);


            modelBuilder.Entity<Booking>()
                .Property(v => v.PickupLift)
                .HasConversion(v => v.ToString(), v => (LiftOption)Enum.Parse(typeof(LiftOption), v)) // Store enum as string (if using text-based enum storage)
                .HasColumnType("ENUM('YES', 'NO')");
            modelBuilder.Entity<Booking>()
                .Property(v => v.DropLift)
                .HasConversion(v => v.ToString(), v => (LiftOption)Enum.Parse(typeof(LiftOption), v)) // Store enum as string (if using text-based enum storage)
                .HasColumnType("ENUM('YES', 'NO')");
            modelBuilder.Entity<Booking>()
                .Property(v => v.Status)
                .HasConversion(v => v.ToString(), v => (BookingStatus)Enum.Parse(typeof(BookingStatus), v)) // Store enum as string (if using text-based enum storage)
                .HasColumnType("ENUM('PENDING', 'CONFIRMED', 'ASSIGNED', 'COMPLETED', 'CANCELLED')");

            // BookingItem
            modelBuilder.Entity<BookingItem>()
                .HasOne(bi => bi.Booking)
                .WithMany(b => b.Items)
                .HasForeignKey(bi => bi.BookingId)
                .OnDelete(DeleteBehavior.Cascade);


            // Payment
            modelBuilder.Entity<Payment>()
                .HasOne(p => p.Booking)
                .WithMany(b => b.Payments)
                .HasForeignKey(p => p.BookingId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Payment>()
                .HasOne(p => p.User)
                .WithMany(u => u.Payments)
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Payment>()
                .HasOne(p => p.Vendor)
                .WithMany(v => v.Payments)
                .HasForeignKey(p => p.VendorId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Payment>()
                .Property(v => v.Status)
                .HasConversion(v => v.ToString(), v => (PaymentStatus)Enum.Parse(typeof(PaymentStatus), v)) // Store enum as string (if using text-based enum storage)
                .HasColumnType("ENUM('SUCCESS', 'FAILED', 'PENDING')");

            // Review
            modelBuilder.Entity<Review>()
                .HasOne(r => r.Booking)
            .WithMany(b => b.Reviews)
                .HasForeignKey(r => r.BookingId)
                .OnDelete(DeleteBehavior.SetNull);
            modelBuilder.Entity<Review>()
                .HasOne(r => r.User)
            .WithMany(u => u.Reviews)
                .HasForeignKey(r => r.UserId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Review>()
                .HasOne(r => r.Vendor)
                .WithMany(v => v.Reviews)
                .HasForeignKey(r => r.VendorId)
                .OnDelete(DeleteBehavior.SetNull);


            // EmailVerification
            //modelBuilder.Entity<EmailVerification>()
            //    .HasIndex(ev => ev.Token)
            //    .IsUnique();
            //modelBuilder.Entity<EmailVerification>()
            //    .HasOne(ev => ev.User)
            //    .WithMany()
            //    .HasForeignKey(ev => ev.UserId);

            // EmailVerification
            modelBuilder.Entity<EmailVerification>()
                .HasOne(ev => ev.Admin)
                .WithMany()
                .HasForeignKey(ev => ev.AdminId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<EmailVerification>()
                .HasOne(ev => ev.User)
                .WithMany()
                .HasForeignKey(ev => ev.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<EmailVerification>()
                .HasOne(ev => ev.Vendor)
                .WithMany()
                .HasForeignKey(ev => ev.VendorId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
