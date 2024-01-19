package com.data.react;

import com.data.react.entity.Account;
import com.data.react.entity.Customer;
import com.data.react.entity.Transaction;
import com.data.react.repository.AccountRepository;
import com.data.react.repository.CustomerRepository;
import com.data.react.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final CustomerRepository customerRepository;
    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;

    @Autowired
    public DatabaseLoader(CustomerRepository customerRepository, AccountRepository accountRepository, TransactionRepository transactionRepository) {
        this.customerRepository = customerRepository;
        this.accountRepository = accountRepository;
        this.transactionRepository = transactionRepository;
    }

    @Override
    public void run(String... strings) throws Exception {
        Customer theCustomer = new Customer("Warren", "Buffet", "Age: 93");

        Account warrensCheckingAccount = new Account("Warren's Checking", 300.0, theCustomer);
        Account warrensSavingsAccount = new Account("Warren's savings", 500.0, theCustomer);

        Transaction checkingTransactionFive = new Transaction(new Date(1105789200000L), "Deposit on the fifth", 100.0, true, warrensCheckingAccount);
        Transaction checkingTransactionSix = new Transaction(new Date(1149544800000L), "Removed six on the sixth", 6.0, false, warrensCheckingAccount);

        Transaction savingsTransactionThree = new Transaction(new Date(1046646000000L), "Saving 33", 33.0, true, warrensSavingsAccount);
        Transaction savingsTransactionTwo = new Transaction(new Date(1018374800000L), "Saved 6", 6.0, true, warrensSavingsAccount);

        warrensCheckingAccount.setTransactions(new ArrayList<>(Arrays.asList((checkingTransactionFive), (checkingTransactionSix))));
        warrensSavingsAccount.setTransactions(new ArrayList<>(Arrays.asList((savingsTransactionThree), (savingsTransactionTwo))));

        theCustomer.setAccounts(new ArrayList<>(Arrays.asList((warrensCheckingAccount), (warrensSavingsAccount))));

        this.customerRepository.save(theCustomer);

        Account testerAccount = new Account("Warren's Third Account", 123.0);
        testerAccount.setCustomer(customerRepository.findById(1L));
        this.accountRepository.save(testerAccount);

        this.accountRepository.save(warrensSavingsAccount);
        this.accountRepository.save(warrensCheckingAccount);

        this.transactionRepository.save(checkingTransactionFive);
        this.transactionRepository.save(checkingTransactionSix);
        this.transactionRepository.save(savingsTransactionThree);
        this.transactionRepository.save(savingsTransactionTwo);

/*
        List<Transaction> transactions = new ArrayList<>();

        transactions = transactionRepository.findTransactionsBeforeDate(new Date(1042626879000L));
        transactions.forEach(System.out::println);
        System.out.println("-----");


        transactions = transactionRepository.findTransactionsWithDescription("Two in the pot");
        transactions.forEach(System.out::println);
        System.out.println("-----");


        transactions = transactionRepository.findAllByTransactionTimeBetween(new Date(1042626879000L), new Date());
        transactions.forEach(System.out::println);
        System.out.println("-----");


        transactions = transactionRepository.findAllByIsDeposit(false);
        transactions.forEach(System.out::println);
        System.out.println("-----");

        transactions = transactionRepository.findAllByAmount(100.0);
        transactions.forEach(System.out::println);
        System.out.println("-----");

        transactions = transactionRepository.findAllByAccountId(warrensCheckingAccount.getId());
        transactions.forEach(System.out::println);
        System.out.println("-----");
*/

        //System.out.println(theCustomer);
    }
}
