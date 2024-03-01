package com.dilasha.yatratechbackend.Repository;

import com.dilasha.yatratechbackend.Entity.Role;
import com.dilasha.yatratechbackend.Entity.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {
    Optional<User> findByEmail(String email);
    Boolean existsByEmail(String email);

    @Query("SELECT u.id FROM User u WHERE u.email = :email")
    int findUserIdByEmail(@Param("email") String email);

    List<User> findAll();

    @Transactional
    @Modifying
    int deleteAllById(int userId);

    @Query(value = "SELECT role from users where email = ?1" ,nativeQuery = true)
    Role getUserRole(String email);
}
