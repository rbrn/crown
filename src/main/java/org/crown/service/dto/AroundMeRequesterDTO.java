package org.crown.service.dto;

import org.crown.domain.ReceiverResource;
import org.crown.domain.SupplierResource;
import org.springframework.data.geo.GeoResult;

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
        AroundMeRequesterDTO aroundMeSuppliesDTO = new AroundMeRequesterDTO(supplierResourceGeoResult.getContent().getPosition(),
            supplierResourceGeoResult.getContent().getResourceType().getName());
        return aroundMeSuppliesDTO;
    }
}
