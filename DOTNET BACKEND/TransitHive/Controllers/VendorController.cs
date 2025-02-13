using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using TransitHive.Dtos;
using TransitHive.Interfaces.Services;
using TransitHive.Models;

namespace TransitHive.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VendorController : ControllerBase
    {
        private readonly IVendorService _vendorService;

        public VendorController(IVendorService vendorService)
        {
            _vendorService = vendorService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<VendorRespDto>> GetVendor(int id)
        {
            var vendor = await _vendorService.GetVendorByIdAsync(id);
            if (vendor == null)
            {
                return NotFound();
            }
            return Ok(vendor);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<VendorRespDto>>> GetAllVendors()
        {
            var vendors = await _vendorService.GetAllVendorsAsync();
            return Ok(vendors);
        }

        [HttpPost]
        public async Task<ActionResult> AddVendor([FromBody] VendorRespDto vendorDto)
        {
            await _vendorService.AddVendorAsync(vendorDto);
            return CreatedAtAction(nameof(GetVendor), new { id = vendorDto.Id }, vendorDto);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateVendor(int id, [FromBody] VendorRespDto vendorDto)
        {
            if (id != vendorDto.Id)
            {
                return BadRequest();
            }
            await _vendorService.UpdateVendorAsync(vendorDto);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteVendor(int id)
        {
            await _vendorService.DeleteVendorAsync(id);
            return NoContent();
        }

        [HttpGet("status/{status}")]
        public async Task<ActionResult<IEnumerable<VendorRespDto>>> GetVendorByStatusAsync(Status status)
        {
            var vendors = await _vendorService.GetVendorByStatusAsync(status);
            return Ok(vendors);
        }

        [HttpPatch("{id}/status")] 
        public async Task<IActionResult> UpdateVendorStatusAsync(int id, Status status, String comment) 
        {
            var cm = comment;
            await _vendorService.UpdateVendorStatusAsync(id, status , comment); 
            return Ok(); 
        }
    }
}
