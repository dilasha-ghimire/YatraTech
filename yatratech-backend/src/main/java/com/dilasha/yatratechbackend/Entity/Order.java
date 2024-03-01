package com.dilasha.yatratechbackend.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "orders")
public class Order {

    @Column(name = "order_id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int orderId;

    @Column(name = "order_date")
    private String orderDate;

    @Column(name = "pickup_location")
    private String pickupLocation;

    @Column(name = "dropoff_location")
    private String dropoffLocation;

    @Column(name = "pickupTime")
    private String pickupTime;

    @Column(name = "dropoffTime")
    private String dropoffTime;

    @OneToOne
    @JoinColumn(name = "vehicle_id", unique = false)
    private Vehicle vehicle;

    @ManyToOne
    @JoinColumn(name = "user_id", unique = false)
    private User user;

}
