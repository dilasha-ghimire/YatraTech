package com.dilasha.yatratechbackend.Controller;

import com.dilasha.yatratechbackend.Dto.OrderDto;
import com.dilasha.yatratechbackend.Dto.OrderUserDto;
import com.dilasha.yatratechbackend.Entity.Order;
import com.dilasha.yatratechbackend.Service.OrderService;
import jakarta.annotation.security.PermitAll;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping("/api/order")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("placeOrder")
    public String placeOrder(@RequestBody OrderDto orderDto){
        try {
            System.out.println(orderDto.toString());
            orderService.saveOrder(orderDto);
            return "Data saved";
        }
        catch (Exception e){
            return e.getMessage();
        }
    }

    @GetMapping("/get-all-orders")
    public List<OrderUserDto> getAllOrders(){
        return orderService.getAllOrders();
    }

    @GetMapping("/get-all-orders-by-user-id/{userId}")
    public List<OrderUserDto> getAllOrderByUserId(@PathVariable int userId){
        return orderService.getOrdersByUserId(userId);
    }

    @PostMapping("/delete-order-by-orderId/{orderId}")
    public void deleteOrderById(@PathVariable int orderId){
        orderService.deleteOrderByOrderId(orderId);
    }

    @GetMapping("/ordered-vehicle-ids")
    public List<Integer> getOrderedVehicleIds() {
        List<Integer> orderedVehicleIds = orderService.getAllOrders().stream()
                .map(OrderUserDto::getVehicleId)
                .collect(Collectors.toList());
        return orderedVehicleIds;
    }

    @GetMapping("/total-order-records")
    public ResponseEntity<Object> getTotalOrderRecords() {
        List<OrderUserDto> orders = orderService.getAllOrders();
        int totalRecords = orders.size();
        Map<String, Object> response = new HashMap<>();
        response.put("totalRecords", totalRecords);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
