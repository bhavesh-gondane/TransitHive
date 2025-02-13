package com.th.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.th.dto.AdminDTO;
import com.th.dto.ApiResponse;
import com.th.dto.AuthRequest;
import com.th.dto.UserDTO;
import com.th.service.AdminService;

@RestController
@RequestMapping("/admins")
public class AdminController {

    @Autowired
    private AdminService adminService;
    
    @GetMapping("/info")
	public String adminInfo() {
		return "Admin info";
	}
    
    @PostMapping("/saveAdmin")
    public ResponseEntity<ApiResponse> saveAdmin(@RequestBody AdminDTO adminDTO) {
    	System.out.println(adminDTO);
    	adminService.saveAdmin(adminDTO);
    	return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse("User created successfully"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AdminDTO> getAdminById(@PathVariable Long id) {
        AdminDTO adminDTO = adminService.getAdminById(id);
        if (adminDTO == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(adminDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AdminDTO> updateAdmin(@PathVariable Long id, @RequestBody AdminDTO adminDTO) {
        adminDTO.setId(id);
        AdminDTO updatedAdmin = adminService.updateAdmin(adminDTO);
        return ResponseEntity.ok(updatedAdmin);
    }

    @GetMapping
    public ResponseEntity<List<AdminDTO>> getAllAdmins() {
        List<AdminDTO> adminList = adminService.getAllAdmins();
        return ResponseEntity.ok(adminList);
    }
    
    @PostMapping("/signin") 
   	public ResponseEntity<?> signInAdmin(@RequestBody AuthRequest request) {

   		System.out.println("in signin " + request);
   		try {
   			
   			return ResponseEntity.ok(adminService.authenticateUser(request));
   		} catch (RuntimeException e) {
   			
   			System.out.println(e);
   			return ResponseEntity.
   					status(HttpStatus.BAD_REQUEST)
   					.body(new ApiResponse(e.getMessage()));
   		}
   	}
}
