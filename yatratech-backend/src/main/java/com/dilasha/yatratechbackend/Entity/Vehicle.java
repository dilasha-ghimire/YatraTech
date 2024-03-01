package com.dilasha.yatratechbackend.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "vehicles")
public class Vehicle {

    @Column(name = "vehicle_id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int vehicleId;

    @Column(name = "vehicle_name")
    private String vehicleName;

    @Column(name = "vehicle_type")
    private String vehicleType;

    @Column(name = "vehicle_number")
    private String vehicleNumber;

    @Column(name = "vehicle_image")
    private String vehicleImage;

    @Column(name = "number_of_seats")
    private int numberOfSeats;

    @Column(name = "price_per_hour")
    private int pricePerHour;

    @JsonIgnore
    @OneToOne(mappedBy = "vehicle", cascade = CascadeType.DETACH)
    private Order order;
}
