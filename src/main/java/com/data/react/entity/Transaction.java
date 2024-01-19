package com.data.react.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.Objects;

@Setter
@Getter
@Entity
public class Transaction {
    @Id
    @GeneratedValue
    private Long id;
    @Temporal(TemporalType.DATE)
    private Date transactionTime;
    private String description;
    private Double amount;
    private Boolean isDeposit;
    @ManyToOne
    @JoinColumn(name="account_id", nullable=false)
    private Account account;

    public Transaction() {}
    public Transaction(Date transactionTime, String description, Double amount, Boolean isDeposit, Account account) {
        this.transactionTime = transactionTime;
        this.description = description;
        this.amount = amount;
        this.isDeposit = isDeposit;
        this.account = account;
    }

    public int hashCode() {
        return Objects.hash(id, transactionTime, description);
    }

    public String toString() {
        return "Transaction{" +
                "id=" + id +
                ", transactionTime='" + transactionTime + '\'' +
                ", description='" + description + '\'' +
                ", amount='" + amount + '\'' +
                ", isDeposit='" + isDeposit + '\'' +
                '}';
    }
}