package com.data.react.controller;


import com.data.react.dto.AccountInput;
import com.data.react.entity.Account;
import com.data.react.repository.AccountRepository;
import com.data.react.repository.CustomerRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/create")
@AllArgsConstructor
public class ReactController {

    private final AccountRepository accountRepository;
    private final CustomerRepository customerRepository;

    @PostMapping("/accounts")
    public ResponseEntity<Account> createAccount(@RequestBody AccountInput accountInput) {
        Account account = new Account(accountInput.getAccountName(), accountInput.getBalance());
        account.setCustomer(customerRepository.findById(accountInput.getCustomer_id()));
        this.accountRepository.save(account);
        return new ResponseEntity<>(account, HttpStatus.CREATED);
    }

}