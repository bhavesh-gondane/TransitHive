using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Stripe;

namespace TransitHive.Models
{
    public class Booking
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Mobile { get; set; }
        public string Email { get; set; }
        public string City { get; set; }
        public DateTime MoveDate { get; set; }
        public string PickupLocation { get; set; }
        public string DropLocation { get; set; }

        [Column(TypeName = "ENUM('PENDING', 'APPROVED', 'SUSPENDED')")]
        public LiftOption PickupLift { get; set; }
        public int? PickupFloors { get; set; }

        [Column(TypeName = "ENUM('YES','NO')")]
        public LiftOption DropLift { get; set; }
        public int? DropFloors { get; set; }
        public String PackagingType { get; set; }
        public int? VendorId { get; set; }
        public int UserId { get; set; }


        [Column(TypeName = "ENUM('PENDING', 'CONFIRMED', 'ASSIGNED', 'COMPLETED', 'CANCELLED')")]
        public BookingStatus Status { get; set; } = BookingStatus.PENDING;
        public decimal Cost { get; set; }

        public bool IsPaid { get; set; } = false;
        public bool IsReviewed { get; set; } = false;

        [Column(TypeName = "ENUM('CASH','CARD')")]
        public PaymentM PaymentMethod { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        // Navigation properties
        public User User { get; set; }
        public Vendor Vendor { get; set; }
        public ICollection<BookingItem> Items { get; set; }
        public ICollection<Payment> Payments { get; set; }
        public ICollection<Review> Reviews { get; set; }
    }

    public enum LiftOption { YES, NO }
    //public enum PackagingType { SingleLayered, DoubleLayered, Wooden }
    public enum BookingStatus { PENDING, CONFIRMED, ASSIGNED, COMPLETED, CANCELLED }

    public enum PaymentM { CASH, CARD }
}
