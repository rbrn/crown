package org.crown.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.util.Objects;

/**
 * A SupplyPoint.
 */
@Document(collection = "supply_point")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "supplypoint")
public class SupplyPoint implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("name")
    private String name;

    @NotNull
    @Field("address")
    private String address;

    @NotNull
    @Field("primary_contact_name")
    private String primaryContactName;

    @NotNull
    @Field("zip")
    private String zip;

    @NotNull
    @Field("phone_number")
    private String phoneNumber;

    @Field("latitude")
    private Float latitude;

    @Field("longitude")
    private Float longitude;

    @NotNull
    @Field("city")
    private String city;

    @NotNull
    @Field("state")
    private String state;

    @Field("email")
    private String email;

    @Field("is_distributor")
    private Boolean isDistributor;

    @Field("is_healthcare")
    private Boolean isHealthcare;

    @Field("has_sterilization")
    private Boolean hasSterilization;

    @Field("priority")
    private Integer priority;

    @Field("notes")
    private String notes;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public SupplyPoint name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public SupplyPoint address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPrimaryContactName() {
        return primaryContactName;
    }

    public SupplyPoint primaryContactName(String primaryContactName) {
        this.primaryContactName = primaryContactName;
        return this;
    }

    public void setPrimaryContactName(String primaryContactName) {
        this.primaryContactName = primaryContactName;
    }

    public String getZip() {
        return zip;
    }

    public SupplyPoint zip(String zip) {
        this.zip = zip;
        return this;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public SupplyPoint phoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
        return this;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Float getLatitude() {
        return latitude;
    }

    public SupplyPoint latitude(Float latitude) {
        this.latitude = latitude;
        return this;
    }

    public void setLatitude(Float latitude) {
        this.latitude = latitude;
    }

    public Float getLongitude() {
        return longitude;
    }

    public SupplyPoint longitude(Float longitude) {
        this.longitude = longitude;
        return this;
    }

    public void setLongitude(Float longitude) {
        this.longitude = longitude;
    }

    public String getCity() {
        return city;
    }

    public SupplyPoint city(String city) {
        this.city = city;
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public SupplyPoint state(String state) {
        this.state = state;
        return this;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getEmail() {
        return email;
    }

    public SupplyPoint email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Boolean isIsDistributor() {
        return isDistributor;
    }

    public SupplyPoint isDistributor(Boolean isDistributor) {
        this.isDistributor = isDistributor;
        return this;
    }

    public void setIsDistributor(Boolean isDistributor) {
        this.isDistributor = isDistributor;
    }

    public Boolean isIsHealthcare() {
        return isHealthcare;
    }

    public SupplyPoint isHealthcare(Boolean isHealthcare) {
        this.isHealthcare = isHealthcare;
        return this;
    }

    public void setIsHealthcare(Boolean isHealthcare) {
        this.isHealthcare = isHealthcare;
    }

    public Boolean isHasSterilization() {
        return hasSterilization;
    }

    public SupplyPoint hasSterilization(Boolean hasSterilization) {
        this.hasSterilization = hasSterilization;
        return this;
    }

    public void setHasSterilization(Boolean hasSterilization) {
        this.hasSterilization = hasSterilization;
    }

    public Integer getPriority() {
        return priority;
    }

    public SupplyPoint priority(Integer priority) {
        this.priority = priority;
        return this;
    }

    public void setPriority(Integer priority) {
        this.priority = priority;
    }

    public String getNotes() {
        return notes;
    }

    public SupplyPoint notes(String notes) {
        this.notes = notes;
        return this;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SupplyPoint)) {
            return false;
        }
        return id != null && id.equals(((SupplyPoint) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "SupplyPoint{" +
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
