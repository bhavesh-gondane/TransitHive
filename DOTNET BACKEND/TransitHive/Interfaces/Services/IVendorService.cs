using TransitHive.Dtos;
using TransitHive.Models;
namespace TransitHive.Interfaces.Services
{
    public interface IVendorService
    {
        Task<VendorRespDto> GetVendorByIdAsync(int id);
        Task<IEnumerable<VendorRespDto>> GetAllVendorsAsync();
        Task AddVendorAsync(VendorRespDto vendorDto);
        Task UpdateVendorAsync(VendorRespDto vendorDto);
        Task DeleteVendorAsync(int id);

        Task<IEnumerable<VendorRespDto>> GetVendorByStatusAsync(Status status);

        Task UpdateVendorStatusAsync(int id, Status status, String Comment);
    }
}
