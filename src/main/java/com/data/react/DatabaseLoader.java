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
        Customer theCustomer = new Customer("Torol", "Sadeas", "dead");

        Account torolsCheckingAccount = new Account("Torol's Checking", 300.0, theCustomer);
        Account torolsSavingsAccount = new Account("Torol's savings", 500.0, theCustomer);

        Transaction checkingTransactionFive = new Transaction(new Date(1105789200000L), "On the five", 100.0, true, torolsCheckingAccount);
        Transaction checkingTransactionSix = new Transaction(new Date(1149544800000L), "Removed six", 6.0, false, torolsCheckingAccount);

        Transaction savingsTransactionThree = new Transaction(new Date(1046646000000L), "Three", 33.0, true, torolsSavingsAccount);
        Transaction savingsTransactionTwo = new Transaction(new Date(1018374800000L), "Two in the pot", 6.0, true, torolsSavingsAccount);

        torolsCheckingAccount.setTransactions(new ArrayList<>(Arrays.asList((checkingTransactionFive), (checkingTransactionSix))));
        torolsSavingsAccount.setTransactions(new ArrayList<>(Arrays.asList((savingsTransactionThree), (savingsTransactionTwo))));

        theCustomer.setAccounts(new ArrayList<>(Arrays.asList((torolsCheckingAccount), (torolsSavingsAccount))));

        this.customerRepository.save(theCustomer);

        Account testerAccount = new Account("Third Account", 123.0);
        testerAccount.setCustomer(customerRepository.findById(1L));
        this.accountRepository.save(testerAccount);

        this.accountRepository.save(torolsSavingsAccount);
        this.accountRepository.save(torolsCheckingAccount);

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

        transactions = transactionRepository.findAllByAccountId(torolsCheckingAccount.getId());
        transactions.forEach(System.out::println);
        System.out.println("-----");
*/

        //System.out.println(theCustomer);
    }
}
