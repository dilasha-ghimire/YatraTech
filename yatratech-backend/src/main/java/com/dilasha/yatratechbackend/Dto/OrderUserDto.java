package com.dilasha.yatratechbackend.Dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class OrderUserDto {
    private int userId;
    private String fullName;
    private VehicleDto vehicleDetails;
    private int vehicleId;
    private String dropOffLocation;
    private String dropOffTime;
    private String orderDate;
    private String pickUpLocation;
    private String pickUpTime;
    private int orderId;

    public void setVehicleDetails(VehicleDto vehicleDetails) {
        this.vehicleDetails = vehicleDetails;
    }
}
