package org.crown.domain;

import java.io.Serializable;
import java.net.URI;
import java.util.HashSet;
import java.util.Set;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A ReceiverSupplier.
 */
@Document(collection = "receiver_supplier")
public class ReceiverSupplier implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	private String id;

	// TODO: All the fields below constitute 'Organization Details'.
	// Candidate to be defined in a custom type

	@Field("seller_type")
	private String sellerType;

	@Field("manufacturer_country")
	private String manufacturerCountry;

	@Field("org_name")
	private String orgName;

	@Field("org_website")
	private String orgWebsite;

	@Field("address_line1")
	private String addressLine1;

	@Field("address_line2")
	private String addressLine2;

	@Field("city")
	private String city;

	@Field("zip")
	private String zip;

	@Field("state")
	private String state;

	@Field("country")
	private String country;

	// TODO: All the fields below constitute 'Person of Contact Details'.
	// Candidate to be defined in a custom type

	// TODO: 'Address' should be its own type so it can be reused across the
	// above 'Organization' type and this 'PersonOfContact' type

	@Field("position")
	private String position;

	@Field("proof_of_association")
	private String proofOfAssociation;

	@Field("proof_of_association_link")
	private URI proofOfAssociationLink;

	@Field("first_name")
	private String firstName;

	@Field("last_name")
	private String lastName;

	@Field("email")
	private String email;

	@Field("phone_number")
	private String phonenumber;

	@Field("secondary_phone_number")
	private String secondaryPhoneNumber;

	@Field("poc_address_line1")
	private String pocAddressLine11;

	@Field("poc_address_line2")
	private String pocAddressLine2;

	@Field("poc_city")
	private String pocCity;

	@Field("poc_zip")
	private String pocZip;

	@Field("poc_state")
	private String pocState;

	@Field("poc_country")
	private String pocCountry;

	// TODO: Determine if the below fields are still in use
	@Field("latx")
	private Float latx;

	@Field("longy")
	private Float longy;

	@Field("address")
	private String address;

	@Field("primary_contact_name")
	private String primaryContactName;

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

	@Field("tags")
	private String tags;

	@DBRef
	@Field("receiverResource")
	private Set<ReceiverResource> receiverResources = new HashSet<>();

	@DBRef
	@Field("supplierResource")
	private Set<SupplierResource> supplierResources = new HashSet<>();

	// jhipster-needle-entity-add-field - JHipster will add fields here, do not
	// remove
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	/**
	 * @return the sellerType
	 */
	public String getSellerType() {
		return sellerType;
	}

	/**
	 * @param sellerType the sellerType to set
	 */
	public void setSellerType(String sellerType) {
		this.sellerType = sellerType;
	}

	/**
	 * @return the manufacturerCountry
	 */
	public String getManufacturerCountry() {
		return manufacturerCountry;
	}

	/**
	 * @param manufacturerCountry the manufacturerCountry to set
	 */
	public void setManufacturerCountry(String manufacturerCountry) {
		this.manufacturerCountry = manufacturerCountry;
	}

	public String getOrgName() {
		return orgName;
	}

	public ReceiverSupplier orgName(String orgName) {
		this.orgName = orgName;
		return this;
	}

	public void setOrgName(String orgName) {
		this.orgName = orgName;
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

	public ReceiverSupplier email(String email) {
		this.email = email;
		return this;
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

	public String getOrgWebsite() {
		return orgWebsite;
	}

	public void setOrgWebsite(String orgWebsite) {
		this.orgWebsite = orgWebsite;
	}

	public ReceiverSupplier zip(String zip) {
		this.zip = zip;
		return this;
	}

	public ReceiverSupplier phonenumber(String phonenumber) {
		this.phonenumber = phonenumber;
		return this;
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

	public ReceiverSupplier city(String city) {
		this.city = city;
		return this;
	}

	public ReceiverSupplier state(String state) {
		this.state = state;
		return this;
	}

	public ReceiverSupplier country(String country) {
		this.country = country;
		return this;
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

	public String getTags() {
		return tags;
	}

	public ReceiverSupplier tags(String tags) {
		this.tags = tags;
		return this;
	}

	public ReceiverSupplier proofOfAssociation(String proofOfAssociation) {
		this.proofOfAssociation = proofOfAssociation;
		return this;
	}

	public void setTags(String tags) {
		this.tags = tags;
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
	// jhipster-needle-entity-add-getters-setters - JHipster will add getters and
	// setters here, do not remove

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
		return "ReceiverSupplier{" + "id=" + getId() + ", name='" + getOrgName() + "'" + ", address='" + getAddress()
				+ "'" + ", email='" + getEmail() + "'" + ", primaryContactName='" + getPrimaryContactName() + "'"
				+ ", zip='" + getZip() + "'" + ", phonenumber='" + getPhonenumber() + "'" + ", latx=" + getLatx()
				+ ", longy=" + getLongy() + ", city='" + getCity() + "'" + ", state='" + getState() + "'"
				+ ", country='" + getCountry() + "'" + ", npi=" + getNpi() + ", isReceiver='" + isIsReceiver() + "'"
				+ ", isSupplier='" + isIsSupplier() + "'" + ", hasSterilization='" + isHasSterilization() + "'"
				+ ", priority=" + getPriority() + ", notes='" + getNotes() + "'" + ", tags='" + getTags() + "'" + "}";
	}

	/**
	 * @return the addressLine1
	 */
	public String getAddressLine1() {
		return addressLine1;
	}

	/**
	 * @param addressLine1 the addressLine1 to set
	 */
	public void setAddressLine1(String addressLine1) {
		this.addressLine1 = addressLine1;
	}

	/**
	 * @return the addressLine2
	 */
	public String getAddressLine2() {
		return addressLine2;
	}

	/**
	 * @param addressLine2 the addressLine2 to set
	 */
	public void setAddressLine2(String addressLine2) {
		this.addressLine2 = addressLine2;
	}

	/**
	 * @return the city
	 */
	public String getCity() {
		return city;
	}

	/**
	 * @param city the city to set
	 */
	public void setCity(String city) {
		this.city = city;
	}

	/**
	 * @return the zip
	 */
	public String getZip() {
		return zip;
	}

	/**
	 * @param zip the zip to set
	 */
	public void setZip(String zip) {
		this.zip = zip;
	}

	/**
	 * @return the state
	 */
	public String getState() {
		return state;
	}

	/**
	 * @param state the state to set
	 */
	public void setState(String state) {
		this.state = state;
	}

	/**
	 * @return the country
	 */
	public String getCountry() {
		return country;
	}

	/**
	 * @param country the country to set
	 */
	public void setCountry(String country) {
		this.country = country;
	}

	/**
	 * @return the position
	 */
	public String getPosition() {
		return position;
	}

	/**
	 * @param position the position to set
	 */
	public void setPosition(String position) {
		this.position = position;
	}

	/**
	 * @return the proofOfAssociation
	 */
	public String getProofOfAssociation() {
		return proofOfAssociation;
	}

	/**
	 * @param proofOfAssociation the proofOfAssociation to set
	 */
	public void setProofOfAssociation(String proofOfAssociation) {
		this.proofOfAssociation = proofOfAssociation;
	}

	/**
	 * @return the proofOfAssociationLink
	 */
	public URI getProofOfAssociationLink() {
		return proofOfAssociationLink;
	}

	/**
	 * @param proofOfAssociationLink the proofOfAssociationLink to set
	 */
	public void setProofOfAssociationLink(URI proofOfAssociationLink) {
		this.proofOfAssociationLink = proofOfAssociationLink;
	}

	/**
	 * @return the firstName
	 */
	public String getFirstName() {
		return firstName;
	}

	/**
	 * @param firstName the firstName to set
	 */
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	/**
	 * @return the lastName
	 */
	public String getLastName() {
		return lastName;
	}

	/**
	 * @param lastName the lastName to set
	 */
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	/**
	 * @return the email
	 */
	public String getEmail() {
		return email;
	}

	/**
	 * @param email the email to set
	 */
	public void setEmail(String email) {
		this.email = email;
	}

	/**
	 * @return the phonenumber
	 */
	public String getPhonenumber() {
		return phonenumber;
	}

	/**
	 * @param phonenumber the phonenumber to set
	 */
	public void setPhonenumber(String phonenumber) {
		this.phonenumber = phonenumber;
	}

	/**
	 * @return the secondaryPhoneNumber
	 */
	public String getSecondaryPhoneNumber() {
		return secondaryPhoneNumber;
	}

	/**
	 * @param secondaryPhoneNumber the secondaryPhoneNumber to set
	 */
	public void setSecondaryPhoneNumber(String secondaryPhoneNumber) {
		this.secondaryPhoneNumber = secondaryPhoneNumber;
	}

	/**
	 * @return the pocAddressLine11
	 */
	public String getPocAddressLine11() {
		return pocAddressLine11;
	}

	/**
	 * @param pocAddressLine11 the pocAddressLine11 to set
	 */
	public void setPocAddressLine11(String pocAddressLine11) {
		this.pocAddressLine11 = pocAddressLine11;
	}

	/**
	 * @return the pocAddressLine2
	 */
	public String getPocAddressLine2() {
		return pocAddressLine2;
	}

	/**
	 * @param pocAddressLine2 the pocAddressLine2 to set
	 */
	public void setPocAddressLine2(String pocAddressLine2) {
		this.pocAddressLine2 = pocAddressLine2;
	}

	/**
	 * @return the pocCity
	 */
	public String getPocCity() {
		return pocCity;
	}

	/**
	 * @param pocCity the pocCity to set
	 */
	public void setPocCity(String pocCity) {
		this.pocCity = pocCity;
	}

	/**
	 * @return the pocZip
	 */
	public String getPocZip() {
		return pocZip;
	}

	/**
	 * @param pocZip the pocZip to set
	 */
	public void setPocZip(String pocZip) {
		this.pocZip = pocZip;
	}

	/**
	 * @return the pocState
	 */
	public String getPocState() {
		return pocState;
	}

	/**
	 * @param pocState the pocState to set
	 */
	public void setPocState(String pocState) {
		this.pocState = pocState;
	}

	/**
	 * @return the pocCountry
	 */
	public String getPocCountry() {
		return pocCountry;
	}

	/**
	 * @param pocCountry the pocCountry to set
	 */
	public void setPocCountry(String pocCountry) {
		this.pocCountry = pocCountry;
	}

	/**
	 * @return the isReceiver
	 */
	public Boolean getIsReceiver() {
		return isReceiver;
	}

	/**
	 * @return the isSupplier
	 */
	public Boolean getIsSupplier() {
		return isSupplier;
	}

	/**
	 * @return the hasSterilization
	 */
	public Boolean getHasSterilization() {
		return hasSterilization;
	}
}
