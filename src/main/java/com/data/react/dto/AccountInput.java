package com.data.react.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AccountInput {
    private final String accountName;
    private final Double balance;
    private final long customer_id;

    @JsonCreator
    AccountInput( @JsonProperty("accountName") String accountName, @JsonProperty("balance") Double balance, @JsonProperty("customer_id") long customer_id) {
        this.accountName = accountName;
        this.balance = balance;
        this.customer_id = customer_id;
    }

}
