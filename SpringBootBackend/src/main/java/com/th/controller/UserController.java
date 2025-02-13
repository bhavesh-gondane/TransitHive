package com.th.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.th.dto.ApiResponse;
import com.th.dto.AuthRequest;
import com.th.dto.UserDTO;
import com.th.entity.User;
import com.th.service.UserService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;
    
    @GetMapping("/info")
	public String userInfo() {
		return "User info";
	}
    
    @PostMapping("/saveUser")
    public ResponseEntity<ApiResponse> saveUser(@RequestBody User user) {
    	System.out.println(user);
    	userService.saveUser(user);
    	return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse("User created successfully"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        UserDTO userDTO = userService.getUserById(id);
        if (userDTO == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(userDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Long id, @RequestBody UserDTO userDTO) {
    	System.out.println(userDTO);
        userDTO.setId(id);
        UserDTO updatedUser = userService.updateUser(userDTO);
        return ResponseEntity.ok(updatedUser);
    }
    
//    @PutMapping("/update")
//    public ResponseEntity<UserDTO> updateUser(@RequestBody UserDTO userDTO) {
//        //userDTO.getId(id);
//    	System.out.println(userDTO);
//        UserDTO updatedUser = userService.updateUser(userDTO);
//        return ResponseEntity.ok(updatedUser);
//    }

    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> userList = userService.getAllUsers();
        return ResponseEntity.ok(userList);
    }
    
    @PostMapping("/signin") 
	public ResponseEntity<?> signInUser(@RequestBody AuthRequest request) {

		System.out.println("in signin " + request);
		try {
			
			return ResponseEntity.ok(userService.authenticateUser(request));
		} catch (RuntimeException e) {
			
			System.out.println(e);
			return ResponseEntity.
					status(HttpStatus.BAD_REQUEST)
					.body(new ApiResponse(e.getMessage()));
		}
	}
}
