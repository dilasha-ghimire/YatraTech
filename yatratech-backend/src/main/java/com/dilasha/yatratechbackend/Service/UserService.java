package com.dilasha.yatratechbackend.Service;


import com.dilasha.yatratechbackend.Dto.OrderUserDto;
import com.dilasha.yatratechbackend.Dto.RegisterDto;
import com.dilasha.yatratechbackend.Dto.UserDto;
import com.dilasha.yatratechbackend.Entity.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {

    String getEmail(String email);

    int getIdFromEmail(String email);

    String userRegistration(RegisterDto registerDto);

    String updateUser(RegisterDto registerDto);

    UserDto getUserById(int userId);

    List<UserDto> getAllUsers();

    String deleteUserById(int userId);

    String getRole(String email);
}
