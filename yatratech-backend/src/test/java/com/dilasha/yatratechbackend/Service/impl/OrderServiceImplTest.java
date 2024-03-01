package com.dilasha.yatratechbackend.Service.impl;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import com.dilasha.yatratechbackend.Dto.OrderDto;
import com.dilasha.yatratechbackend.Service.impl.OrderServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.dilasha.yatratechbackend.Entity.Order;
import com.dilasha.yatratechbackend.Entity.User;
import com.dilasha.yatratechbackend.Entity.Vehicle;
import com.dilasha.yatratechbackend.Repository.OrderRepository;
import com.dilasha.yatratechbackend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

@ExtendWith(MockitoExtension.class)
class OrderServiceImplTest {

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private OrderServiceImpl orderService;

    @Test
    void saveOrder() {
        // Given
        OrderDto orderDto = OrderDto.builder()
                .userId(1)
                .vehicleId(1)
                .dropOffLocation("Drop off location")
                .dropOffTime("12:00")
                .orderDate("2024-03-01")
                .pickUpLocation("Pick up location")
                .pickUpTime("10:00")
                .build();

        User user = new User();
        user.setId(1);
        when(userRepository.findById(1)).thenReturn(java.util.Optional.of(user));

        Vehicle vehicle = new Vehicle();
        vehicle.setVehicleId(1);
        when(orderRepository.save(any(Order.class))).thenReturn(new Order());

        // When
        String result = orderService.saveOrder(orderDto);

        // Then
        verify(userRepository, times(1)).findById(1);
        verify(orderRepository, times(1)).save(any(Order.class));
        assertThat(result).isEqualTo("Order placed");
    }
}
