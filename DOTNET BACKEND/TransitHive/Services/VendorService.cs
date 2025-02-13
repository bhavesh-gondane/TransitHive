using System.Collections;
using System.Numerics;
using AutoMapper;
using TransitHive.Dtos;
using TransitHive.Interfaces.Repositories;
using TransitHive.Interfaces.Services;
using TransitHive.Models;

namespace TransitHive.Services
{
    public class VendorService : IVendorService
    {
        private readonly IVendorRepository _vendorRepository;
        private readonly IMapper _mapper;

        public VendorService(IVendorRepository vendorRepository, IMapper mapper)
        {
            _vendorRepository = vendorRepository;
            _mapper = mapper;
        }

        public async Task<VendorRespDto> GetVendorByIdAsync(int id)
        {
            var vendor = await _vendorRepository.GetVendorByIdAsync(id);
            return _mapper.Map<VendorRespDto>(vendor);
        }

        public async Task<IEnumerable<VendorRespDto>> GetAllVendorsAsync()
        {
            var vendors = await _vendorRepository.GetAllVendorsAsync();
            return _mapper.Map<IEnumerable<VendorRespDto>>(vendors);
        }

        public async Task AddVendorAsync(VendorRespDto vendorDto)
        {
            var vendor = _mapper.Map<Vendor>(vendorDto);
            await _vendorRepository.AddVendorAsync(vendor);
        }

        public async Task UpdateVendorAsync(VendorRespDto vendorDto)
        {
            var vendor = _mapper.Map<Vendor>(vendorDto);
            await _vendorRepository.UpdateVendorAsync(vendor);
        }

        public async Task DeleteVendorAsync(int id)
        {
            await _vendorRepository.DeleteVendorAsync(id);
        }

        public async Task<IEnumerable<VendorRespDto>> GetVendorByStatusAsync(Status status )
        {
            var vendors = await _vendorRepository.GetVendorByStatusAsync(status);
            return _mapper.Map<IEnumerable<VendorRespDto>>(vendors);
        }

        public async Task UpdateVendorStatusAsync(int id, Status status, String Comment) 
        { 
            await _vendorRepository.UpdateVendorStatusAsync(id, status, Comment); 
        }
    }
}
