package org.crown.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.DBRef;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Request.
 */
@Document(collection = "request")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "request")
public class Request implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("item_type")
    private String itemType;

    @Field("num_requested")
    private Integer numRequested;

    @Field("daily_need")
    private Integer dailyNeed;

    @Field("numin_stock")
    private Integer numinStock;

    @Field("days_left")
    private Integer daysLeft;

    @DBRef
    @Field("resource")
    private Resource resource;

    @DBRef
    @Field("requestPoint")
    @JsonIgnoreProperties("requests")
    private RequestPoint requestPoint;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getItemType() {
        return itemType;
    }

    public Request itemType(String itemType) {
        this.itemType = itemType;
        return this;
    }

    public void setItemType(String itemType) {
        this.itemType = itemType;
    }

    public Integer getNumRequested() {
        return numRequested;
    }

    public Request numRequested(Integer numRequested) {
        this.numRequested = numRequested;
        return this;
    }

    public void setNumRequested(Integer numRequested) {
        this.numRequested = numRequested;
    }

    public Integer getDailyNeed() {
        return dailyNeed;
    }

    public Request dailyNeed(Integer dailyNeed) {
        this.dailyNeed = dailyNeed;
        return this;
    }

    public void setDailyNeed(Integer dailyNeed) {
        this.dailyNeed = dailyNeed;
    }

    public Integer getNuminStock() {
        return numinStock;
    }

    public Request numinStock(Integer numinStock) {
        this.numinStock = numinStock;
        return this;
    }

    public void setNuminStock(Integer numinStock) {
        this.numinStock = numinStock;
    }

    public Integer getDaysLeft() {
        return daysLeft;
    }

    public Request daysLeft(Integer daysLeft) {
        this.daysLeft = daysLeft;
        return this;
    }

    public void setDaysLeft(Integer daysLeft) {
        this.daysLeft = daysLeft;
    }

    public Resource getResource() {
        return resource;
    }

    public Request resource(Resource resource) {
        this.resource = resource;
        return this;
    }

    public void setResource(Resource resource) {
        this.resource = resource;
    }

    public RequestPoint getRequestPoint() {
        return requestPoint;
    }

    public Request requestPoint(RequestPoint requestPoint) {
        this.requestPoint = requestPoint;
        return this;
    }

    public void setRequestPoint(RequestPoint requestPoint) {
        this.requestPoint = requestPoint;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Request)) {
            return false;
        }
        return id != null && id.equals(((Request) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Request{" +
            "id=" + getId() +
            ", itemType='" + getItemType() + "'" +
            ", numRequested=" + getNumRequested() +
            ", dailyNeed=" + getDailyNeed() +
            ", numinStock=" + getNuminStock() +
            ", daysLeft=" + getDaysLeft() +
            "}";
    }
}
