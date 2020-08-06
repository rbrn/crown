package org.crown.service.dto;

import org.crown.domain.SupplierResource;
import org.springframework.data.geo.GeoResult;

public class AroundMeSuppliesDTO {

    public AroundMeSuppliesDTO(double[] position, String name) {
        this.latLng = position;
        this.supplyType = name;
    }

    public double[] getLatLng() {
        return latLng;
    }

    public void setLatLng(double[] latLng) {
        this.latLng = latLng;
    }

    public String getSupplyType() {
        return supplyType;
    }

    public void setSupplyType(String supplyType) {
        this.supplyType = supplyType;
    }

    private double []  latLng;

    private String supplyType;

    public static AroundMeSuppliesDTO of(GeoResult<SupplierResource> supplierResourceGeoResult) {
        AroundMeSuppliesDTO aroundMeSuppliesDTO = new AroundMeSuppliesDTO(supplierResourceGeoResult.getContent().getPosition(), supplierResourceGeoResult.getContent().getResourceType().getName());
        return aroundMeSuppliesDTO;
    }
}
