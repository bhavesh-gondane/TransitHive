using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TransitHive.Dtos;
using TransitHive.Interfaces.Services;

namespace TransitHive.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardService _dashboardService;

        public DashboardController(IDashboardService dashboardService)
        {
            _dashboardService = dashboardService;
        }


        [HttpGet]
        public async Task<ActionResult<dashboardDto>> GetDashboardData()
        {
            var dashboardData = await _dashboardService.GetDashBoardDataAsync();
            return Ok(dashboardData);
        }
    }
}
