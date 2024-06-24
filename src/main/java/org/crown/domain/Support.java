package org.crown.domain;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotNull;

public class Support {

    @NotNull
    private final String name;

    @NotNull
    private final String email;

    private final String phoneNumber;

    @NotNull
    private final String message;

    public Support(@JsonProperty("name") String name, @JsonProperty("email") String email,
                   @JsonProperty("message") String message, @JsonProperty("phoneNumber") String phoneNumber) {
        this.name = name;
        this.email = email;
        this.message = message;
        this.phoneNumber = phoneNumber;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getMessage() {
        return message;
    }
}
