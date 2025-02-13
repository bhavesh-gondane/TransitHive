using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using TransitHive.Dtos;
using TransitHive.Interfaces.Services;

namespace TransitHive.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _adminService;

        // Constructor to inject the IAdminService dependency
        public AdminController(IAdminService adminService)
        {
            _adminService = adminService;
        }

        // GET: api/admin/{id}
        // Retrieves a specific admin by their ID
        [HttpGet("{id}")]
        public async Task<ActionResult<AdminDto>> GetAdmin(int id)
        {
            var admin = await _adminService.GetAdminByIdAsync(id);
            if (admin == null)
            {
                return NotFound(); // Returns 404 if the admin is not found
            }
            return Ok(admin); // Returns 200 with the admin data
        }

        // GET: api/admin
        // Retrieves all admins
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AdminDto>>> GetAllAdmins()
        {
            var admins = await _adminService.GetAllAdminsAsync();
            return Ok(admins); // Returns 200 with the list of admins
        }

        // POST: api/admin
        // Adds a new admin
        [HttpPost]
        public async Task<ActionResult> AddAdmin([FromBody] AdminDto adminDto)
        {
            await _adminService.AddAdminAsync(adminDto);
            return CreatedAtAction(nameof(GetAdmin), new { id = adminDto.Id }, adminDto); // Returns 201 with the location of the created admin
        }

        // PUT: api/admin/{id}
        // Updates an existing admin
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateAdmin(int id, [FromBody] AdminDto adminDto)
        {
            if (id != adminDto.Id)
            {
                return BadRequest(); // Returns 400 if the ID in the URL does not match the ID in the body
            }
            await _adminService.UpdateAdminAsync(adminDto);
            return NoContent(); // Returns 204 to indicate the update was successful
        }

        // DELETE: api/admin/{id}
        // Deletes an admin by their ID
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAdmin(int id)
        {
            await _adminService.DeleteAdminAsync(id);
            return NoContent(); // Returns 204 to indicate the deletion was successful
        }
    }
}
