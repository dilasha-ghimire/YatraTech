package com.dilasha.yatratechbackend.Dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderDto {

    private int orderId;
    private int userId;
    private int vehicleId;
    private String dropOffLocation;
    private String dropOffTime;
    private String orderDate;
    private String pickUpLocation;
    private String pickUpTime;
}
