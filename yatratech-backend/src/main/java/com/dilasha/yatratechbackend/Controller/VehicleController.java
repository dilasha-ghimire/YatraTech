package com.dilasha.yatratechbackend.Controller;

import com.dilasha.yatratechbackend.Dto.VehicleDto;
import com.dilasha.yatratechbackend.Entity.Vehicle;
import com.dilasha.yatratechbackend.Service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@CrossOrigin
@RestController
@RequestMapping("/api/vehicle")
public class VehicleController {

    private final VehicleService vehicleService;

    @Autowired
    public VehicleController(VehicleService vehicleService) {
        this.vehicleService = vehicleService;
    }

    @PostMapping("/save-vehicle")
    public String saveVehicle(@ModelAttribute VehicleDto vehicleDto){
        try {
            vehicleService.saveVehicle(vehicleDto);
            return "Vehicle saved";
        }catch (Exception e){
            return e.getMessage();
        }
    }
    @PostMapping("/update-vehicle")
    public String updateVehicle(@ModelAttribute VehicleDto vehicleDto){
        try {
            vehicleService.updateVehicle(vehicleDto);
            return "Vehicle updated";
        }catch (Exception e){
            return e.getMessage();
        }
    }
    @PostMapping("/update-vehicle-without-image")
    public String updateVehicleWithoutImage(@RequestBody VehicleDto vehicleDto){
        try {
            vehicleService.updateVehicleWithoutImage(vehicleDto);
            return "Vehicle updated";
        }catch (Exception e){
            return e.getMessage();
        }
    }
    @GetMapping("/find-all-vehicles")
    public List<Vehicle> viewAllVehicles(){
           return(vehicleService.viewAllVehicles());
    }

    @DeleteMapping("/delete-vehicle/{vehicleId}")
    public ResponseEntity<String> deleteVehicle(@PathVariable("vehicleId") int vehicleId) {
        try {
            vehicleService.deleteVehicleById(vehicleId);
            return ResponseEntity.ok("Vehicle deleted");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete vehicle: " + e.getMessage());
        }
    }

    @GetMapping("/total-vehicle-records")
    public ResponseEntity<Object> getTotalVehicleRecords() {
        List<Vehicle> vehicles = vehicleService.viewAllVehicles();
        int totalRecords = vehicles.size();
        Map<String, Object> response = new HashMap<>();
        response.put("totalRecords", totalRecords);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
