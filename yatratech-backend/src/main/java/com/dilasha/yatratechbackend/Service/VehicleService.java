package com.dilasha.yatratechbackend.Service;

import com.dilasha.yatratechbackend.Dto.VehicleDto;
import com.dilasha.yatratechbackend.Entity.Vehicle;
import com.dilasha.yatratechbackend.Repository.VehicleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface VehicleService {

    List<Vehicle> viewAllVehicles();

    String saveVehicle(VehicleDto vehicleDto);

    String updateVehicle(VehicleDto vehicleDto);

    String updateVehicleWithoutImage(VehicleDto vehicleDto);

    void deleteVehicleById(int vehicleId);

}
