package com.th.service;

import java.util.List;

import com.th.dto.ApiResponse;
import com.th.dto.AuthRequest;
import com.th.dto.UserDTO;
import com.th.entity.User;

public interface UserService {
	
    UserDTO getUserById(Long id);
    
    UserDTO updateUser(UserDTO userDTO);
    
    List<UserDTO> getAllUsers();
    
	ApiResponse saveUser(User user);

	UserDTO authenticateUser(AuthRequest request);
	
	Long totalUserCount();
	
	
}
