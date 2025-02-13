using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using TransitHive.Dtos;
using TransitHive.Interfaces.Services;

namespace TransitHive.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserRespDto>> GetUser(int id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserRespDto>>> GetAllUsers()
        {
            var users = await _userService.GetAllUsersAsync();
            return Ok(users);
        }

        [HttpPost]
        public async Task<ActionResult> AddUser([FromBody] UserRespDto userDto)
        {
            await _userService.AddUserAsync(userDto);
            return CreatedAtAction(nameof(GetUser), new { id = userDto.Id }, userDto);
        }

        [HttpPatch("{id}")]
        public async Task<ActionResult> UpdateUser(int id, [FromBody] UserRespDto userDto)
        {
            if (id != userDto.Id)
            {
                return BadRequest();
            }
            await _userService.UpdateUserAsync(userDto);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUser(int id)
        {
            await _userService.DeleteUserAsync(id);
            return NoContent();
        }
    }
}
