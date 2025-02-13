using AutoMapper;
using TransitHive.Dtos;
using TransitHive.Models;

namespace TransitHive.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            // Admin
            CreateMap<Admin, AdminDto>().ReverseMap();

            // User
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<User, UserRespDto>().ReverseMap();

            // Vendor
            CreateMap<Vendor, VendorDto>().ReverseMap();
            CreateMap<Vendor, VendorRespDto>().ReverseMap();

            // ItemCategory
            CreateMap<ItemCategory, ItemCategoryDto>().ReverseMap();
            CreateMap<ItemCategory, ItemCategoryRequestDto>().ReverseMap();
            CreateMap<ItemCategory, ItemCategoryResponseDto>().ReverseMap();

            // Item
            CreateMap<Item, ItemDto>().ReverseMap();
            CreateMap<Item, ItemRequestDto>().ReverseMap();
            CreateMap<Item, ItemResponseDto>().ReverseMap();


      //      CreateMap<Item, ItemResponseDto>()
      //.ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category.Name));
      //      CreateMap<ItemRequestDto, Item>();

      //      // ItemCategory Mappings
      //      CreateMap<ItemCategory, ItemCategoryResponseDto>()
      //          .ForMember(dest => dest.ItemNames, opt => opt.MapFrom(src => src.Items.Select(i => i.Name)));
      //      CreateMap<ItemCategoryRequestDto, ItemCategory>();
            // Booking
            CreateMap<Booking, BookingDto>().ReverseMap();
            CreateMap<Booking, BookingWithItemsDto>().ReverseMap();
            CreateMap<Booking, availablebookingsdto>().ReverseMap();
            CreateMap<BookingItem, BookingItemDto>().ReverseMap();
            CreateMap<BookingItem, BookingItemRequestDto>().ReverseMap();
           

            // Payment
            CreateMap<Payment, PaymentDto>().ReverseMap();

            // Review
            CreateMap<Review, ReviewDto>().ReverseMap();
            CreateMap<Review, ReviewAdminDto>().ReverseMap();
        }
    }
}
