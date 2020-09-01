package org.crown.domain;

import java.io.Serializable;
import java.util.Date;

import javax.validation.constraints.NotNull;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * A SupplierResource.
 */
@Document(collection = "supplier_resource")
public class SupplierResource implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	private String id;

	@DBRef
    @NotNull
	@Field("resourceType")
	private ResourceType resourceType;

	@NotNull
	@Field("quantity")
	private Integer quantity = 0;

	@NotNull
	@Field("quantityValidUntil")
	private Date quantityValidUntil;

	@NotNull
	@Field("cost")
	private Double cost = 0.0;

	@NotNull
	@Field("productAvailabilityLeadTime")
	private Integer productAvailabilityLeadTime;

	@NotNull
	@Field("minOrderQuantity")
	private Integer minOrderQuantity;

	@NotNull
	@Field("quantityOnHand")
	private Integer quantityOnHand;

	@Field("supportingDocuments")
	private String supportingDocuments;

	@Field("supportingDocumentsLink")
	private String supportingDocumentsLink;

	@Field("productAssets")
	private String productAssets;

	@Field("proofOfLife")
	private String proofOfLife;

	@Field("publicationPermission")
	private Boolean publicationPermission;

	@DBRef
	@Field("supplier")
	@JsonIgnoreProperties("supplierResources")
	private ReceiverSupplier supplier;

	@GeoSpatialIndexed
	@Field("position")
	private double[] position;

	@Field("postedDate")
	private Date postedDate;

	// jhipster-needle-entity-add-field - JHipster will add fields here, do not
	// remove
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	/**
	 * @return the quantityValidUntil
	 */
	public Date getQuantityValidUntil() {
		return quantityValidUntil;
	}

	/**
	 * @param quantityValidUntil the quantityValidUntil to set
	 */
	public void setQuantityValidUntil(Date quantityValidUntil) {
		this.quantityValidUntil = quantityValidUntil;
	}

	/**
	 * @return the productAvailabilityLeadTime
	 */
	public Integer getProductAvailabilityLeadTime() {
		return productAvailabilityLeadTime;
	}

	/**
	 * @param productAvailabilityLeadTime the productAvailabilityLeadTime to set
	 */
	public void setProductAvailabilityLeadTime(Integer productAvailabilityLeadTime) {
		this.productAvailabilityLeadTime = productAvailabilityLeadTime;
	}

	/**
	 * @return the minOrderQuantity
	 */
	public Integer getMinOrderQuantity() {
		return minOrderQuantity;
	}

	/**
	 * @param minOrderQuantity the minOrderQuantity to set
	 */
	public void setMinOrderQuantity(Integer minOrderQuantity) {
		this.minOrderQuantity = minOrderQuantity;
	}

	/**
	 * @return the quantityOnHand
	 */
	public Integer getQuantityOnHand() {
		return quantityOnHand;
	}

	/**
	 * @param quantityOnHand the quantityOnHand to set
	 */
	public void setQuantityOnHand(Integer quantityOnHand) {
		this.quantityOnHand = quantityOnHand;
	}

	/**
	 * @return the supportingDocuments
	 */
	public String getSupportingDocuments() {
		return supportingDocuments;
	}

	/**
	 * @param supportingDocuments the supportingDocuments to set
	 */
	public void setSupportingDocuments(String supportingDocuments) {
		this.supportingDocuments = supportingDocuments;
	}

	/**
	 * @return the supportingDocumentsLink
	 */
	public String getSupportingDocumentsLink() {
		return supportingDocumentsLink;
	}

	/**
	 * @param supportingDocumentsLink the supportingDocumentsLink to set
	 */
	public void setSupportingDocumentsLink(String supportingDocumentsLink) {
		this.supportingDocumentsLink = supportingDocumentsLink;
	}

	/**
	 * @return the productAssets
	 */
	public String getProductAssets() {
		return productAssets;
	}

	/**
	 * @param productAssets the productAssets to set
	 */
	public void setProductAssets(String productAssets) {
		this.productAssets = productAssets;
	}

	/**
	 * @return the proofOfLife
	 */
	public String getProofOfLife() {
		return proofOfLife;
	}

	/**
	 * @param proofOfLife the proofOfLife to set
	 */
	public void setProofOfLife(String proofOfLife) {
		this.proofOfLife = proofOfLife;
	}

	/**
	 * @return the publicationPermission
	 */
	public Boolean getPublicationPermission() {
		return publicationPermission;
	}

	/**
	 * @param publicationPermission the publicationPermission to set
	 */
	public void setPublicationPermission(Boolean publicationPermission) {
		this.publicationPermission = publicationPermission;
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

	public ResourceType getResourceType() {
		return resourceType;
	}

	public SupplierResource resourceType(ResourceType resourceType) {
		this.resourceType = resourceType;
		return this;
	}

	public void setResourceType(ResourceType resourceType) {
		this.resourceType = resourceType;
	}

	public ReceiverSupplier getSupplier() {
		return supplier;
	}

	public SupplierResource supplier(ReceiverSupplier receiverSupplier) {
		this.supplier = receiverSupplier;
		return this;
	}

	public void setSupplier(ReceiverSupplier receiverSupplier) {
		this.supplier = receiverSupplier;
	}
	// jhipster-needle-entity-add-getters-setters - JHipster will add getters and
	// setters here, do not remove

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
		return "SupplierResource{" + "id=" + getId() + ", quantity=" + getQuantity() + ", cost=" + getCost() + "}";
	}

	public void setPosition(double[] position) {
		this.position = position;
	}

	public double[] getPosition() {
		return this.position;
	}

	public Date getPostedDate() {
		return postedDate;
	}

	public void setPostedDate(Date postedDate) {
		this.postedDate = postedDate;
	}
}
