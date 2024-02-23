package com.webapp.eshowroom.repos;

import com.webapp.eshowroom.domain.Product;
import com.webapp.eshowroom.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;


public interface UserRepository extends JpaRepository<User, Long>,JpaSpecificationExecutor<User> {
}
