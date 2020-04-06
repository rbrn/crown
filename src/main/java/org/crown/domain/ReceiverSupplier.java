package org.crown.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.DBRef;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

/**
 * A ReceiverSupplier.
 */
@Document(collection = "receiver_supplier")
public class ReceiverSupplier implements Serializable {

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
    @Field("email")
    private String email;

    @NotNull
    @Field("primary_contact_name")
    private String primaryContactName;

    @NotNull
    @Field("zip")
    private String zip;

    @NotNull
    @Field("phonenumber")
    private String phonenumber;

    @Field("latx")
    private Float latx;

    @Field("longy")
    private Float longy;

    @NotNull
    @Field("city")
    private String city;

    @NotNull
    @Field("state")
    private String state;

    @NotNull
    @Field("country")
    private String country;

    @Field("npi")
    private Integer npi;

    @Field("is_receiver")
    private Boolean isReceiver;

    @Field("is_supplier")
    private Boolean isSupplier;

    @Field("has_sterilization")
    private Boolean hasSterilization;

    @Field("priority")
    private Integer priority;

    @Field("notes")
    private String notes;

    private GeoJsonPoint position;

    @DBRef
    @Field("receiverResource")
    private Set<ReceiverResource> receiverResources = new HashSet<>();

    @DBRef
    @Field("supplierResource")
    private Set<SupplierResource> supplierResources = new HashSet<>();

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

    public ReceiverSupplier name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public ReceiverSupplier address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public ReceiverSupplier email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPrimaryContactName() {
        return primaryContactName;
    }

    public ReceiverSupplier primaryContactName(String primaryContactName) {
        this.primaryContactName = primaryContactName;
        return this;
    }

    public void setPrimaryContactName(String primaryContactName) {
        this.primaryContactName = primaryContactName;
    }

    public String getZip() {
        return zip;
    }

    public ReceiverSupplier zip(String zip) {
        this.zip = zip;
        return this;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }

    public String getPhonenumber() {
        return phonenumber;
    }

    public ReceiverSupplier phonenumber(String phonenumber) {
        this.phonenumber = phonenumber;
        return this;
    }

    public void setPhonenumber(String phonenumber) {
        this.phonenumber = phonenumber;
    }

    public Float getLatx() {
        return latx;
    }

    public ReceiverSupplier latx(Float latx) {
        this.latx = latx;
        return this;
    }

    public void setLatx(Float latx) {
        this.latx = latx;
    }

    public Float getLongy() {
        return longy;
    }

    public ReceiverSupplier longy(Float longy) {
        this.longy = longy;
        return this;
    }

    public void setLongy(Float longy) {
        this.longy = longy;
    }

    public String getCity() {
        return city;
    }

    public ReceiverSupplier city(String city) {
        this.city = city;
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public ReceiverSupplier state(String state) {
        this.state = state;
        return this;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCountry() {
        return country;
    }

    public ReceiverSupplier country(String country) {
        this.country = country;
        return this;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public Integer getNpi() {
        return npi;
    }

    public ReceiverSupplier npi(Integer npi) {
        this.npi = npi;
        return this;
    }

    public void setNpi(Integer npi) {
        this.npi = npi;
    }

    public Boolean isIsReceiver() {
        return isReceiver;
    }

    public ReceiverSupplier isReceiver(Boolean isReceiver) {
        this.isReceiver = isReceiver;
        return this;
    }

    public void setIsReceiver(Boolean isReceiver) {
        this.isReceiver = isReceiver;
    }

    public Boolean isIsSupplier() {
        return isSupplier;
    }

    public ReceiverSupplier isSupplier(Boolean isSupplier) {
        this.isSupplier = isSupplier;
        return this;
    }

    public void setIsSupplier(Boolean isSupplier) {
        this.isSupplier = isSupplier;
    }

    public Boolean isHasSterilization() {
        return hasSterilization;
    }

    public ReceiverSupplier hasSterilization(Boolean hasSterilization) {
        this.hasSterilization = hasSterilization;
        return this;
    }

    public void setHasSterilization(Boolean hasSterilization) {
        this.hasSterilization = hasSterilization;
    }

    public Integer getPriority() {
        return priority;
    }

    public ReceiverSupplier priority(Integer priority) {
        this.priority = priority;
        return this;
    }

    public void setPriority(Integer priority) {
        this.priority = priority;
    }

    public String getNotes() {
        return notes;
    }

    public ReceiverSupplier notes(String notes) {
        this.notes = notes;
        return this;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Set<ReceiverResource> getReceiverResources() {
        return receiverResources;
    }

    public ReceiverSupplier receiverResources(Set<ReceiverResource> receiverResources) {
        this.receiverResources = receiverResources;
        return this;
    }

    public ReceiverSupplier addReceiverResource(ReceiverResource receiverResource) {
        this.receiverResources.add(receiverResource);
        receiverResource.setReceiver(this);
        return this;
    }

    public ReceiverSupplier removeReceiverResource(ReceiverResource receiverResource) {
        this.receiverResources.remove(receiverResource);
        receiverResource.setReceiver(null);
        return this;
    }

    public void setReceiverResources(Set<ReceiverResource> receiverResources) {
        this.receiverResources = receiverResources;
    }

    public Set<SupplierResource> getSupplierResources() {
        return supplierResources;
    }

    public ReceiverSupplier supplierResources(Set<SupplierResource> supplierResources) {
        this.supplierResources = supplierResources;
        return this;
    }

    public ReceiverSupplier addSupplierResource(SupplierResource supplierResource) {
        this.supplierResources.add(supplierResource);
        supplierResource.setSupplier(this);
        return this;
    }

    public ReceiverSupplier removeSupplierResource(SupplierResource supplierResource) {
        this.supplierResources.remove(supplierResource);
        supplierResource.setSupplier(null);
        return this;
    }

    public void setSupplierResources(Set<SupplierResource> supplierResources) {
        this.supplierResources = supplierResources;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove


    public GeoJsonPoint getPosition() {
        return position;
    }

    public void setPosition(GeoJsonPoint pos) {
        this.position = pos;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ReceiverSupplier)) {
            return false;
        }
        return id != null && id.equals(((ReceiverSupplier) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ReceiverSupplier{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", address='" + getAddress() + "'" +
            ", email='" + getEmail() + "'" +
            ", primaryContactName='" + getPrimaryContactName() + "'" +
            ", zip='" + getZip() + "'" +
            ", phonenumber='" + getPhonenumber() + "'" +
            ", latx=" + getLatx() +
            ", longy=" + getLongy() +
            ", city='" + getCity() + "'" +
            ", state='" + getState() + "'" +
            ", country='" + getCountry() + "'" +
            ", npi=" + getNpi() +
            ", isReceiver='" + isIsReceiver() + "'" +
            ", isSupplier='" + isIsSupplier() + "'" +
            ", hasSterilization='" + isHasSterilization() + "'" +
            ", priority=" + getPriority() +
            ", notes='" + getNotes() + "'" +
            "}";
    }
}
