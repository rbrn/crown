package org.crown.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.DBRef;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

/**
 * A RequestPoint.
 */
@Document(collection = "request_point")
public class RequestPoint implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("name")
    private String name;

    @Field("address")
    private String address;

    @NotNull
    @Field("primary_contact_name")
    private String primaryContactName;

    @NotNull
    @Field("zip")
    private String zip;

    @Field("phonenumber")
    private String phonenumber;

    @Field("latx")
    private Float latx;

    @Field("longy")
    private Float longy;

    @Field("city")
    private String city;

    @Field("state")
    private String state;

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

    @DBRef
    @Field("request")
    private Set<Request> requests = new HashSet<>();

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

    public RequestPoint name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public RequestPoint address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPrimaryContactName() {
        return primaryContactName;
    }

    public RequestPoint primaryContactName(String primaryContactName) {
        this.primaryContactName = primaryContactName;
        return this;
    }

    public void setPrimaryContactName(String primaryContactName) {
        this.primaryContactName = primaryContactName;
    }

    public String getZip() {
        return zip;
    }

    public RequestPoint zip(String zip) {
        this.zip = zip;
        return this;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }

    public String getPhonenumber() {
        return phonenumber;
    }

    public RequestPoint phonenumber(String phonenumber) {
        this.phonenumber = phonenumber;
        return this;
    }

    public void setPhonenumber(String phonenumber) {
        this.phonenumber = phonenumber;
    }

    public Float getLatx() {
        return latx;
    }

    public RequestPoint latx(Float latx) {
        this.latx = latx;
        return this;
    }

    public void setLatx(Float latx) {
        this.latx = latx;
    }

    public Float getLongy() {
        return longy;
    }

    public RequestPoint longy(Float longy) {
        this.longy = longy;
        return this;
    }

    public void setLongy(Float longy) {
        this.longy = longy;
    }

    public String getCity() {
        return city;
    }

    public RequestPoint city(String city) {
        this.city = city;
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public RequestPoint state(String state) {
        this.state = state;
        return this;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Boolean isIsDistributor() {
        return isDistributor;
    }

    public RequestPoint isDistributor(Boolean isDistributor) {
        this.isDistributor = isDistributor;
        return this;
    }

    public void setIsDistributor(Boolean isDistributor) {
        this.isDistributor = isDistributor;
    }

    public Boolean isIsHealthcare() {
        return isHealthcare;
    }

    public RequestPoint isHealthcare(Boolean isHealthcare) {
        this.isHealthcare = isHealthcare;
        return this;
    }

    public void setIsHealthcare(Boolean isHealthcare) {
        this.isHealthcare = isHealthcare;
    }

    public Boolean isHasSterilization() {
        return hasSterilization;
    }

    public RequestPoint hasSterilization(Boolean hasSterilization) {
        this.hasSterilization = hasSterilization;
        return this;
    }

    public void setHasSterilization(Boolean hasSterilization) {
        this.hasSterilization = hasSterilization;
    }

    public Integer getPriority() {
        return priority;
    }

    public RequestPoint priority(Integer priority) {
        this.priority = priority;
        return this;
    }

    public void setPriority(Integer priority) {
        this.priority = priority;
    }

    public String getNotes() {
        return notes;
    }

    public RequestPoint notes(String notes) {
        this.notes = notes;
        return this;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Set<Request> getRequests() {
        return requests;
    }

    public RequestPoint requests(Set<Request> requests) {
        this.requests = requests;
        return this;
    }

    public RequestPoint addRequest(Request request) {
        this.requests.add(request);
        request.setRequestPoint(this);
        return this;
    }

    public RequestPoint removeRequest(Request request) {
        this.requests.remove(request);
        request.setRequestPoint(null);
        return this;
    }

    public void setRequests(Set<Request> requests) {
        this.requests = requests;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof RequestPoint)) {
            return false;
        }
        return id != null && id.equals(((RequestPoint) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "RequestPoint{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", address='" + getAddress() + "'" +
            ", primaryContactName='" + getPrimaryContactName() + "'" +
            ", zip='" + getZip() + "'" +
            ", phonenumber='" + getPhonenumber() + "'" +
            ", latx=" + getLatx() +
            ", longy=" + getLongy() +
            ", city='" + getCity() + "'" +
            ", state='" + getState() + "'" +
            ", isDistributor='" + isIsDistributor() + "'" +
            ", isHealthcare='" + isIsHealthcare() + "'" +
            ", hasSterilization='" + isHasSterilization() + "'" +
            ", priority=" + getPriority() +
            ", notes='" + getNotes() + "'" +
            "}";
    }
}
