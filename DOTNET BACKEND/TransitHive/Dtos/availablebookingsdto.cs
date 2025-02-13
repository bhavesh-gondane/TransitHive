using TransitHive.Models;

namespace TransitHive.Dtos
{
    public class availablebookingsdto
    {
        public int Id { get; set; }
        public string Name = null;
        public string Mobile = null;
        public string Email = null;
        public string City = null;
        public DateTime MoveDate { get; set; }
        public string PickupLocation { get; set; }
        public string DropLocation { get; set; }
        public LiftOption PickupLift { get; set; }
        public int? PickupFloors { get; set; }
        public LiftOption DropLift { get; set; }
        public int? DropFloors { get; set; }
        public String PackagingType { get; set; }

        public int UserId = 0;
        public BookingStatus Status { get; set; } = BookingStatus.PENDING;
        public decimal? Cost { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public List<BookingItemRequestDto> Items { get; set; }
    }

    //public enum LiftOptionDto { Yes, No }
    //public enum PackagingTypeDto { SingleLayered, DoubleLayered, Wooden }
    //public enum BookingStatusDto { Pending, Confirmed, Assigned, Completed, Cancelled }
}
