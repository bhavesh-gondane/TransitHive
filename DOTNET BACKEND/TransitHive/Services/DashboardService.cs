using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using TransitHive.Dtos;
using TransitHive.Interfaces.Repositories;
using TransitHive.Interfaces.Services;

namespace TransitHive.Services
{
    public class DashboardService  : IDashboardService
    {
        private readonly IVendorRepository _vendorRepository;
        private readonly IBookingRepository _bookingRepository;
        private readonly IPaymentRepository _paymentRepository;
        private readonly IUserRepository _userRepository;
        private readonly ILogger<DashboardService> _logger;

       public DashboardService(IVendorRepository vendorRepository, IBookingRepository bookingRepository, IPaymentRepository paymentRepository, IUserRepository userRepository, ILogger<DashboardService> logger)
        {
            _vendorRepository = vendorRepository;
            _bookingRepository = bookingRepository;
            _paymentRepository = paymentRepository;
            _userRepository = userRepository;
            _logger = logger;
        }

        public async Task<dashboardDto> GetDashBoardDataAsync()
        {
            _logger.LogInformation("Fetching total number of vendors");

            var UserCount = await _userRepository.GetTotalUsersAsync();

            _logger.LogInformation("total users", UserCount);

            var VendorCount = await _vendorRepository.GetTotalVendorsAsync();

            _logger.LogInformation("total vendors", VendorCount);


            var BookingCount = await _bookingRepository.GetTotalBookingsAsync();
            _logger.LogInformation("total bookings", BookingCount);

            var Revenue1 = await _bookingRepository.GetTotalAmountAsync();

            _logger.LogInformation("total payments", Revenue1);


            var dashboardData = new dashboardDto
            {
                Users = UserCount,
                Vendors = VendorCount,
                Bookings = BookingCount,
                Revenue = Revenue1
            };

            return dashboardData;

        }
    }
}
