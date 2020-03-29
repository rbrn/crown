package org.crown.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Delivery.
 */
@Document(collection = "delivery")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "delivery")
public class Delivery implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("delivery_contact")
    private String deliveryContact;

    @NotNull
    @Field("phone_number")
    private String phoneNumber;

    @Field("notes")
    private String notes;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDeliveryContact() {
        return deliveryContact;
    }

    public Delivery deliveryContact(String deliveryContact) {
        this.deliveryContact = deliveryContact;
        return this;
    }

    public void setDeliveryContact(String deliveryContact) {
        this.deliveryContact = deliveryContact;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public Delivery phoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
        return this;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getNotes() {
        return notes;
    }

    public Delivery notes(String notes) {
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
        if (!(o instanceof Delivery)) {
            return false;
        }
        return id != null && id.equals(((Delivery) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Delivery{" +
            "id=" + getId() +
            ", deliveryContact='" + getDeliveryContact() + "'" +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            ", notes='" + getNotes() + "'" +
            "}";
    }
}
