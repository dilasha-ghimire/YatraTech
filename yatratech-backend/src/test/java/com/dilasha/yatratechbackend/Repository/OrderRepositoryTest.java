package com.dilasha.yatratechbackend.Repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.dilasha.yatratechbackend.Entity.Order;
import com.dilasha.yatratechbackend.Entity.User;
import com.dilasha.yatratechbackend.Entity.Vehicle;

@ExtendWith(MockitoExtension.class)
class OrderRepositoryTest {

    @Mock
    private OrderRepository orderRepository;

    @Test
    void findAll() {
        // Given
        List<Order> orders = new ArrayList<>();
        orders.add(new Order(1, "2024-03-01", "Location1", "Location2", "10:00", "12:00", new Vehicle(), new User()));

        // When
        when(orderRepository.findAll()).thenReturn(orders);
        List<Order> allOrders = orderRepository.findAll();

        // Then
        assertThat(allOrders).isEqualTo(orders);
    }

    @Test
    void findAllByUserId() {
        // Given
        List<Order> userOrders = new ArrayList<>();
        userOrders.add(new Order(1, "2024-03-01", "Location1", "Location2", "10:00", "12:00", new Vehicle(), new User()));

        // when
        when(orderRepository.findAllByUserId(1)).thenReturn(userOrders);
        List<Order> userOrdersResult = orderRepository.findAllByUserId(1);

        // Then
        assertThat(userOrdersResult).isEqualTo(userOrders);
    }

    @Test
    void findAllByUserIdWithVehicle() {
        // Given
        List<Order> userOrdersWithVehicles = new ArrayList<>();
        userOrdersWithVehicles.add(new Order(1, "2024-03-01", "Location1", "Location2", "10:00", "12:00", new Vehicle(), new User()));

        //When
        when(orderRepository.findAllByUserIdWithVehicle(1)).thenReturn(userOrdersWithVehicles);

        // Then
        List<Order> userOrdersWithVehiclesResult = orderRepository.findAllByUserIdWithVehicle(1);
        assertThat(userOrdersWithVehiclesResult).isEqualTo(userOrdersWithVehicles);
    }

    @Test
    void deleteAllByOrderId() {
        // Given
        doNothing().when(orderRepository).deleteAllByOrderId(1);

        // When
        orderRepository.deleteAllByOrderId(1);

        // then
        verify(orderRepository, times(1)).deleteAllByOrderId(1);
    }
}
