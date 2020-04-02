package org.crown.web.rest;

import org.crown.CrownApp;
import org.crown.domain.RecieverSupplier;
import org.crown.repository.RecieverSupplierRepository;
import org.crown.repository.search.RecieverSupplierSearchRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link RecieverSupplierResource} REST controller.
 */
@SpringBootTest(classes = CrownApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class RecieverSupplierResourceIT {

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

    @Autowired
    private RecieverSupplierRepository recieverSupplierRepository;

    /**
     * This repository is mocked in the org.crown.repository.search test package.
     *
     * @see org.crown.repository.search.RecieverSupplierSearchRepositoryMockConfiguration
     */
    @Autowired
    private RecieverSupplierSearchRepository mockRecieverSupplierSearchRepository;

    @Autowired
    private MockMvc restRecieverSupplierMockMvc;

    private RecieverSupplier recieverSupplier;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RecieverSupplier createEntity() {
        RecieverSupplier recieverSupplier = new RecieverSupplier()
            .name(DEFAULT_NAME)
            .address(DEFAULT_ADDRESS)
            .email(DEFAULT_EMAIL)
            .primaryContactName(DEFAULT_PRIMARY_CONTACT_NAME)
            .zip(DEFAULT_ZIP)
            .phonenumber(DEFAULT_PHONENUMBER)
            .latx(DEFAULT_LATX)
            .longy(DEFAULT_LONGY)
            .city(DEFAULT_CITY)
            .state(DEFAULT_STATE)
            .country(DEFAULT_COUNTRY)
            .npi(DEFAULT_NPI)
            .isReceiver(DEFAULT_IS_RECEIVER)
            .isSupplier(DEFAULT_IS_SUPPLIER)
            .hasSterilization(DEFAULT_HAS_STERILIZATION)
            .priority(DEFAULT_PRIORITY)
            .notes(DEFAULT_NOTES);
        return recieverSupplier;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RecieverSupplier createUpdatedEntity() {
        RecieverSupplier recieverSupplier = new RecieverSupplier()
            .name(UPDATED_NAME)
            .address(UPDATED_ADDRESS)
            .email(UPDATED_EMAIL)
            .primaryContactName(UPDATED_PRIMARY_CONTACT_NAME)
            .zip(UPDATED_ZIP)
            .phonenumber(UPDATED_PHONENUMBER)
            .latx(UPDATED_LATX)
            .longy(UPDATED_LONGY)
            .city(UPDATED_CITY)
            .state(UPDATED_STATE)
            .country(UPDATED_COUNTRY)
            .npi(UPDATED_NPI)
            .isReceiver(UPDATED_IS_RECEIVER)
            .isSupplier(UPDATED_IS_SUPPLIER)
            .hasSterilization(UPDATED_HAS_STERILIZATION)
            .priority(UPDATED_PRIORITY)
            .notes(UPDATED_NOTES);
        return recieverSupplier;
    }

    @BeforeEach
    public void initTest() {
        recieverSupplierRepository.deleteAll();
        recieverSupplier = createEntity();
    }

    @Test
    public void createRecieverSupplier() throws Exception {
        int databaseSizeBeforeCreate = recieverSupplierRepository.findAll().size();

        // Create the RecieverSupplier
        restRecieverSupplierMockMvc.perform(post("/api/reciever-suppliers").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(recieverSupplier)))
            .andExpect(status().isCreated());

        // Validate the RecieverSupplier in the database
        List<RecieverSupplier> recieverSupplierList = recieverSupplierRepository.findAll();
        assertThat(recieverSupplierList).hasSize(databaseSizeBeforeCreate + 1);
        RecieverSupplier testRecieverSupplier = recieverSupplierList.get(recieverSupplierList.size() - 1);
        assertThat(testRecieverSupplier.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testRecieverSupplier.getAddress()).isEqualTo(DEFAULT_ADDRESS);
        assertThat(testRecieverSupplier.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testRecieverSupplier.getPrimaryContactName()).isEqualTo(DEFAULT_PRIMARY_CONTACT_NAME);
        assertThat(testRecieverSupplier.getZip()).isEqualTo(DEFAULT_ZIP);
        assertThat(testRecieverSupplier.getPhonenumber()).isEqualTo(DEFAULT_PHONENUMBER);
        assertThat(testRecieverSupplier.getLatx()).isEqualTo(DEFAULT_LATX);
        assertThat(testRecieverSupplier.getLongy()).isEqualTo(DEFAULT_LONGY);
        assertThat(testRecieverSupplier.getCity()).isEqualTo(DEFAULT_CITY);
        assertThat(testRecieverSupplier.getState()).isEqualTo(DEFAULT_STATE);
        assertThat(testRecieverSupplier.getCountry()).isEqualTo(DEFAULT_COUNTRY);
        assertThat(testRecieverSupplier.getNpi()).isEqualTo(DEFAULT_NPI);
        assertThat(testRecieverSupplier.isIsReceiver()).isEqualTo(DEFAULT_IS_RECEIVER);
        assertThat(testRecieverSupplier.isIsSupplier()).isEqualTo(DEFAULT_IS_SUPPLIER);
        assertThat(testRecieverSupplier.isHasSterilization()).isEqualTo(DEFAULT_HAS_STERILIZATION);
        assertThat(testRecieverSupplier.getPriority()).isEqualTo(DEFAULT_PRIORITY);
        assertThat(testRecieverSupplier.getNotes()).isEqualTo(DEFAULT_NOTES);

        // Validate the RecieverSupplier in Elasticsearch
        verify(mockRecieverSupplierSearchRepository, times(1)).save(testRecieverSupplier);
    }

    @Test
    public void createRecieverSupplierWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = recieverSupplierRepository.findAll().size();

        // Create the RecieverSupplier with an existing ID
        recieverSupplier.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restRecieverSupplierMockMvc.perform(post("/api/reciever-suppliers").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(recieverSupplier)))
            .andExpect(status().isBadRequest());

        // Validate the RecieverSupplier in the database
        List<RecieverSupplier> recieverSupplierList = recieverSupplierRepository.findAll();
        assertThat(recieverSupplierList).hasSize(databaseSizeBeforeCreate);

        // Validate the RecieverSupplier in Elasticsearch
        verify(mockRecieverSupplierSearchRepository, times(0)).save(recieverSupplier);
    }


    @Test
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = recieverSupplierRepository.findAll().size();
        // set the field null
        recieverSupplier.setName(null);

        // Create the RecieverSupplier, which fails.

        restRecieverSupplierMockMvc.perform(post("/api/reciever-suppliers").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(recieverSupplier)))
            .andExpect(status().isBadRequest());

        List<RecieverSupplier> recieverSupplierList = recieverSupplierRepository.findAll();
        assertThat(recieverSupplierList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkAddressIsRequired() throws Exception {
        int databaseSizeBeforeTest = recieverSupplierRepository.findAll().size();
        // set the field null
        recieverSupplier.setAddress(null);

        // Create the RecieverSupplier, which fails.

        restRecieverSupplierMockMvc.perform(post("/api/reciever-suppliers").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(recieverSupplier)))
            .andExpect(status().isBadRequest());

        List<RecieverSupplier> recieverSupplierList = recieverSupplierRepository.findAll();
        assertThat(recieverSupplierList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = recieverSupplierRepository.findAll().size();
        // set the field null
        recieverSupplier.setEmail(null);

        // Create the RecieverSupplier, which fails.

        restRecieverSupplierMockMvc.perform(post("/api/reciever-suppliers").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(recieverSupplier)))
            .andExpect(status().isBadRequest());

        List<RecieverSupplier> recieverSupplierList = recieverSupplierRepository.findAll();
        assertThat(recieverSupplierList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkPrimaryContactNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = recieverSupplierRepository.findAll().size();
        // set the field null
        recieverSupplier.setPrimaryContactName(null);

        // Create the RecieverSupplier, which fails.

        restRecieverSupplierMockMvc.perform(post("/api/reciever-suppliers").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(recieverSupplier)))
            .andExpect(status().isBadRequest());

        List<RecieverSupplier> recieverSupplierList = recieverSupplierRepository.findAll();
        assertThat(recieverSupplierList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkZipIsRequired() throws Exception {
        int databaseSizeBeforeTest = recieverSupplierRepository.findAll().size();
        // set the field null
        recieverSupplier.setZip(null);

        // Create the RecieverSupplier, which fails.

        restRecieverSupplierMockMvc.perform(post("/api/reciever-suppliers").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(recieverSupplier)))
            .andExpect(status().isBadRequest());

        List<RecieverSupplier> recieverSupplierList = recieverSupplierRepository.findAll();
        assertThat(recieverSupplierList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkPhonenumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = recieverSupplierRepository.findAll().size();
        // set the field null
        recieverSupplier.setPhonenumber(null);

        // Create the RecieverSupplier, which fails.

        restRecieverSupplierMockMvc.perform(post("/api/reciever-suppliers").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(recieverSupplier)))
            .andExpect(status().isBadRequest());

        List<RecieverSupplier> recieverSupplierList = recieverSupplierRepository.findAll();
        assertThat(recieverSupplierList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkCityIsRequired() throws Exception {
        int databaseSizeBeforeTest = recieverSupplierRepository.findAll().size();
        // set the field null
        recieverSupplier.setCity(null);

        // Create the RecieverSupplier, which fails.

        restRecieverSupplierMockMvc.perform(post("/api/reciever-suppliers").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(recieverSupplier)))
            .andExpect(status().isBadRequest());

        List<RecieverSupplier> recieverSupplierList = recieverSupplierRepository.findAll();
        assertThat(recieverSupplierList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkStateIsRequired() throws Exception {
        int databaseSizeBeforeTest = recieverSupplierRepository.findAll().size();
        // set the field null
        recieverSupplier.setState(null);

        // Create the RecieverSupplier, which fails.

        restRecieverSupplierMockMvc.perform(post("/api/reciever-suppliers").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(recieverSupplier)))
            .andExpect(status().isBadRequest());

        List<RecieverSupplier> recieverSupplierList = recieverSupplierRepository.findAll();
        assertThat(recieverSupplierList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkCountryIsRequired() throws Exception {
        int databaseSizeBeforeTest = recieverSupplierRepository.findAll().size();
        // set the field null
        recieverSupplier.setCountry(null);

        // Create the RecieverSupplier, which fails.

        restRecieverSupplierMockMvc.perform(post("/api/reciever-suppliers").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(recieverSupplier)))
            .andExpect(status().isBadRequest());

        List<RecieverSupplier> recieverSupplierList = recieverSupplierRepository.findAll();
        assertThat(recieverSupplierList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllRecieverSuppliers() throws Exception {
        // Initialize the database
        recieverSupplierRepository.save(recieverSupplier);

        // Get all the recieverSupplierList
        restRecieverSupplierMockMvc.perform(get("/api/reciever-suppliers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(recieverSupplier.getId())))
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
            .andExpect(jsonPath("$.[*].notes").value(hasItem(DEFAULT_NOTES)));
    }
    
    @Test
    public void getRecieverSupplier() throws Exception {
        // Initialize the database
        recieverSupplierRepository.save(recieverSupplier);

        // Get the recieverSupplier
        restRecieverSupplierMockMvc.perform(get("/api/reciever-suppliers/{id}", recieverSupplier.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(recieverSupplier.getId()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.address").value(DEFAULT_ADDRESS))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL))
            .andExpect(jsonPath("$.primaryContactName").value(DEFAULT_PRIMARY_CONTACT_NAME))
            .andExpect(jsonPath("$.zip").value(DEFAULT_ZIP))
            .andExpect(jsonPath("$.phonenumber").value(DEFAULT_PHONENUMBER))
            .andExpect(jsonPath("$.latx").value(DEFAULT_LATX.doubleValue()))
            .andExpect(jsonPath("$.longy").value(DEFAULT_LONGY.doubleValue()))
            .andExpect(jsonPath("$.city").value(DEFAULT_CITY))
            .andExpect(jsonPath("$.state").value(DEFAULT_STATE))
            .andExpect(jsonPath("$.country").value(DEFAULT_COUNTRY))
            .andExpect(jsonPath("$.npi").value(DEFAULT_NPI))
            .andExpect(jsonPath("$.isReceiver").value(DEFAULT_IS_RECEIVER.booleanValue()))
            .andExpect(jsonPath("$.isSupplier").value(DEFAULT_IS_SUPPLIER.booleanValue()))
            .andExpect(jsonPath("$.hasSterilization").value(DEFAULT_HAS_STERILIZATION.booleanValue()))
            .andExpect(jsonPath("$.priority").value(DEFAULT_PRIORITY))
            .andExpect(jsonPath("$.notes").value(DEFAULT_NOTES));
    }

    @Test
    public void getNonExistingRecieverSupplier() throws Exception {
        // Get the recieverSupplier
        restRecieverSupplierMockMvc.perform(get("/api/reciever-suppliers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateRecieverSupplier() throws Exception {
        // Initialize the database
        recieverSupplierRepository.save(recieverSupplier);

        int databaseSizeBeforeUpdate = recieverSupplierRepository.findAll().size();

        // Update the recieverSupplier
        RecieverSupplier updatedRecieverSupplier = recieverSupplierRepository.findById(recieverSupplier.getId()).get();
        updatedRecieverSupplier
            .name(UPDATED_NAME)
            .address(UPDATED_ADDRESS)
            .email(UPDATED_EMAIL)
            .primaryContactName(UPDATED_PRIMARY_CONTACT_NAME)
            .zip(UPDATED_ZIP)
            .phonenumber(UPDATED_PHONENUMBER)
            .latx(UPDATED_LATX)
            .longy(UPDATED_LONGY)
            .city(UPDATED_CITY)
            .state(UPDATED_STATE)
            .country(UPDATED_COUNTRY)
            .npi(UPDATED_NPI)
            .isReceiver(UPDATED_IS_RECEIVER)
            .isSupplier(UPDATED_IS_SUPPLIER)
            .hasSterilization(UPDATED_HAS_STERILIZATION)
            .priority(UPDATED_PRIORITY)
            .notes(UPDATED_NOTES);

        restRecieverSupplierMockMvc.perform(put("/api/reciever-suppliers").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedRecieverSupplier)))
            .andExpect(status().isOk());

        // Validate the RecieverSupplier in the database
        List<RecieverSupplier> recieverSupplierList = recieverSupplierRepository.findAll();
        assertThat(recieverSupplierList).hasSize(databaseSizeBeforeUpdate);
        RecieverSupplier testRecieverSupplier = recieverSupplierList.get(recieverSupplierList.size() - 1);
        assertThat(testRecieverSupplier.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testRecieverSupplier.getAddress()).isEqualTo(UPDATED_ADDRESS);
        assertThat(testRecieverSupplier.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testRecieverSupplier.getPrimaryContactName()).isEqualTo(UPDATED_PRIMARY_CONTACT_NAME);
        assertThat(testRecieverSupplier.getZip()).isEqualTo(UPDATED_ZIP);
        assertThat(testRecieverSupplier.getPhonenumber()).isEqualTo(UPDATED_PHONENUMBER);
        assertThat(testRecieverSupplier.getLatx()).isEqualTo(UPDATED_LATX);
        assertThat(testRecieverSupplier.getLongy()).isEqualTo(UPDATED_LONGY);
        assertThat(testRecieverSupplier.getCity()).isEqualTo(UPDATED_CITY);
        assertThat(testRecieverSupplier.getState()).isEqualTo(UPDATED_STATE);
        assertThat(testRecieverSupplier.getCountry()).isEqualTo(UPDATED_COUNTRY);
        assertThat(testRecieverSupplier.getNpi()).isEqualTo(UPDATED_NPI);
        assertThat(testRecieverSupplier.isIsReceiver()).isEqualTo(UPDATED_IS_RECEIVER);
        assertThat(testRecieverSupplier.isIsSupplier()).isEqualTo(UPDATED_IS_SUPPLIER);
        assertThat(testRecieverSupplier.isHasSterilization()).isEqualTo(UPDATED_HAS_STERILIZATION);
        assertThat(testRecieverSupplier.getPriority()).isEqualTo(UPDATED_PRIORITY);
        assertThat(testRecieverSupplier.getNotes()).isEqualTo(UPDATED_NOTES);

        // Validate the RecieverSupplier in Elasticsearch
        verify(mockRecieverSupplierSearchRepository, times(1)).save(testRecieverSupplier);
    }

    @Test
    public void updateNonExistingRecieverSupplier() throws Exception {
        int databaseSizeBeforeUpdate = recieverSupplierRepository.findAll().size();

        // Create the RecieverSupplier

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRecieverSupplierMockMvc.perform(put("/api/reciever-suppliers").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(recieverSupplier)))
            .andExpect(status().isBadRequest());

        // Validate the RecieverSupplier in the database
        List<RecieverSupplier> recieverSupplierList = recieverSupplierRepository.findAll();
        assertThat(recieverSupplierList).hasSize(databaseSizeBeforeUpdate);

        // Validate the RecieverSupplier in Elasticsearch
        verify(mockRecieverSupplierSearchRepository, times(0)).save(recieverSupplier);
    }

    @Test
    public void deleteRecieverSupplier() throws Exception {
        // Initialize the database
        recieverSupplierRepository.save(recieverSupplier);

        int databaseSizeBeforeDelete = recieverSupplierRepository.findAll().size();

        // Delete the recieverSupplier
        restRecieverSupplierMockMvc.perform(delete("/api/reciever-suppliers/{id}", recieverSupplier.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<RecieverSupplier> recieverSupplierList = recieverSupplierRepository.findAll();
        assertThat(recieverSupplierList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the RecieverSupplier in Elasticsearch
        verify(mockRecieverSupplierSearchRepository, times(1)).deleteById(recieverSupplier.getId());
    }

    @Test
    public void searchRecieverSupplier() throws Exception {
        // Initialize the database
        recieverSupplierRepository.save(recieverSupplier);
        when(mockRecieverSupplierSearchRepository.search(queryStringQuery("id:" + recieverSupplier.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(recieverSupplier), PageRequest.of(0, 1), 1));
        // Search the recieverSupplier
        restRecieverSupplierMockMvc.perform(get("/api/_search/reciever-suppliers?query=id:" + recieverSupplier.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(recieverSupplier.getId())))
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
            .andExpect(jsonPath("$.[*].notes").value(hasItem(DEFAULT_NOTES)));
    }
}
