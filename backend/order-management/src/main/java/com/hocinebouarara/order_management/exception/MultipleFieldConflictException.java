package com.hocinebouarara.order_management.exception;

import lombok.Data;

import java.util.Map;

@Data
public class MultipleFieldConflictException extends RuntimeException {
    private final Map<String,String> FieldErrors;

    public MultipleFieldConflictException(Map<String,String> fieldErrors) {
        super("Validation failed");
        this.FieldErrors =fieldErrors;
    }

}
