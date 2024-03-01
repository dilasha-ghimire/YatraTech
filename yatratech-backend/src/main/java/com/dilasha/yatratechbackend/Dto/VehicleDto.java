package com.dilasha.yatratechbackend.Dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class VehicleDto {

    private int vehicleId;

    private String vehicleName;

    private String vehicleType;

    private String vehicleNumber;

    private MultipartFile vehicleImage;

    private String vehicleImageString;

    private int numberOfSeats;

    private int pricePerHour;

}
