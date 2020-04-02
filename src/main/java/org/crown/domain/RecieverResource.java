package org.crown.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.util.Objects;

/**
 * A RecieverResource.
 */
@Document(collection = "reciever_resource")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "recieverresource")
public class RecieverResource implements Serializable {

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

    public RecieverResource name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public RecieverResource quantity(Integer quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Integer getDailyUse() {
        return dailyUse;
    }

    public RecieverResource dailyUse(Integer dailyUse) {
        this.dailyUse = dailyUse;
        return this;
    }

    public void setDailyUse(Integer dailyUse) {
        this.dailyUse = dailyUse;
    }

    public Integer getCurrentStock() {
        return currentStock;
    }

    public RecieverResource currentStock(Integer currentStock) {
        this.currentStock = currentStock;
        return this;
    }

    public void setCurrentStock(Integer currentStock) {
        this.currentStock = currentStock;
    }

    public String getNotes() {
        return notes;
    }

    public RecieverResource notes(String notes) {
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
        if (!(o instanceof RecieverResource)) {
            return false;
        }
        return id != null && id.equals(((RecieverResource) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "RecieverResource{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", quantity=" + getQuantity() +
            ", dailyUse=" + getDailyUse() +
            ", currentStock=" + getCurrentStock() +
            ", notes='" + getNotes() + "'" +
            "}";
    }
}
