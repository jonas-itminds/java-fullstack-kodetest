package com.data.react.repository;

import com.data.react.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AccountRepository extends JpaRepository<Account, Long> {
    List<Account> findByCustomerId(Long Id);

    List<Account> findByCustomerFirstName(String firstName);
}
