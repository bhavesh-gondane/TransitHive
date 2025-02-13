using TransitHive.Dtos;

namespace TransitHive.Interfaces.Services
{
    public interface IDashboardService
    {

        public  Task<dashboardDto> GetDashBoardDataAsync();

    }

}
