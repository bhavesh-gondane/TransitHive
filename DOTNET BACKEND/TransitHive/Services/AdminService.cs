using AutoMapper;
using TransitHive.Dtos;
using TransitHive.Interfaces.Repositories;
using TransitHive.Interfaces.Services;
using TransitHive.Models;

namespace TransitHive.Services
{
    public class AdminService : IAdminService
    {
        private readonly IAdminRepository _adminRepository;
        private readonly IMapper _mapper;

        public AdminService(IAdminRepository adminRepository, IMapper mapper)
        {
            _adminRepository = adminRepository;
            _mapper = mapper;
        }

        public async Task<AdminDto> GetAdminByIdAsync(int id)
        {
            var admin = await _adminRepository.GetAdminByIdAsync(id);
            return _mapper.Map<AdminDto>(admin);
        }

        public async Task<IEnumerable<AdminDto>> GetAllAdminsAsync()
        {
            var admins = await _adminRepository.GetAllAdminsAsync();
            return _mapper.Map<IEnumerable<AdminDto>>(admins);
        }

        public async Task AddAdminAsync(AdminDto adminDto)
        {
            var admin = _mapper.Map<Admin>(adminDto);
            await _adminRepository.AddAdminAsync(admin);
        }

        public async Task UpdateAdminAsync(AdminDto adminDto)
        {
            var admin = _mapper.Map<Admin>(adminDto);
            await _adminRepository.UpdateAdminAsync(admin);
        }

        public async Task DeleteAdminAsync(int id)
        {
            await _adminRepository.DeleteAdminAsync(id);
        }
    }
}
