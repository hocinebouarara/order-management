package com.hocinebouarara.order_management.exception;

import java.util.List;

public class MultipleFieldConflictException extends RuntimeException {
    private final List<String> errors;

    public MultipleFieldConflictException(List<String> errors) {
        super("Validation failed");
        this.errors = errors;
    }

    public List<String> getErrors() {
        return errors;
    }
}
