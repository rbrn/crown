package org.crown.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.util.Objects;

/**
 * A ReceiverResource.
 */
@Document(collection = "receiver_resource")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "receiverresource")
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

    @Field("current_stock")
    private Integer currentStock;

    @Field("notes")
    private String notes;
    
    // geo spatial position
    private GeoJsonPoint position;

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
    
    public GeoJsonPoint getPosition() {
		return position;
	}

	public void setPosition(GeoJsonPoint pos) {
		this.position = pos;
	}

    @Override
    public String toString() {
        return "ReceiverResource{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", quantity=" + getQuantity() +
            ", dailyUse=" + getDailyUse() +
            ", currentStock=" + getCurrentStock() +
            ", notes='" + getNotes() + "'" +
            "}";
    }
}
