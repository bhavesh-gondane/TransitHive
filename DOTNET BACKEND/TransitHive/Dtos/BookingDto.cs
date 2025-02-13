using TransitHive.Models;

namespace TransitHive.Dtos
{
    public class BookingDto
    {
        public int Id { get; set; }

        public decimal? Cost { get; set; }

        public int UserId { get; set; }
    }
}





















//using TransitHive.Models;

//namespace TransitHive.Dtos
//{
//    public class BookingDto
//    {
//        public int Id { get; set; }
//        public string Name { get; set; }
//        public string Mobile { get; set; }
//        public string Email { get; set; }
//        public string City { get; set; }
//        public DateTime MoveDate { get; set; }
//        public string PickupLocation { get; set; }
//        public string DropLocation { get; set; }

//        public LiftOption PickupLift { get; set; }
//        public int? PickupFloors { get; set; }
//        public LiftOption DropLift { get; set; }
//        public int? DropFloors { get; set; }
//        public PackagingType PackagingType { get; set; }
//        public int VendorId { get; set; }
//        public int UserId { get; set; }
//        public BookingStatus Status { get; set; } = BookingStatus.Pending;
//        public decimal? Cost { get; set; }
//        public DateTime CreatedAt { get; set; } = DateTime.Now;

//        public User User { get; set; }
//        public Vendor Vendor { get; set; }


//        public enum LiftOptionDto { Yes, No }
//        public enum PackagingTypeDto { SingleLayered, DoubleLayered, Wooden }
//        public enum BookingStatusDto { Pending, Confirmed, Assigned, Completed, Cancelled }
//    }
//}
