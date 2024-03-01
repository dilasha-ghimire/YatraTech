package com.dilasha.yatratechbackend.Repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.dilasha.yatratechbackend.Entity.Role;
import com.dilasha.yatratechbackend.Entity.User;

@ExtendWith(MockitoExtension.class)
class UserRepositoryTest {

    @Mock
    private UserRepository userRepository;

    @Test
    void findByEmail() {
        // Given
        User user = new User(1, "Random Test", "random@gmail.com", "password123", "1234567890", Role.USER, new ArrayList<>());

        // When
        when(userRepository.findByEmail("random@gmail.com")).thenReturn(Optional.of(user));
        Optional<User> foundUser = userRepository.findByEmail("random@gmail.com");

        // Then
        assertThat(foundUser).isPresent().contains(user);
    }

    @Test
    void existsByEmail() {
        // Given

        // When
        when(userRepository.existsByEmail("random@gmail.com")).thenReturn(true);
        boolean exists = userRepository.existsByEmail("random@gmail.com");

        // Then
        assertThat(exists).isTrue();
    }

    @Test
    void findUserIdByEmail() {
        // Given

        // When
        when(userRepository.findUserIdByEmail("random@gmail.com")).thenReturn(1);
        int userId = userRepository.findUserIdByEmail("random@gmail.com");

        // Then
        assertThat(userId).isEqualTo(1);
    }

    @Test
    void findAll() {
        // Given
        List<User> users = new ArrayList<>();
        users.add(new User(1, "Random Tester", "random@gmail.com", "password123", "1234567890", Role.USER, new ArrayList<>()));

        // When
        when(userRepository.findAll()).thenReturn(users);
        List<User> allUsers = userRepository.findAll();

        // Then
        assertThat(allUsers).isEqualTo(users);
    }

    @Test
    void deleteAllById() {
        // Given

        // When
        when(userRepository.deleteAllById(1)).thenReturn(1);
        int deletedCount = userRepository.deleteAllById(1);

        // Then
        assertThat(deletedCount).isEqualTo(1);
    }
}
