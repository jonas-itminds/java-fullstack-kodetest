package com.data.react.repository;

import com.data.react.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    @Query(value = "SELECT * FROM Transaction t WHERE t.description = ?1", nativeQuery = true)
    List<Transaction> findTransactionsWithDescription(@Param("description") String description);

    @Query(value = "SELECT * FROM Transaction t WHERE t.transaction_time < ?1", nativeQuery = true)
    List<Transaction> findTransactionsBeforeDate(@Param("transactionTime") @DateTimeFormat(pattern = "yyyy-MM-dd") Date date);

    List<Transaction> findAllByTransactionTimeBetween(
            @DateTimeFormat(pattern = "yyyy-MM-dd") Date transactionTimeStart,
            @DateTimeFormat(pattern = "yyyy-MM-dd") Date transactionTimeEnd);

    List<Transaction> findAllByIsDeposit(boolean isDeposit);
    List<Transaction> findAllByAmount(Double amount);
    List<Transaction> findAllByAccountId(Long account_id);
    List<Transaction> findAllByAccountIdAndTransactionTimeBefore(Long account_id, @DateTimeFormat(pattern = "yyyy-MM-dd") Date transactionTime);
}
