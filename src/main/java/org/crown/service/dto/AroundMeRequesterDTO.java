package org.crown.service.dto;

import org.crown.domain.ReceiverResource;
import org.crown.domain.ResourceType;
import org.springframework.data.geo.GeoResult;

import java.util.Optional;

public class AroundMeRequesterDTO {

    public AroundMeRequesterDTO(double[] position, String name) {
        this.latLng = position;
        this.requestType = name;
    }

    public double[] getLatLng() {
        return latLng;
    }

    public void setLatLng(double[] latLng) {
        this.latLng = latLng;
    }

    public String getRequestType() {
        return requestType;
    }

    public void setRequestType(String requestType) {
        this.requestType = requestType;
    }

    private double []  latLng;

    private String requestType;

    public static AroundMeRequesterDTO of(GeoResult<ReceiverResource> supplierResourceGeoResult) {
        ResourceType resourceType =  supplierResourceGeoResult.getContent().getResourceType();
        Optional<ResourceType> resourceTypeOptional = Optional.ofNullable(resourceType);
        AroundMeRequesterDTO aroundMeSuppliesDTO = new AroundMeRequesterDTO(supplierResourceGeoResult.getContent().getPosition(),
            resourceTypeOptional.orElseGet( ()-> emptyResourceType()) .getName());
        return aroundMeSuppliesDTO;
    }

    private static ResourceType emptyResourceType() {
        ResourceType resourceType = new ResourceType();
        resourceType.setName("Undefined");
        return resourceType;
    }
}
