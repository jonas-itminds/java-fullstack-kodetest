package com.data.react.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Setter
@Getter
@Entity
public class Customer {

    @Id
    @GeneratedValue
    @Column(name="customer_id")
    private Long id;
    private String firstName;
    private String lastName;
    private String description;
    @OneToMany(mappedBy="customer")
    @JsonBackReference
    private List<Account> accounts;

    private Customer() {}

    public Customer(String firstName, String lastName, String description) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.description = description;
    }

    public Customer(String firstName, String lastName, String description, List<Account> accounts) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.description = description;
        this.accounts = accounts;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Customer customer = (Customer) o;
        return Objects.equals(id, customer.id) &&
                Objects.equals(firstName, customer.firstName) &&
                Objects.equals(lastName, customer.lastName) &&
                Objects.equals(description, customer.description);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, firstName, lastName, description);
    }

    @Override
    public String toString() {
        return "Customer{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", description='" + description + '\'' +
                ", accounts=[\n\t" + accounts.stream().map(Object::toString).collect(Collectors.joining (", \n\t")) + ']' +
                '}';
    }
}