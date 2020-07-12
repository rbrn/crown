package org.crown.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import org.crown.CrownApp;
import org.crown.domain.ReceiverSupplier;
import org.crown.repository.ReceiverSupplierRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

/**
 * Integration tests for the {@link ReceiverSupplierResource} REST controller.
 */
@SpringBootTest(classes = CrownApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class ReceiverSupplierResourceIT {

	private static final String DEFAULT_NAME = "AAAAAAAAAA";
	private static final String UPDATED_NAME = "BBBBBBBBBB";

	private static final String DEFAULT_ADDRESS = "AAAAAAAAAA";
	private static final String UPDATED_ADDRESS = "BBBBBBBBBB";

	private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
	private static final String UPDATED_EMAIL = "BBBBBBBBBB";

	private static final String DEFAULT_PRIMARY_CONTACT_NAME = "AAAAAAAAAA";
	private static final String UPDATED_PRIMARY_CONTACT_NAME = "BBBBBBBBBB";

	private static final String DEFAULT_ZIP = "AAAAAAAAAA";
	private static final String UPDATED_ZIP = "BBBBBBBBBB";

	private static final String DEFAULT_PHONENUMBER = "AAAAAAAAAA";
	private static final String UPDATED_PHONENUMBER = "BBBBBBBBBB";

	private static final Float DEFAULT_LATX = 1F;
	private static final Float UPDATED_LATX = 2F;

	private static final Float DEFAULT_LONGY = 1F;
	private static final Float UPDATED_LONGY = 2F;

	private static final String DEFAULT_CITY = "AAAAAAAAAA";
	private static final String UPDATED_CITY = "BBBBBBBBBB";

	private static final String DEFAULT_STATE = "AAAAAAAAAA";
	private static final String UPDATED_STATE = "BBBBBBBBBB";

	private static final String DEFAULT_COUNTRY = "AAAAAAAAAA";
	private static final String UPDATED_COUNTRY = "BBBBBBBBBB";

	private static final Integer DEFAULT_NPI = 1;
	private static final Integer UPDATED_NPI = 2;

	private static final Boolean DEFAULT_IS_RECEIVER = false;
	private static final Boolean UPDATED_IS_RECEIVER = true;

	private static final Boolean DEFAULT_IS_SUPPLIER = false;
	private static final Boolean UPDATED_IS_SUPPLIER = true;

	private static final Boolean DEFAULT_HAS_STERILIZATION = false;
	private static final Boolean UPDATED_HAS_STERILIZATION = true;

	private static final Integer DEFAULT_PRIORITY = 1;
	private static final Integer UPDATED_PRIORITY = 2;

	private static final String DEFAULT_NOTES = "AAAAAAAAAA";
	private static final String UPDATED_NOTES = "BBBBBBBBBB";

	private static final String DEFAULT_TAGS = "AAAAAAAAAA";
	private static final String UPDATED_TAGS = "BBBBBBBBBB";

	@Autowired
	private ReceiverSupplierRepository receiverSupplierRepository;

	@Autowired
	private MockMvc restReceiverSupplierMockMvc;

	private ReceiverSupplier receiverSupplier;

	/**
	 * Create an entity for this test.
	 *
	 * This is a static method, as tests for other entities might also need it, if
	 * they test an entity which requires the current entity.
	 */
	public static ReceiverSupplier createEntity() {
		ReceiverSupplier receiverSupplier = new ReceiverSupplier().orgName(DEFAULT_NAME).address(DEFAULT_ADDRESS)
				.email(DEFAULT_EMAIL).primaryContactName(DEFAULT_PRIMARY_CONTACT_NAME).zip(DEFAULT_ZIP)
				.phonenumber(DEFAULT_PHONENUMBER).latx(DEFAULT_LATX).longy(DEFAULT_LONGY).city(DEFAULT_CITY)
				.state(DEFAULT_STATE).country(DEFAULT_COUNTRY).npi(DEFAULT_NPI).isReceiver(DEFAULT_IS_RECEIVER)
				.isSupplier(DEFAULT_IS_SUPPLIER).hasSterilization(DEFAULT_HAS_STERILIZATION).priority(DEFAULT_PRIORITY)
				.notes(DEFAULT_NOTES).tags(DEFAULT_TAGS);
		return receiverSupplier;
	}

	/**
	 * Create an updated entity for this test.
	 *
	 * This is a static method, as tests for other entities might also need it, if
	 * they test an entity which requires the current entity.
	 */
	public static ReceiverSupplier createUpdatedEntity() {
		ReceiverSupplier receiverSupplier = new ReceiverSupplier().orgName(UPDATED_NAME).address(UPDATED_ADDRESS)
				.email(UPDATED_EMAIL).primaryContactName(UPDATED_PRIMARY_CONTACT_NAME).zip(UPDATED_ZIP)
				.phonenumber(UPDATED_PHONENUMBER).latx(UPDATED_LATX).longy(UPDATED_LONGY).city(UPDATED_CITY)
				.state(UPDATED_STATE).country(UPDATED_COUNTRY).npi(UPDATED_NPI).isReceiver(UPDATED_IS_RECEIVER)
				.isSupplier(UPDATED_IS_SUPPLIER).hasSterilization(UPDATED_HAS_STERILIZATION).priority(UPDATED_PRIORITY)
				.notes(UPDATED_NOTES).tags(UPDATED_TAGS);
		return receiverSupplier;
	}

	@BeforeEach
	public void initTest() {
		receiverSupplierRepository.deleteAll();
		receiverSupplier = createEntity();
	}

	@Test
	public void createReceiverSupplier() throws Exception {
		int databaseSizeBeforeCreate = receiverSupplierRepository.findAll().size();

		// Create the ReceiverSupplier
		restReceiverSupplierMockMvc.perform(post("/api/receiver-suppliers").with(csrf())
				.contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(receiverSupplier)))
				.andExpect(status().isCreated());

		// Validate the ReceiverSupplier in the database
		List<ReceiverSupplier> receiverSupplierList = receiverSupplierRepository.findAll();
		assertThat(receiverSupplierList).hasSize(databaseSizeBeforeCreate + 1);
		ReceiverSupplier testReceiverSupplier = receiverSupplierList.get(receiverSupplierList.size() - 1);
		assertThat(testReceiverSupplier.getOrgName()).isEqualTo(DEFAULT_NAME);
		assertThat(testReceiverSupplier.getAddress()).isEqualTo(DEFAULT_ADDRESS);
		assertThat(testReceiverSupplier.getEmail()).isEqualTo(DEFAULT_EMAIL);
		assertThat(testReceiverSupplier.getPrimaryContactName()).isEqualTo(DEFAULT_PRIMARY_CONTACT_NAME);
		assertThat(testReceiverSupplier.getZip()).isEqualTo(DEFAULT_ZIP);
		assertThat(testReceiverSupplier.getPhonenumber()).isEqualTo(DEFAULT_PHONENUMBER);
		assertThat(testReceiverSupplier.getLatx()).isEqualTo(DEFAULT_LATX);
		assertThat(testReceiverSupplier.getLongy()).isEqualTo(DEFAULT_LONGY);
		assertThat(testReceiverSupplier.getCity()).isEqualTo(DEFAULT_CITY);
		assertThat(testReceiverSupplier.getState()).isEqualTo(DEFAULT_STATE);
		assertThat(testReceiverSupplier.getCountry()).isEqualTo(DEFAULT_COUNTRY);
		assertThat(testReceiverSupplier.getNpi()).isEqualTo(DEFAULT_NPI);
		assertThat(testReceiverSupplier.isIsReceiver()).isEqualTo(DEFAULT_IS_RECEIVER);
		assertThat(testReceiverSupplier.isIsSupplier()).isEqualTo(DEFAULT_IS_SUPPLIER);
		assertThat(testReceiverSupplier.isHasSterilization()).isEqualTo(DEFAULT_HAS_STERILIZATION);
		assertThat(testReceiverSupplier.getPriority()).isEqualTo(DEFAULT_PRIORITY);
		assertThat(testReceiverSupplier.getNotes()).isEqualTo(DEFAULT_NOTES);
		assertThat(testReceiverSupplier.getTags()).isEqualTo(DEFAULT_TAGS);
	}

	@Test
	public void createReceiverSupplierWithExistingId() throws Exception {
		int databaseSizeBeforeCreate = receiverSupplierRepository.findAll().size();

		// Create the ReceiverSupplier with an existing ID
		receiverSupplier.setId("existing_id");

		// An entity with an existing ID cannot be created, so this API call must fail
		restReceiverSupplierMockMvc
				.perform(post("/api/receiver-suppliers").with(csrf()).contentType(MediaType.APPLICATION_JSON)
						.content(TestUtil.convertObjectToJsonBytes(receiverSupplier)))
				.andExpect(status().isBadRequest());

		// Validate the ReceiverSupplier in the database
		List<ReceiverSupplier> receiverSupplierList = receiverSupplierRepository.findAll();
		assertThat(receiverSupplierList).hasSize(databaseSizeBeforeCreate);
	}

	@Test
	public void checkNameIsRequired() throws Exception {
		int databaseSizeBeforeTest = receiverSupplierRepository.findAll().size();
		// set the field null
		receiverSupplier.setOrgName(null);

		// Create the ReceiverSupplier, which fails.

		restReceiverSupplierMockMvc
				.perform(post("/api/receiver-suppliers").with(csrf()).contentType(MediaType.APPLICATION_JSON)
						.content(TestUtil.convertObjectToJsonBytes(receiverSupplier)))
				.andExpect(status().isBadRequest());

		List<ReceiverSupplier> receiverSupplierList = receiverSupplierRepository.findAll();
		assertThat(receiverSupplierList).hasSize(databaseSizeBeforeTest);
	}

	@Test
	public void checkAddressIsRequired() throws Exception {
		int databaseSizeBeforeTest = receiverSupplierRepository.findAll().size();
		// set the field null
		receiverSupplier.setAddress(null);

		// Create the ReceiverSupplier, which fails.

		restReceiverSupplierMockMvc
				.perform(post("/api/receiver-suppliers").with(csrf()).contentType(MediaType.APPLICATION_JSON)
						.content(TestUtil.convertObjectToJsonBytes(receiverSupplier)))
				.andExpect(status().isBadRequest());

		List<ReceiverSupplier> receiverSupplierList = receiverSupplierRepository.findAll();
		assertThat(receiverSupplierList).hasSize(databaseSizeBeforeTest);
	}

	@Test
	public void checkEmailIsRequired() throws Exception {
		int databaseSizeBeforeTest = receiverSupplierRepository.findAll().size();
		// set the field null
		receiverSupplier.setEmail(null);

		// Create the ReceiverSupplier, which fails.

		restReceiverSupplierMockMvc
				.perform(post("/api/receiver-suppliers").with(csrf()).contentType(MediaType.APPLICATION_JSON)
						.content(TestUtil.convertObjectToJsonBytes(receiverSupplier)))
				.andExpect(status().isBadRequest());

		List<ReceiverSupplier> receiverSupplierList = receiverSupplierRepository.findAll();
		assertThat(receiverSupplierList).hasSize(databaseSizeBeforeTest);
	}

	@Test
	public void checkPrimaryContactNameIsRequired() throws Exception {
		int databaseSizeBeforeTest = receiverSupplierRepository.findAll().size();
		// set the field null
		receiverSupplier.setPrimaryContactName(null);

		// Create the ReceiverSupplier, which fails.

		restReceiverSupplierMockMvc
				.perform(post("/api/receiver-suppliers").with(csrf()).contentType(MediaType.APPLICATION_JSON)
						.content(TestUtil.convertObjectToJsonBytes(receiverSupplier)))
				.andExpect(status().isBadRequest());

		List<ReceiverSupplier> receiverSupplierList = receiverSupplierRepository.findAll();
		assertThat(receiverSupplierList).hasSize(databaseSizeBeforeTest);
	}

	@Test
	public void checkZipIsRequired() throws Exception {
		int databaseSizeBeforeTest = receiverSupplierRepository.findAll().size();
		// set the field null
		receiverSupplier.setZip(null);

		// Create the ReceiverSupplier, which fails.

		restReceiverSupplierMockMvc
				.perform(post("/api/receiver-suppliers").with(csrf()).contentType(MediaType.APPLICATION_JSON)
						.content(TestUtil.convertObjectToJsonBytes(receiverSupplier)))
				.andExpect(status().isBadRequest());

		List<ReceiverSupplier> receiverSupplierList = receiverSupplierRepository.findAll();
		assertThat(receiverSupplierList).hasSize(databaseSizeBeforeTest);
	}

	@Test
	public void checkPhonenumberIsRequired() throws Exception {
		int databaseSizeBeforeTest = receiverSupplierRepository.findAll().size();
		// set the field null
		receiverSupplier.setPhonenumber(null);

		// Create the ReceiverSupplier, which fails.

		restReceiverSupplierMockMvc
				.perform(post("/api/receiver-suppliers").with(csrf()).contentType(MediaType.APPLICATION_JSON)
						.content(TestUtil.convertObjectToJsonBytes(receiverSupplier)))
				.andExpect(status().isBadRequest());

		List<ReceiverSupplier> receiverSupplierList = receiverSupplierRepository.findAll();
		assertThat(receiverSupplierList).hasSize(databaseSizeBeforeTest);
	}

	@Test
	public void checkCityIsRequired() throws Exception {
		int databaseSizeBeforeTest = receiverSupplierRepository.findAll().size();
		// set the field null
		receiverSupplier.setCity(null);

		// Create the ReceiverSupplier, which fails.

		restReceiverSupplierMockMvc
				.perform(post("/api/receiver-suppliers").with(csrf()).contentType(MediaType.APPLICATION_JSON)
						.content(TestUtil.convertObjectToJsonBytes(receiverSupplier)))
				.andExpect(status().isBadRequest());

		List<ReceiverSupplier> receiverSupplierList = receiverSupplierRepository.findAll();
		assertThat(receiverSupplierList).hasSize(databaseSizeBeforeTest);
	}

	@Test
	public void checkStateIsRequired() throws Exception {
		int databaseSizeBeforeTest = receiverSupplierRepository.findAll().size();
		// set the field null
		receiverSupplier.setState(null);

		// Create the ReceiverSupplier, which fails.

		restReceiverSupplierMockMvc
				.perform(post("/api/receiver-suppliers").with(csrf()).contentType(MediaType.APPLICATION_JSON)
						.content(TestUtil.convertObjectToJsonBytes(receiverSupplier)))
				.andExpect(status().isBadRequest());

		List<ReceiverSupplier> receiverSupplierList = receiverSupplierRepository.findAll();
		assertThat(receiverSupplierList).hasSize(databaseSizeBeforeTest);
	}

	@Test
	public void checkCountryIsRequired() throws Exception {
		int databaseSizeBeforeTest = receiverSupplierRepository.findAll().size();
		// set the field null
		receiverSupplier.setCountry(null);

		// Create the ReceiverSupplier, which fails.

		restReceiverSupplierMockMvc
				.perform(post("/api/receiver-suppliers").with(csrf()).contentType(MediaType.APPLICATION_JSON)
						.content(TestUtil.convertObjectToJsonBytes(receiverSupplier)))
				.andExpect(status().isBadRequest());

		List<ReceiverSupplier> receiverSupplierList = receiverSupplierRepository.findAll();
		assertThat(receiverSupplierList).hasSize(databaseSizeBeforeTest);
	}

	@Test
	public void getAllReceiverSuppliers() throws Exception {
		// Initialize the database
		receiverSupplierRepository.save(receiverSupplier);

		// Get all the receiverSupplierList
		restReceiverSupplierMockMvc.perform(get("/api/receiver-suppliers?sort=id,desc")).andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
				.andExpect(jsonPath("$.[*].id").value(hasItem(receiverSupplier.getId())))
				.andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
				.andExpect(jsonPath("$.[*].address").value(hasItem(DEFAULT_ADDRESS)))
				.andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
				.andExpect(jsonPath("$.[*].primaryContactName").value(hasItem(DEFAULT_PRIMARY_CONTACT_NAME)))
				.andExpect(jsonPath("$.[*].zip").value(hasItem(DEFAULT_ZIP)))
				.andExpect(jsonPath("$.[*].phonenumber").value(hasItem(DEFAULT_PHONENUMBER)))
				.andExpect(jsonPath("$.[*].latx").value(hasItem(DEFAULT_LATX.doubleValue())))
				.andExpect(jsonPath("$.[*].longy").value(hasItem(DEFAULT_LONGY.doubleValue())))
				.andExpect(jsonPath("$.[*].city").value(hasItem(DEFAULT_CITY)))
				.andExpect(jsonPath("$.[*].state").value(hasItem(DEFAULT_STATE)))
				.andExpect(jsonPath("$.[*].country").value(hasItem(DEFAULT_COUNTRY)))
				.andExpect(jsonPath("$.[*].npi").value(hasItem(DEFAULT_NPI)))
				.andExpect(jsonPath("$.[*].isReceiver").value(hasItem(DEFAULT_IS_RECEIVER.booleanValue())))
				.andExpect(jsonPath("$.[*].isSupplier").value(hasItem(DEFAULT_IS_SUPPLIER.booleanValue())))
				.andExpect(jsonPath("$.[*].hasSterilization").value(hasItem(DEFAULT_HAS_STERILIZATION.booleanValue())))
				.andExpect(jsonPath("$.[*].priority").value(hasItem(DEFAULT_PRIORITY)))
				.andExpect(jsonPath("$.[*].notes").value(hasItem(DEFAULT_NOTES)))
				.andExpect(jsonPath("$.[*].tags").value(hasItem(DEFAULT_TAGS)));
	}

	@Test
	public void getReceiverSupplier() throws Exception {
		// Initialize the database
		receiverSupplierRepository.save(receiverSupplier);

		// Get the receiverSupplier
		restReceiverSupplierMockMvc.perform(get("/api/receiver-suppliers/{id}", receiverSupplier.getId()))
				.andExpect(status().isOk()).andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
				.andExpect(jsonPath("$.id").value(receiverSupplier.getId()))
				.andExpect(jsonPath("$.name").value(DEFAULT_NAME))
				.andExpect(jsonPath("$.address").value(DEFAULT_ADDRESS))
				.andExpect(jsonPath("$.email").value(DEFAULT_EMAIL))
				.andExpect(jsonPath("$.primaryContactName").value(DEFAULT_PRIMARY_CONTACT_NAME))
				.andExpect(jsonPath("$.zip").value(DEFAULT_ZIP))
				.andExpect(jsonPath("$.phonenumber").value(DEFAULT_PHONENUMBER))
				.andExpect(jsonPath("$.latx").value(DEFAULT_LATX.doubleValue()))
				.andExpect(jsonPath("$.longy").value(DEFAULT_LONGY.doubleValue()))
				.andExpect(jsonPath("$.city").value(DEFAULT_CITY)).andExpect(jsonPath("$.state").value(DEFAULT_STATE))
				.andExpect(jsonPath("$.country").value(DEFAULT_COUNTRY)).andExpect(jsonPath("$.npi").value(DEFAULT_NPI))
				.andExpect(jsonPath("$.isReceiver").value(DEFAULT_IS_RECEIVER.booleanValue()))
				.andExpect(jsonPath("$.isSupplier").value(DEFAULT_IS_SUPPLIER.booleanValue()))
				.andExpect(jsonPath("$.hasSterilization").value(DEFAULT_HAS_STERILIZATION.booleanValue()))
				.andExpect(jsonPath("$.priority").value(DEFAULT_PRIORITY))
				.andExpect(jsonPath("$.notes").value(DEFAULT_NOTES)).andExpect(jsonPath("$.tags").value(DEFAULT_TAGS));
	}

	@Test
	public void getNonExistingReceiverSupplier() throws Exception {
		// Get the receiverSupplier
		restReceiverSupplierMockMvc.perform(get("/api/receiver-suppliers/{id}", Long.MAX_VALUE))
				.andExpect(status().isNotFound());
	}

	@Test
	public void updateReceiverSupplier() throws Exception {
		// Initialize the database
		receiverSupplierRepository.save(receiverSupplier);

		int databaseSizeBeforeUpdate = receiverSupplierRepository.findAll().size();

		// Update the receiverSupplier
		ReceiverSupplier updatedReceiverSupplier = receiverSupplierRepository.findById(receiverSupplier.getId()).get();
		updatedReceiverSupplier.orgName(UPDATED_NAME).address(UPDATED_ADDRESS).email(UPDATED_EMAIL)
				.primaryContactName(UPDATED_PRIMARY_CONTACT_NAME).zip(UPDATED_ZIP).phonenumber(UPDATED_PHONENUMBER)
				.latx(UPDATED_LATX).longy(UPDATED_LONGY).city(UPDATED_CITY).state(UPDATED_STATE)
				.country(UPDATED_COUNTRY).npi(UPDATED_NPI).isReceiver(UPDATED_IS_RECEIVER)
				.isSupplier(UPDATED_IS_SUPPLIER).hasSterilization(UPDATED_HAS_STERILIZATION).priority(UPDATED_PRIORITY)
				.notes(UPDATED_NOTES).tags(UPDATED_TAGS);

		restReceiverSupplierMockMvc
				.perform(put("/api/receiver-suppliers").with(csrf()).contentType(MediaType.APPLICATION_JSON)
						.content(TestUtil.convertObjectToJsonBytes(updatedReceiverSupplier)))
				.andExpect(status().isOk());

		// Validate the ReceiverSupplier in the database
		List<ReceiverSupplier> receiverSupplierList = receiverSupplierRepository.findAll();
		assertThat(receiverSupplierList).hasSize(databaseSizeBeforeUpdate);
		ReceiverSupplier testReceiverSupplier = receiverSupplierList.get(receiverSupplierList.size() - 1);
		assertThat(testReceiverSupplier.getOrgName()).isEqualTo(UPDATED_NAME);
		assertThat(testReceiverSupplier.getAddress()).isEqualTo(UPDATED_ADDRESS);
		assertThat(testReceiverSupplier.getEmail()).isEqualTo(UPDATED_EMAIL);
		assertThat(testReceiverSupplier.getPrimaryContactName()).isEqualTo(UPDATED_PRIMARY_CONTACT_NAME);
		assertThat(testReceiverSupplier.getZip()).isEqualTo(UPDATED_ZIP);
		assertThat(testReceiverSupplier.getPhonenumber()).isEqualTo(UPDATED_PHONENUMBER);
		assertThat(testReceiverSupplier.getLatx()).isEqualTo(UPDATED_LATX);
		assertThat(testReceiverSupplier.getLongy()).isEqualTo(UPDATED_LONGY);
		assertThat(testReceiverSupplier.getCity()).isEqualTo(UPDATED_CITY);
		assertThat(testReceiverSupplier.getState()).isEqualTo(UPDATED_STATE);
		assertThat(testReceiverSupplier.getCountry()).isEqualTo(UPDATED_COUNTRY);
		assertThat(testReceiverSupplier.getNpi()).isEqualTo(UPDATED_NPI);
		assertThat(testReceiverSupplier.isIsReceiver()).isEqualTo(UPDATED_IS_RECEIVER);
		assertThat(testReceiverSupplier.isIsSupplier()).isEqualTo(UPDATED_IS_SUPPLIER);
		assertThat(testReceiverSupplier.isHasSterilization()).isEqualTo(UPDATED_HAS_STERILIZATION);
		assertThat(testReceiverSupplier.getPriority()).isEqualTo(UPDATED_PRIORITY);
		assertThat(testReceiverSupplier.getNotes()).isEqualTo(UPDATED_NOTES);
		assertThat(testReceiverSupplier.getTags()).isEqualTo(UPDATED_TAGS);
	}

	@Test
	public void updateNonExistingReceiverSupplier() throws Exception {
		int databaseSizeBeforeUpdate = receiverSupplierRepository.findAll().size();

		// Create the ReceiverSupplier

		// If the entity doesn't have an ID, it will throw BadRequestAlertException
		restReceiverSupplierMockMvc
				.perform(put("/api/receiver-suppliers").with(csrf()).contentType(MediaType.APPLICATION_JSON)
						.content(TestUtil.convertObjectToJsonBytes(receiverSupplier)))
				.andExpect(status().isBadRequest());

		// Validate the ReceiverSupplier in the database
		List<ReceiverSupplier> receiverSupplierList = receiverSupplierRepository.findAll();
		assertThat(receiverSupplierList).hasSize(databaseSizeBeforeUpdate);
	}

	@Test
	public void deleteReceiverSupplier() throws Exception {
		// Initialize the database
		receiverSupplierRepository.save(receiverSupplier);

		int databaseSizeBeforeDelete = receiverSupplierRepository.findAll().size();

		// Delete the receiverSupplier
		restReceiverSupplierMockMvc.perform(delete("/api/receiver-suppliers/{id}", receiverSupplier.getId())
				.with(csrf()).accept(MediaType.APPLICATION_JSON)).andExpect(status().isNoContent());

		// Validate the database contains one less item
		List<ReceiverSupplier> receiverSupplierList = receiverSupplierRepository.findAll();
		assertThat(receiverSupplierList).hasSize(databaseSizeBeforeDelete - 1);
	}
}
