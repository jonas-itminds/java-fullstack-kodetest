package com.data.react.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Setter
@Getter
@Entity
public class Account {

    @Id
    @GeneratedValue
    private Long id;
    @ManyToOne
    @JoinColumn(name="customer_id", nullable=false)
    @JsonManagedReference
    private Customer customer;
    private String accountName;
    private Double balance;
    @OneToMany(mappedBy = "account")
    private List<Transaction> transactions;

    public Account() {}
    public Account(String accountName, Double balance) {
        this.balance = balance;
        this.accountName = accountName;
    }

    public Account(String accountName, Double balance, Customer customer) {
        this.balance = balance;
        this.accountName = accountName;
        this.customer = customer;
    }


    public Account(String accountName, Double balance, List<Transaction> transactions, Customer customer) {
        this.balance = balance;
        this.accountName = accountName;
        this.transactions = transactions;
        this.customer = customer;
    }


    @Override
    public int hashCode() {
        return Objects.hash(id, balance);
    }

    @Override
    public String toString() {
        return "Account{" +
                "id=" + id +
                ", name='" + accountName + '\'' +
                ", balance='" + balance + '\'' +
                ", transactions=[ \n\t\t" + transactions.stream().map(Object::toString).collect(Collectors.joining (", \n\t\t")) + ']' +
                '}';
    }

}
