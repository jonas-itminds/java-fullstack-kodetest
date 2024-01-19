package com.data.react.controller;

import com.data.react.entity.Transaction;
import com.data.react.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;


@RestController
@RequestMapping(value="/test")
public class TransactionController {

    private final TransactionRepository transactionRepository;

    @Autowired
    public TransactionController(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    @GetMapping("/{date}")
    public ResponseEntity<List<Transaction>> getTransactionsBeforeDate(@PathVariable(value = "date") Long date) {
        List<Transaction> transactions = transactionRepository.findTransactionsBeforeDate(new Date(date));
        transactions.forEach(System.out::println);

        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

    @GetMapping("/after/{date}")
    public ResponseEntity<List<Transaction>> getTransactionsAfterDate(@PathVariable(value = "date") Long date) {
        List<Transaction> transactions = transactionRepository.findAllByTransactionTimeBetween(new Date(date), new Date());
        transactions.forEach(System.out::println);

        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

}

