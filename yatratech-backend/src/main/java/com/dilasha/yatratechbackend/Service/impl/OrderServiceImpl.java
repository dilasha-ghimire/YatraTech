package com.dilasha.yatratechbackend.Service.impl;

import com.dilasha.yatratechbackend.Dto.OrderDto;
import com.dilasha.yatratechbackend.Dto.OrderUserDto;
import com.dilasha.yatratechbackend.Dto.VehicleDto;
import com.dilasha.yatratechbackend.Entity.Order;
import com.dilasha.yatratechbackend.Entity.User;
import com.dilasha.yatratechbackend.Entity.Vehicle;
import com.dilasha.yatratechbackend.Repository.OrderRepository;
import com.dilasha.yatratechbackend.Repository.UserRepository;
import com.dilasha.yatratechbackend.Service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository, UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
    }

    @Override
    public String saveOrder(OrderDto orderDto) {
        Order order = new Order();
        User user = new User();
        Vehicle vehicle = new Vehicle();
        user.setId(orderDto.getUserId());
        vehicle.setVehicleId(orderDto.getVehicleId());
        order.setUser(user);
        order.setVehicle(vehicle);
        order.setOrderDate(orderDto.getOrderDate());
        order.setDropoffLocation(orderDto.getDropOffLocation());
        order.setDropoffTime(orderDto.getDropOffTime());
        order.setPickupTime(orderDto.getPickUpTime());
        order.setPickupLocation(orderDto.getPickUpLocation());
        orderRepository.save(order);
        return "Order placed";
    }

    @Override
    public List<OrderUserDto> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(order -> OrderUserDto.builder()
                        .orderId(order.getOrderId())
                        .userId(order.getUser().getId())
                        .fullName(order.getUser().getFullName())
                        .vehicleId(order.getVehicle().getVehicleId())
                        .dropOffLocation(order.getDropoffLocation())
                        .dropOffTime(order.getDropoffTime())
                        .orderDate(order.getOrderDate())
                        .pickUpLocation(order.getPickupLocation())
                        .pickUpTime(order.getPickupTime())
                        .build())
                .collect(Collectors.toList());
    }
    @Override
    public List<OrderUserDto> getOrdersByUserId(int userId) {
        List<Order> orders = orderRepository.findAllByUserIdWithVehicle(userId);
        return orders.stream()
                .map(order -> {
                    OrderUserDto orderUserDto = new OrderUserDto();
                    orderUserDto.setOrderId(order.getOrderId());
                    orderUserDto.setUserId(order.getUser().getId());
                    orderUserDto.setFullName(order.getUser().getFullName());
                    orderUserDto.setVehicleId(order.getVehicle().getVehicleId());
                    orderUserDto.setDropOffLocation(order.getDropoffLocation());
                    orderUserDto.setDropOffTime(order.getDropoffTime());
                    orderUserDto.setOrderDate(order.getOrderDate());
                    orderUserDto.setPickUpLocation(order.getPickupLocation());
                    orderUserDto.setPickUpTime(order.getPickupTime());

                    Vehicle vehicle = order.getVehicle();
                    VehicleDto vehicleDto = new VehicleDto();
                    vehicleDto.setVehicleName(vehicle.getVehicleName());
                    vehicleDto.setVehicleNumber(vehicle.getVehicleNumber());
                    vehicleDto.setNumberOfSeats(vehicle.getNumberOfSeats());
                    vehicleDto.setPricePerHour(vehicle.getPricePerHour());

                    orderUserDto.setVehicleDetails(vehicleDto);

                    return orderUserDto;
                })
                .collect(Collectors.toList());
    }


    @Override
    public void deleteOrderByOrderId(int orderId) {
        orderRepository.deleteAllByOrderId(orderId);
    }
}
