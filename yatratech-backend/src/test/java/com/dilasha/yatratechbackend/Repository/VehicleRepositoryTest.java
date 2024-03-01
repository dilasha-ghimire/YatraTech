package com.dilasha.yatratechbackend.Repository;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.dilasha.yatratechbackend.Entity.Vehicle;

@ExtendWith(MockitoExtension.class)
class VehicleRepositoryTest {

    @Mock
    private VehicleRepository vehicleRepository;

    @Test
    void findAllByVehicleId() {
        // Given
        List<Vehicle> vehicles = new ArrayList<>();
        vehicles.add(new Vehicle(1, "Toyota Camry", "Sedan", "ABC123", "image1.jpg", 5, 50,null));

        // When
        when(vehicleRepository.findAllByVehicleId(1)).thenReturn(vehicles);
        List<Vehicle> foundVehicles = vehicleRepository.findAllByVehicleId(1);

        // Then
        assertThat(foundVehicles).isEqualTo(vehicles);
    }

    @Test
    void getVehicleByVehicleId() {
        // Given
        Vehicle vehicle = new Vehicle(1, "Toyota Camry", "Sedan", "ABC123", "image1.jpg", 5, 50,null);

        // When
        when(vehicleRepository.getVehicleByVehicleId(1)).thenReturn(vehicle);
        Vehicle foundVehicle = vehicleRepository.getVehicleByVehicleId(1);

        // Then
        assertThat(foundVehicle).isEqualTo(vehicle);
    }

    @Test
    void findAll() {
        // Given
        List<Vehicle> vehicles = new ArrayList<>();
        vehicles.add(new Vehicle(1, "Toyota Camry", "Sedan", "ABC123", "image1.jpg", 5, 50,null));

        // When
        when(vehicleRepository.findAll()).thenReturn(vehicles);
        List<Vehicle> allVehicles = vehicleRepository.findAll();

        // Then
        assertThat(allVehicles).isEqualTo(vehicles);
    }

    @Test
    void deleteAllByVehicleId() {
        // Given

        // When
        doNothing().when(vehicleRepository).deleteAllByVehicleId(1);
        vehicleRepository.deleteAllByVehicleId(1);

        // Then
        verify(vehicleRepository, times(1)).deleteAllByVehicleId(1);
    }
}
