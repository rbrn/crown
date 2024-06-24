package org.crown.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

/**
 * A SupplyPointResource.
 */
@Document(collection = "supply_point_resource")
public class SupplyPointResource implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("num_requested")
    private Integer numRequested;

    @Field("can_produce")
    private Integer canProduce;

    @Field("numin_stock")
    private Integer numinStock;

    @DBRef
    @Field("resource")
    private Set<Resource> resources = new HashSet<>();

    @DBRef
    @Field("supplypoint")
    @JsonIgnoreProperties("resourceLocations")
    private SupplyPoint supplypoint;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getNumRequested() {
        return numRequested;
    }

    public SupplyPointResource numRequested(Integer numRequested) {
        this.numRequested = numRequested;
        return this;
    }

    public void setNumRequested(Integer numRequested) {
        this.numRequested = numRequested;
    }

    public Integer getCanProduce() {
        return canProduce;
    }

    public SupplyPointResource canProduce(Integer canProduce) {
        this.canProduce = canProduce;
        return this;
    }

    public void setCanProduce(Integer canProduce) {
        this.canProduce = canProduce;
    }

    public Integer getNuminStock() {
        return numinStock;
    }

    public SupplyPointResource numinStock(Integer numinStock) {
        this.numinStock = numinStock;
        return this;
    }

    public void setNuminStock(Integer numinStock) {
        this.numinStock = numinStock;
    }

    public Set<Resource> getResources() {
        return resources;
    }

    public SupplyPointResource resources(Set<Resource> resources) {
        this.resources = resources;
        return this;
    }

    public SupplyPointResource addResource(Resource resource) {
        this.resources.add(resource);
        resource.setSupplyPointResource(this);
        return this;
    }

    public SupplyPointResource removeResource(Resource resource) {
        this.resources.remove(resource);
        resource.setSupplyPointResource(null);
        return this;
    }

    public void setResources(Set<Resource> resources) {
        this.resources = resources;
    }

    public SupplyPoint getSupplypoint() {
        return supplypoint;
    }

    public SupplyPointResource supplypoint(SupplyPoint supplyPoint) {
        this.supplypoint = supplyPoint;
        return this;
    }

    public void setSupplypoint(SupplyPoint supplyPoint) {
        this.supplypoint = supplyPoint;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SupplyPointResource)) {
            return false;
        }
        return id != null && id.equals(((SupplyPointResource) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "SupplyPointResource{" +
            "id=" + getId() +
            ", numRequested=" + getNumRequested() +
            ", canProduce=" + getCanProduce() +
            ", numinStock=" + getNuminStock() +
            "}";
    }
}
