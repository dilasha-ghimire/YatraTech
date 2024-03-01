package com.dilasha.yatratechbackend.Service.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.util.Optional;

import com.dilasha.yatratechbackend.Dto.RegisterDto;
import com.dilasha.yatratechbackend.Entity.User;
import com.dilasha.yatratechbackend.Repository.UserRepository;
import com.dilasha.yatratechbackend.Service.impl.UserServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserServiceImpl userService;

    @Test
    void userRegistration_NewUser_Success() {
        // Given
        RegisterDto registerDto = new RegisterDto();
        registerDto.setEmail("test@test.com");
        registerDto.setPassword("password");
        registerDto.setFullName("test test");
        registerDto.setPhoneNumber("1234567890");

        when(userRepository.existsByEmail("test@test.com")).thenReturn(false);
        when(passwordEncoder.encode("password")).thenReturn("hashedPassword");

        // When
        String result = userService.userRegistration(registerDto);

        // Then
        verify(userRepository, times(1)).save(any(User.class));
        assertEquals("User registered success!", result);
    }

    @Test
    void userRegistration_EmailTaken() {
        // Given
        RegisterDto registerDto = new RegisterDto();
        registerDto.setEmail("test@test.com");
        registerDto.setPassword("password");
        registerDto.setFullName("test test");
        registerDto.setPhoneNumber("1234567890");

        when(userRepository.existsByEmail("test@test.com")).thenReturn(true);

        // When
        String result = userService.userRegistration(registerDto);

        // Then
        verify(userRepository, never()).save(any(User.class));
        assertEquals("Email is taken!", result);
    }

    @Test
    void updateUser_UserExists_Success() {
        // Given
        RegisterDto registerDto = new RegisterDto();
        registerDto.setEmail("test@test.com");
        registerDto.setFullName("test test");
        registerDto.setPhoneNumber("1234567890");

        User existingUser = new User();
        existingUser.setId(1);
        existingUser.setEmail("test@test.com");

        when(userRepository.findByEmail("test@test.com")).thenReturn(Optional.of(existingUser));

        // When
        String result = userService.updateUser(registerDto);

        // Then
        verify(userRepository, times(1)).findByEmail("test@test.com");
        verify(userRepository, times(1)).save(existingUser);
        assertEquals("User updated success!", result);
    }

    @Test
    void updateUser_UserDoesNotExist() {
        // Given
        RegisterDto registerDto = new RegisterDto();
        registerDto.setEmail("test@test.com");
        registerDto.setFullName("test test");
        registerDto.setPhoneNumber("1234567890");

        when(userRepository.findByEmail("test@test.com")).thenReturn(Optional.empty());

        // When
        String result = userService.updateUser(registerDto);

        // Then
        verify(userRepository, times(1)).findByEmail("test@test.com");
        verify(userRepository, never()).save(any(User.class));
        assertEquals("Could not find the user", result);
    }
}
