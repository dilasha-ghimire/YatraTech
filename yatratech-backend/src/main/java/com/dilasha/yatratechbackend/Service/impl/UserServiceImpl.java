package com.dilasha.yatratechbackend.Service.impl;

import com.dilasha.yatratechbackend.Dto.OrderUserDto;
import com.dilasha.yatratechbackend.Dto.RegisterDto;
import com.dilasha.yatratechbackend.Dto.UserDto;
import com.dilasha.yatratechbackend.Entity.Role;
import com.dilasha.yatratechbackend.Entity.User;
import com.dilasha.yatratechbackend.Repository.UserRepository;
import com.dilasha.yatratechbackend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public String getEmail(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return user.getEmail();
        } else {
            return "User not found";
        }
    }

    @Override
    public int getIdFromEmail(String email) {
        return userRepository.findUserIdByEmail(email);
    }

    @Override
    public String userRegistration(RegisterDto registerDto) {
        if (userRepository.existsByEmail(registerDto.getEmail())) {
            return "Email is taken!";
        }else{
            User user = new User();
            user.setFullName(registerDto.getFullName());
            user.setEmail(registerDto.getEmail());
            user.setPhoneNumber(registerDto.getPhoneNumber());
            user.setRole(Role.USER);
            user.setPassword(passwordEncoder.encode((registerDto.getPassword())));
            userRepository.save(user);
            return "User registered success!";
        }
    }

    @Override
    public String updateUser(RegisterDto registerDto) {
        Optional<User> optionalUser = userRepository.findByEmail(registerDto.getEmail());
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setFullName(registerDto.getFullName());
            user.setEmail(registerDto.getEmail());
            user.setPhoneNumber(registerDto.getPhoneNumber());
            user.setRole(Role.USER);
            userRepository.save(user);
            return "User updated success!";
        } else {
            return "Could not find the user";
        }

    }

    @Override
    public UserDto getUserById(int userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            return mapUserToUserDto(user);
        }
        else {
            return null;
        }
    }

    private UserDto mapUserToUserDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setUserId(user.getId());
        userDto.setEmail(user.getEmail());
        userDto.setFullName(user.getFullName());
        userDto.setPhoneNumber(user.getPhoneNumber());
        return userDto;
    }

    @Override
    public List<UserDto> getAllUsers() {
        List<User> users = userRepository.findAll();
        List<UserDto> userDtos = new ArrayList<>();

        for (User user : users) {
            UserDto userDto = UserDto.builder()
                    .userId(user.getId())
                    .email(user.getEmail())
                    .fullName(user.getFullName())
                    .phoneNumber(user.getPhoneNumber())
                    .build();
            userDtos.add(userDto);
        }
        return userDtos;
    }

    @Override
    public String deleteUserById(int userId) {
        userRepository.deleteById(userId);
        return "User deleted successfully";
    }

    @Override
    public String getRole(String email) {
        Role role = userRepository.getUserRole(email);
        return role.name();
    }


}
