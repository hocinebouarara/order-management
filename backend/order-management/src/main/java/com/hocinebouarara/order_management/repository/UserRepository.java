package com.hocinebouarara.order_management.repository;


import com.hocinebouarara.order_management.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String username);

    Optional<User> findByUsername(String username);
}
