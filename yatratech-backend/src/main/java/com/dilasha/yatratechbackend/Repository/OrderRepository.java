package com.dilasha.yatratechbackend.Repository;

import com.dilasha.yatratechbackend.Entity.Order;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order,Integer> {

    List<Order> findAll();

    List<Order> findAllByUserId(int userId);

    @Query("SELECT o FROM Order o JOIN FETCH o.vehicle WHERE o.user.id = :userId")
    List<Order> findAllByUserIdWithVehicle(int userId);

    @Transactional
    @Modifying
    void deleteAllByOrderId(int orderId);
}
