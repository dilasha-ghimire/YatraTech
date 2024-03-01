package com.dilasha.yatratechbackend.Service;

import com.dilasha.yatratechbackend.Dto.OrderDto;
import com.dilasha.yatratechbackend.Dto.OrderUserDto;
import com.dilasha.yatratechbackend.Repository.OrderRepository;
import org.springframework.data.domain.jaxb.SpringDataJaxb;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface OrderService {

    String saveOrder(OrderDto orderDto);

    List<OrderUserDto> getAllOrders();

    List<OrderUserDto> getOrdersByUserId(int userId);

    void deleteOrderByOrderId(int orderId);

}
