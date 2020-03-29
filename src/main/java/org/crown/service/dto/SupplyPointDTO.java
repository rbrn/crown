package org.crown.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link org.crown.domain.SupplyPoint} entity.
 */
public class SupplyPointDTO implements Serializable {
    
    private String id;

    @NotNull
    private String name;

    @NotNull
    private String address;

    @NotNull
    private String primaryContactName;

    @NotNull
    private String zip;

    @NotNull
    private String phoneNumber;

    private Float latitude;

    private Float longitude;

    @NotNull
    private String city;

    @NotNull
    private String state;

    private String email;

    private Boolean isDistributor;

    private Boolean isHealthcare;

    private Boolean hasSterilization;

    private Integer priority;

    private String notes;

    
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPrimaryContactName() {
        return primaryContactName;
    }

    public void setPrimaryContactName(String primaryContactName) {
        this.primaryContactName = primaryContactName;
    }

    public String getZip() {
        return zip;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Float getLatitude() {
        return latitude;
    }

    public void setLatitude(Float latitude) {
        this.latitude = latitude;
    }

    public Float getLongitude() {
        return longitude;
    }

    public void setLongitude(Float longitude) {
        this.longitude = longitude;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Boolean isIsDistributor() {
        return isDistributor;
    }

    public void setIsDistributor(Boolean isDistributor) {
        this.isDistributor = isDistributor;
    }

    public Boolean isIsHealthcare() {
        return isHealthcare;
    }

    public void setIsHealthcare(Boolean isHealthcare) {
        this.isHealthcare = isHealthcare;
    }

    public Boolean isHasSterilization() {
        return hasSterilization;
    }

    public void setHasSterilization(Boolean hasSterilization) {
        this.hasSterilization = hasSterilization;
    }

    public Integer getPriority() {
        return priority;
    }

    public void setPriority(Integer priority) {
        this.priority = priority;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        SupplyPointDTO supplyPointDTO = (SupplyPointDTO) o;
        if (supplyPointDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), supplyPointDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SupplyPointDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", address='" + getAddress() + "'" +
            ", primaryContactName='" + getPrimaryContactName() + "'" +
            ", zip='" + getZip() + "'" +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            ", latitude=" + getLatitude() +
            ", longitude=" + getLongitude() +
            ", city='" + getCity() + "'" +
            ", state='" + getState() + "'" +
            ", email='" + getEmail() + "'" +
            ", isDistributor='" + isIsDistributor() + "'" +
            ", isHealthcare='" + isIsHealthcare() + "'" +
            ", hasSterilization='" + isHasSterilization() + "'" +
            ", priority=" + getPriority() +
            ", notes='" + getNotes() + "'" +
            "}";
    }
}
