package org.crown.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;

/**
 * A SupplierResource.
 */
@Document(collection = "supplier_resource")
public class SupplierResource implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("quantity")
    private Integer quantity = 0;

    @NotNull
    @Field("cost")
    private Double cost = 0.0;

    @GeoSpatialIndexed
    @Field("position")
    private double [] position;
    
    @Field("postedDate")
    private Date postedDate;
    
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

    public SupplierResource quantity(Integer quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public double getCost() {
        return cost;
    }

    public SupplierResource cost(Double cost) {
        this.cost = cost;
        return this;
    }

    public void setCost(Double cost) {
        this.cost = cost;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SupplierResource)) {
            return false;
        }
        return id != null && id.equals(((SupplierResource) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "SupplierResource{" +
            "id=" + getId() +
            ", quantity=" + getQuantity() +
            ", cost=" + getCost() +
            "}";
    }

	public void setPosition(double [] position) {
		this.position = position;
	}

	public Date getPostedDate() {
		return postedDate;
	}

	public void setPostedDate(Date postedDate) {
		this.postedDate = postedDate;
	}
}
