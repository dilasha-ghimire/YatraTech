package com.dilasha.yatratechbackend.Service.impl;

import com.dilasha.yatratechbackend.Dto.VehicleDto;
import com.dilasha.yatratechbackend.Entity.Vehicle;
import com.dilasha.yatratechbackend.Repository.VehicleRepository;
import com.dilasha.yatratechbackend.Service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@Service
public class VehicleServiceImpl implements VehicleService {

    private final VehicleRepository vehicleRepository;

    @Value("${upload.path}")
    private String uploadPath;


    @Autowired
    public VehicleServiceImpl(VehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    @Override
    public List<Vehicle> viewAllVehicles() {
        return vehicleRepository.findAll();
    }

    @Override
    public String saveVehicle(VehicleDto vehicleDto) {
        Vehicle vehicle = new Vehicle();
        vehicle.setVehicleName(vehicleDto.getVehicleName());
        vehicle.setVehicleType(vehicleDto.getVehicleType());
        String fileName = UUID.randomUUID().toString()+"_"+ vehicleDto.getVehicleImage().getOriginalFilename();
        Path filePath = Paths.get(uploadPath,fileName);
        try {
            Files.copy(vehicleDto.getVehicleImage().getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        vehicle.setVehicleImage(fileName);
        vehicle.setNumberOfSeats(vehicleDto.getNumberOfSeats());
        vehicle.setVehicleNumber(vehicleDto.getVehicleNumber());
        vehicle.setPricePerHour(vehicleDto.getPricePerHour());
        vehicleRepository.save(vehicle);
        return "vehicle saved";
    }

    @Override
    public String updateVehicle(VehicleDto vehicleDto) {
        Vehicle existingVehicle = vehicleRepository.getVehicleByVehicleId(vehicleDto.getVehicleId());
        existingVehicle.setVehicleName(vehicleDto.getVehicleName());
        existingVehicle.setVehicleType(vehicleDto.getVehicleType());
        String fileName = UUID.randomUUID().toString()+"_"+ vehicleDto.getVehicleImage().getOriginalFilename();
        Path filePath = Paths.get(uploadPath,fileName);
        try {
            Files.copy(vehicleDto.getVehicleImage().getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        existingVehicle.setVehicleImage(fileName);
        existingVehicle.setNumberOfSeats(vehicleDto.getNumberOfSeats());
        existingVehicle.setVehicleNumber(vehicleDto.getVehicleNumber());
        existingVehicle.setPricePerHour(vehicleDto.getPricePerHour());
        vehicleRepository.save(existingVehicle);
        return "vehicle updated";
    }

    @Override
    public String updateVehicleWithoutImage(VehicleDto vehicleDto) {
        Vehicle existingVehicle = vehicleRepository.getVehicleByVehicleId(vehicleDto.getVehicleId());
        existingVehicle.setVehicleName(vehicleDto.getVehicleName());
        existingVehicle.setVehicleType(vehicleDto.getVehicleType());
        existingVehicle.setNumberOfSeats(vehicleDto.getNumberOfSeats());
        existingVehicle.setVehicleNumber(vehicleDto.getVehicleNumber());
        vehicleRepository.save(existingVehicle);
        return "vehicle updated";
    }

    @Override
    public void deleteVehicleById(int vehicleId) {
        vehicleRepository.deleteById(vehicleId);
    }
}
