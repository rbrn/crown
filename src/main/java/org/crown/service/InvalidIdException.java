package org.crown.service;

public class InvalidIdException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public static final String SUPPLY_POINT = "SupplyPoint";
    public static final String RESOURCE = "Resource";

    public InvalidIdException(String ResourceType, String invalidValue) {
        super(String.format("Invalid id: %s for %s",invalidValue, ResourceType));
    }

}
