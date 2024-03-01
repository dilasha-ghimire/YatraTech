package com.dilasha.yatratechbackend.Service.impl;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.UUID;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Value;

import com.dilasha.yatratechbackend.Dto.VehicleDto;
import com.dilasha.yatratechbackend.Entity.Vehicle;
import com.dilasha.yatratechbackend.Repository.VehicleRepository;
import org.springframework.mock.web.MockMultipartFile;

@ExtendWith(MockitoExtension.class)
class VehicleServiceImplTest {

    @Mock
    private VehicleRepository vehicleRepository;

    private String uploadPath; // Define uploadPath property in the test class

    private VehicleServiceImpl vehicleService;

    @Test
    void saveVehicle() throws IOException {
        // Given
        VehicleDto vehicleDto = VehicleDto.builder()
                .vehicleName("Toyota Camry")
                .vehicleType("Sedan")
                .vehicleNumber("ABC123")
                .vehicleImage(new MockMultipartFile("image.jpg", "image.jpg", "image/jpeg", "Some image data".getBytes()))
                .numberOfSeats(5)
                .pricePerHour(50)
                .build();

        // Mocking UUID generation
        String randomUUID = UUID.randomUUID().toString();
        when(vehicleRepository.save(any(Vehicle.class))).thenAnswer(invocation -> {
            Vehicle vehicle = invocation.getArgument(0);
            vehicle.setVehicleId(1);
            return vehicle;
        });

        // Mocking file path
        Path filePath = Files.createTempFile(randomUUID, ".jpg");
        uploadPath = filePath.getParent().toString(); // Set the uploadPath property

        // Inject uploadPath through constructor
        vehicleService = new VehicleServiceImpl(vehicleRepository);

        // When
        String result = vehicleService.saveVehicle(vehicleDto);

        // Then
        assertThat(result).isEqualTo("vehicle saved");
        verify(vehicleRepository, times(1)).save(any(Vehicle.class));
    }
}
