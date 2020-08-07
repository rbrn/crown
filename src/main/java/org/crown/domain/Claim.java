package org.crown.domain;

import org.crown.domain.enumeration.ClaimStatusEnum;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

/**
 * A Claim.
 */
@Document(collection = "claim")
public class Claim implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("quantity")
    private Integer quantity;

    @Field("notes")
    private String notes;

    @NotEmpty
    @Field("status")
    private ClaimStatusEnum status;

    @DBRef
    @Field("receiverResource")
    private ReceiverResource receiverResource;

    @DBRef
    @Field("supplierResource")
    private SupplierResource supplierResource;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public Claim quantity(Integer quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getNotes() {
        return notes;
    }

    public Claim notes(String notes) {
        this.notes = notes;
        return this;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public ClaimStatusEnum getStatus() {
        return status;
    }

    public Claim status(ClaimStatusEnum status) {
        this.status = status;
        return this;
    }

    public void setStatus(ClaimStatusEnum status) {
        this.status = status;
    }

    public ReceiverResource getReceiverResource() {
        return receiverResource;
    }

    public Claim receiverResource(ReceiverResource receiverResource) {
        this.receiverResource = receiverResource;
        return this;
    }

    public void setReceiverResource(ReceiverResource receiverResource) {
        this.receiverResource = receiverResource;
    }

    public SupplierResource getSupplierResource() {
        return supplierResource;
    }

    public Claim supplierResource(SupplierResource supplierResource) {
        this.supplierResource = supplierResource;
        return this;
    }

    public void setSupplierResource(SupplierResource supplierResource) {
        this.supplierResource = supplierResource;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Claim)) {
            return false;
        }
        return id != null && id.equals(((Claim) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Claim{" +
            "id=" + getId() +
            ", quantity=" + getQuantity() +
            ", notes='" + getNotes() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
