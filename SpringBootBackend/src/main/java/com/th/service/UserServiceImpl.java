package com.th.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.th.dto.ApiResponse;
import com.th.dto.AuthRequest;
import com.th.dto.UserDTO;
import com.th.dto.VendorDTO;
import com.th.entity.User;
import com.th.entity.Vendor;
import com.th.exception.AuthenticationException;
import com.th.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public UserDTO getUserById(Long id) {
		User user = userRepository.findById(id).orElse(null);
		if (user == null) {
			return null;
		}
		return modelMapper.map(user, UserDTO.class);
	}

	@Override
	public UserDTO updateUser(UserDTO userDTO) {
		User user = userRepository.findById(userDTO.getId()).orElse(null);
		user.setPhone(userDTO.getPhone());
		user.setCity(userDTO.getCity());
		
		//User user = modelMapper.map(userDTO, User.class);
		user = userRepository.save(user);
		return modelMapper.map(user, UserDTO.class);
	}

	@Override
	public List<UserDTO> getAllUsers() {
		return userRepository.findAll().stream().map(user -> modelMapper.map(user, UserDTO.class))
				.collect(Collectors.toList());
	}

	@Override
	public ApiResponse saveUser(User user) {

		//User user = modelMapper.map(userDTO, User.class);
		User saveUser = userRepository.save(user);
		return new ApiResponse("Added new User with ID : " + saveUser.getId());
	}

	@Override
	public UserDTO authenticateUser(AuthRequest request) {
		
		System.out.println("in auth user "+request);

		User user = userRepository.findByEmailAndPassword(request.getEmail(), request.getPassword())
				.orElseThrow(() -> new AuthenticationException("Invalid Email or Password !!!!!!"));

		return modelMapper.map(user, UserDTO.class);
	}

	@Override
	public Long totalUserCount() {
		return userRepository.count();
	}
}
