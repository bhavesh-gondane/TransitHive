using TransitHive.Models;

namespace TransitHive.Dtos
{
    public class BookingWithItemsDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Mobile { get; set; }
        public string Email { get; set; }
        public string City { get; set; }
        public DateTime MoveDate { get; set; }
        public string PickupLocation { get; set; }
        public string DropLocation { get; set; }
        public LiftOption PickupLift { get; set; }
        public int? PickupFloors { get; set; }
        public LiftOption DropLift { get; set; }
        public int? DropFloors { get; set; }
        public String PackagingType { get; set; }

        public bool IsPaid { get; set; } 
        public bool IsReviewed { get; set; } 

        public PaymentM PaymentMethod { get; set; }

        public int UserId { get; set; }  // Add UserId property
        public BookingStatus Status { get; set; } = BookingStatus.PENDING;
        public decimal? Cost { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public List<BookingItemRequestDto> Items { get; set; }
    }

    //public enum LiftOptionDto { Yes, No }
    //public enum PackagingTypeDto { SingleLayered, DoubleLayered, Wooden }
    //public enum BookingStatusDto { Pending, Confirmed, Assigned, Completed, Cancelled }
}
