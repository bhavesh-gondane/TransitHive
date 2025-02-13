using System.Numerics;
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TransitHive.Data;
using TransitHive.Interfaces.Repositories;
using TransitHive.Models;
using TransitHive.Dtos;
using System.Collections;
using TransitHive.Helpers;
using Org.BouncyCastle.Asn1.X509;
using Org.BouncyCastle.Pqc.Crypto.Lms;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;
using System.Threading;
using System.Xml.Linq;
using Org.BouncyCastle.Asn1.Cms;
using Stripe.Entitlements;
using System.Threading.Tasks;
using System.Diagnostics;

namespace TransitHive.Repositories
{
    public class VendorRepository : IVendorRepository
    {
        private readonly AppDbContext _context;
        private readonly EmailHelper emailHelper;
        private readonly ILogger<VendorRepository> _logger;

        public VendorRepository(AppDbContext context, EmailHelper _emailHelper, ILogger<VendorRepository> logger)
        {
            _context = context;
            emailHelper = _emailHelper;
            _logger = logger;
        }

        public async Task<Vendor> GetVendorByIdAsync(int id)
        {
            _logger.LogInformation($"Fetching vendor with ID: {id}");
            return await _context.Vendors.FindAsync(id);
        }

        public async Task<IEnumerable<Vendor>> GetAllVendorsAsync()
        {
            _logger.LogInformation("Fetching all vendors");
            return await _context.Vendors.ToListAsync();
        }

        public async Task AddVendorAsync(Vendor vendor)
        {
            _logger.LogInformation($"Adding new vendor: {vendor.CompanyName}");
            await _context.Vendors.AddAsync(vendor);
            await _context.SaveChangesAsync();
            _logger.LogInformation("Vendor added successfully");
        }

        public async Task UpdateVendorAsync(Vendor vendor)
        {
            _logger.LogInformation($"Updating vendor with ID: {vendor.Id}");
            Vendor ven = await _context.Vendors.FindAsync(vendor.Id);
            if (ven != null)
            {
                ven.City = vendor.City;
                ven.CompanyName = vendor.CompanyName;
                ven.OwnerAadharNumber = vendor.OwnerAadharNumber;
                ven.PanNumber = vendor.PanNumber;
                ven.Gstin = vendor.Gstin;
                ven.CompanyOwnerName = vendor.CompanyOwnerName;
                ven.Phone = vendor.Phone;
            }
            _context.Vendors.Update(ven);
            await _context.SaveChangesAsync();
            _logger.LogInformation("Vendor updated successfully");
        }

        public async Task DeleteVendorAsync(int id)
        {
            _logger.LogInformation($"Deleting vendor with ID: {id}");
            var vendor = await _context.Vendors.FindAsync(id);
            if (vendor != null)
            {
                _context.Vendors.Remove(vendor);
                await _context.SaveChangesAsync();
                _logger.LogInformation("Vendor deleted successfully");
            }
            else
            {
                _logger.LogWarning($"Vendor with ID: {id} not found");
            }
        }

        public async Task<Vendor> GetVendorByEmailAsync(string email)
        {
            _logger.LogInformation($"Fetching vendor with email: {email}");
            Vendor vendor = await _context.Vendors.SingleOrDefaultAsync(u => u.Email == email);
            return vendor;
        }

        public async Task<IEnumerable<VendorRespDto>> GetVendorByStatusAsync(Status status)
        {
            _logger.LogInformation($"Fetching vendors with status: {status}");
            return await _context.Vendors
                                 .Where(v => v.Status == status)
                                 .Select(v => new VendorRespDto
                                 {
                                     Id = v.Id,
                                     CompanyName = v.CompanyName,
                                     Email = v.Email,
                                     Phone = v.Phone,
                                     Gstin = v.Gstin,
                                     CompanyOwnerName = v.CompanyOwnerName,
                                     OwnerAadharNumber = v.OwnerAadharNumber,
                                     PanNumber = v.PanNumber,
                                     City = v.City,
                                     Status = v.Status
                                 }).ToListAsync();
        }

        public async Task UpdateVendorStatusAsync(int id, Status status, string Comment)
        {
            _logger.LogInformation($"Updating status for vendor with ID: {id}");
            var vendor = await _context.Vendors.FindAsync(id);
            if (vendor != null)
            {
                vendor.Status = status;
                vendor.Comments = Comment;
                await _context.SaveChangesAsync();
                _logger.LogInformation("Vendor status updated successfully");
            }

            if (status == Status.APPROVED)
            {
                await emailHelper.SendEmailAsync(vendor.Email, "Application Approved",
                "Dear " + vendor.CompanyOwnerName + ",\n\nWe are delighted to inform you that your application to join our platform has been approved.Thank you for choosing to be a part of our community.We look forward to a successful collaboration with you.\n\nWarm regards,\nTransitHive");
                _logger.LogInformation("Approval email sent");
            }
            else if (status == Status.REJECTED)
            {
                await emailHelper.SendEmailAsync(vendor.Email, "Application Rejected",
                "Dear " + vendor.CompanyOwnerName + ",\n\n We regret to inform you that your application to join our platform has not been approved Due to" + Comment + " please Reply on Same mail to Complete the remaining Process as Mentioned above. \n\n Thank you for your understanding.\n\n Warm regards,\n TransitHive Support Team");
                _logger.LogInformation("Rejection email sent");
            }
            else if (status == Status.SUSPENDED)
            {
                await emailHelper.SendEmailAsync(vendor.Email, "Application Suspended",
                "Dear " + vendor.CompanyOwnerName + ",\n\n We regret to inform you that your application suspended Due to " + Comment + " \n\nplease Reply on Same mail to us for Support. \n\n Thank you for your understanding.\n\n Warm regards,\n TransitHive Support Team");
                _logger.LogInformation("Suspension email sent");
            }
        }

        public async Task<int> GetTotalVendorsAsync()
        {
            _logger.LogInformation("Fetching total number of vendors");
            return await _context.Vendors.CountAsync();
        }


    }
}


