package org.crown.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.DBRef;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;
import java.time.LocalDate;

/**
 * A ReceiverResource.
 */
@Document(collection = "receiver_resource")
public class ReceiverResource implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("name")
    private String name;

    @NotNull
    @Field("quantity")
    private Integer quantity;

    @NotNull
    @Field("daily_use")
    private Integer dailyUse;

    @NotNull
    @Field("posted_date")
    private LocalDate postedDate;

    @Field("current_stock")
    private Integer currentStock;

    @Field("expiration")
    private LocalDate expiration;

    @Field("notes")
    private String notes;

    @Field("proofOfFunds")
    private String proofOfFunds;

    @DBRef
    @Field("resourceType")
    private ResourceType resourceType;

    @DBRef
    @Field("receiver")
    @JsonIgnoreProperties("receiverResources")
    private ReceiverSupplier receiver;

    public double [] getPosition() {
        return position;
    }

    public void setPosition(double [] position) {
        this.position = position;
    }

    // geo spatial position
    @GeoSpatialIndexed
    @Field("position")
    private double [] position;

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

    public ReceiverResource name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public ReceiverResource quantity(Integer quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Integer getDailyUse() {
        return dailyUse;
    }

    public ReceiverResource dailyUse(Integer dailyUse) {
        this.dailyUse = dailyUse;
        return this;
    }

    public void setDailyUse(Integer dailyUse) {
        this.dailyUse = dailyUse;
    }

    public LocalDate getPostedDate() {
        return postedDate;
    }

    public ReceiverResource postedDate(LocalDate postedDate) {
        this.postedDate = postedDate;
        return this;
    }

    public void setPostedDate(LocalDate postedDate) {
        this.postedDate = postedDate;
    }

    public Integer getCurrentStock() {
        return currentStock;
    }

    public ReceiverResource currentStock(Integer currentStock) {
        this.currentStock = currentStock;
        return this;
    }

    public void setCurrentStock(Integer currentStock) {
        this.currentStock = currentStock;
    }

    public LocalDate getExpiration() {
        return expiration;
    }

    public ReceiverResource expiration(LocalDate expiration) {
        this.expiration = expiration;
        return this;
    }

    public void setExpiration(LocalDate expiration) {
        this.expiration = expiration;
    }

    public String getNotes() {
        return notes;
    }

    public ReceiverResource notes(String notes) {
        this.notes = notes;
        return this;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public ResourceType getResourceType() {
        return resourceType;
    }

    public ReceiverResource resourceType(ResourceType resourceType) {
        this.resourceType = resourceType;
        return this;
    }

    public void setResourceType(ResourceType resourceType) {
        this.resourceType = resourceType;
    }

    public String getProofOfFunds() {
        return proofOfFunds;
    }

    public void setProofOfFunds(String proofOfFunds) {
        this.proofOfFunds = proofOfFunds;
    }

    public ReceiverResource proofOfFunds(String proofOfFunds) {
        this.proofOfFunds = proofOfFunds;
        return this;
    }

    public ReceiverSupplier getReceiver() {
        return receiver;
    }

    public ReceiverResource receiver(ReceiverSupplier receiverSupplier) {
        this.receiver = receiverSupplier;
        return this;
    }

    public void setReceiver(ReceiverSupplier receiverSupplier) {
        this.receiver = receiverSupplier;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ReceiverResource)) {
            return false;
        }
        return id != null && id.equals(((ReceiverResource) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ReceiverResource{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", quantity=" + getQuantity() +
            ", dailyUse=" + getDailyUse() +
            ", postedDate='" + getPostedDate() + "'" +
            ", currentStock=" + getCurrentStock() +
            ", expiration='" + getExpiration() + "'" +
            ", notes='" + getNotes() + "'" +
            "}";
    }
}
