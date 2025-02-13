using System.Numerics;
using TransitHive.Dtos;
using TransitHive.Models;
namespace TransitHive.Interfaces.Repositories
{
    public interface IVendorRepository
    {
        Task<Vendor> GetVendorByIdAsync(int id);
        Task<IEnumerable<Vendor>> GetAllVendorsAsync();
        Task AddVendorAsync(Vendor vendor);
        Task UpdateVendorAsync(Vendor vendor);
        Task DeleteVendorAsync(int id);

        Task<Vendor> GetVendorByEmailAsync(string email);

        Task<IEnumerable<VendorRespDto>> GetVendorByStatusAsync(Status status);
        Task UpdateVendorStatusAsync(int id, Status status, String Comment);

        public Task<int> GetTotalVendorsAsync();
    }
}
