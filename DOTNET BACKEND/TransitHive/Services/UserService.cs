using AutoMapper;
using TransitHive.Dtos;
using TransitHive.Interfaces.Repositories;
using TransitHive.Interfaces.Services;
using TransitHive.Models;

namespace TransitHive.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UserService(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public async Task<UserRespDto> GetUserByIdAsync(int id)
        {
            var user = await _userRepository.GetUserByIdAsync(id);
            return _mapper.Map<UserRespDto>(user);
        }

        public async Task<IEnumerable<UserRespDto>> GetAllUsersAsync()
        {
            var users = await _userRepository.GetAllUsersAsync();
            return _mapper.Map<IEnumerable<UserRespDto>>(users);
        }

        public async Task AddUserAsync(UserRespDto userDto)
        {
            var user = _mapper.Map<User>(userDto);
            await _userRepository.AddUserAsync(user);
        }

        public async Task UpdateUserAsync(UserRespDto userDto)
        {
            var user = _mapper.Map<User>(userDto);
            await _userRepository.UpdateUserAsync(user);
        }

        public async Task DeleteUserAsync(int id)
        {
            await _userRepository.DeleteUserAsync(id);
        }
    }
}
