package com.th.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.th.dto.ApiResponse;
import com.th.dto.AuthRequest;
import com.th.dto.VendorDTO;
import com.th.dto.VendorWallet;
import com.th.entity.Vendor;
import com.th.entity.Vendor.Status;
import com.th.service.VendorService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/vendors")
public class VendorController {

	@Autowired
	private VendorService vendorService;
	
	@GetMapping("/info") 
	public String vendorInfo() { 
		return "Vendor info";
	}

	@PostMapping("/saveVendor")
	public ResponseEntity<ApiResponse> saveVendor(@RequestBody Vendor vendor) {
		System.out.println(vendor);
		vendorService.saveVendor(vendor);
		return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse("Vendor created successfully"));
	}

	@GetMapping("/{id}")
	public ResponseEntity<VendorDTO> getVendorById(@PathVariable Long id) {
		VendorDTO vendorDTO = vendorService.getVendorById(id);
		if (vendorDTO == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(vendorDTO);
	}

	@PatchMapping("/{id}")
	public ResponseEntity<VendorDTO> updateVendor(@PathVariable Long id, @RequestBody VendorDTO vendorDTO) {
		vendorDTO.setId(id);
		VendorDTO updatedVendor = vendorService.updateVendor(vendorDTO);
		return ResponseEntity.ok(updatedVendor);
	}

	@GetMapping
	public ResponseEntity<List<VendorDTO>> getAllVendors() {
		List<VendorDTO> vendorList = vendorService.getAllVendors();
		return ResponseEntity.ok(vendorList);
	}

	@PostMapping("/signin")
	public ResponseEntity<?> signInVendor(@RequestBody AuthRequest request) {

		System.out.println("in signin " + request);
		try {

			return ResponseEntity.ok(vendorService.authenticateUser(request));
		} catch (RuntimeException e) {

			System.out.println(e);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}
	}

	/// -------///
	// yaha se admin crud challu hota hain
	// ----//
	// admin crud
	@PatchMapping("/{id}/status")
	public ResponseEntity<ApiResponse> changeVendorStatus(@PathVariable Long id, @RequestParam Status status , @RequestParam String comment) {
		System.out.println(status);
		VendorDTO updatedVendor = vendorService.changeVendorStatus(id, status, comment);
		return ResponseEntity.ok(new ApiResponse("Vendor status updated successfully " + id));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<ApiResponse> deleteVendor(@PathVariable Long id) {
		vendorService.deleteVendorById(id);
		return ResponseEntity.ok(new ApiResponse("Vendor deleted successfully"));
	}

	@GetMapping("/status/{status}")
	public ResponseEntity<List<VendorDTO>> getVendorsByStatus(@PathVariable Status status) {
		List<VendorDTO> vendorList = vendorService.getVendorsByStatus(status);
		return ResponseEntity.ok(vendorList);
	}

	@GetMapping("/cities")
	public ResponseEntity<List<String>> getDistinctCities() {
		List<String> cities = vendorService.getDistinctCities();
		return ResponseEntity.ok(cities);
	}
	
	@PostMapping("/add/wallet")
	public ResponseEntity<ApiResponse> addAmountToWallet( @RequestBody VendorWallet wallet) {
		System.out.println(wallet);
		
		vendorService.addAmountToWallet(wallet.getVendorId(), wallet.getAmount());
		return ResponseEntity.ok(new ApiResponse("Amount added to wallet successfully"));
	}
}
