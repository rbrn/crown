package org.crown.web.rest;

import org.crown.CrownApp;
import org.crown.domain.RequestPoint;
import org.crown.repository.RequestPointRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link RequestPointResource} REST controller.
 */
@SpringBootTest(classes = CrownApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class RequestPointResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS = "BBBBBBBBBB";

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

    private static final Boolean DEFAULT_IS_DISTRIBUTOR = false;
    private static final Boolean UPDATED_IS_DISTRIBUTOR = true;

    private static final Boolean DEFAULT_IS_HEALTHCARE = false;
    private static final Boolean UPDATED_IS_HEALTHCARE = true;

    private static final Boolean DEFAULT_HAS_STERILIZATION = false;
    private static final Boolean UPDATED_HAS_STERILIZATION = true;

    private static final Integer DEFAULT_PRIORITY = 1;
    private static final Integer UPDATED_PRIORITY = 2;

    private static final String DEFAULT_NOTES = "AAAAAAAAAA";
    private static final String UPDATED_NOTES = "BBBBBBBBBB";

    @Autowired
    private RequestPointRepository requestPointRepository;


    @Autowired
    private MockMvc restRequestPointMockMvc;

    private RequestPoint requestPoint;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RequestPoint createEntity() {
        RequestPoint requestPoint = new RequestPoint()
            .name(DEFAULT_NAME)
            .address(DEFAULT_ADDRESS)
            .primaryContactName(DEFAULT_PRIMARY_CONTACT_NAME)
            .zip(DEFAULT_ZIP)
            .phonenumber(DEFAULT_PHONENUMBER)
            .latx(DEFAULT_LATX)
            .longy(DEFAULT_LONGY)
            .city(DEFAULT_CITY)
            .state(DEFAULT_STATE)
            .isDistributor(DEFAULT_IS_DISTRIBUTOR)
            .isHealthcare(DEFAULT_IS_HEALTHCARE)
            .hasSterilization(DEFAULT_HAS_STERILIZATION)
            .priority(DEFAULT_PRIORITY)
            .notes(DEFAULT_NOTES);
        return requestPoint;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RequestPoint createUpdatedEntity() {
        RequestPoint requestPoint = new RequestPoint()
            .name(UPDATED_NAME)
            .address(UPDATED_ADDRESS)
            .primaryContactName(UPDATED_PRIMARY_CONTACT_NAME)
            .zip(UPDATED_ZIP)
            .phonenumber(UPDATED_PHONENUMBER)
            .latx(UPDATED_LATX)
            .longy(UPDATED_LONGY)
            .city(UPDATED_CITY)
            .state(UPDATED_STATE)
            .isDistributor(UPDATED_IS_DISTRIBUTOR)
            .isHealthcare(UPDATED_IS_HEALTHCARE)
            .hasSterilization(UPDATED_HAS_STERILIZATION)
            .priority(UPDATED_PRIORITY)
            .notes(UPDATED_NOTES);
        return requestPoint;
    }

    @BeforeEach
    public void initTest() {
        requestPointRepository.deleteAll();
        requestPoint = createEntity();
    }

    @Test
    public void createRequestPoint() throws Exception {
        int databaseSizeBeforeCreate = requestPointRepository.findAll().size();

        // Create the RequestPoint
        restRequestPointMockMvc.perform(post("/api/request-points").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(requestPoint)))
            .andExpect(status().isCreated());

        // Validate the RequestPoint in the database
        List<RequestPoint> requestPointList = requestPointRepository.findAll();
        assertThat(requestPointList).hasSize(databaseSizeBeforeCreate + 1);
        RequestPoint testRequestPoint = requestPointList.get(requestPointList.size() - 1);
        assertThat(testRequestPoint.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testRequestPoint.getAddress()).isEqualTo(DEFAULT_ADDRESS);
        assertThat(testRequestPoint.getPrimaryContactName()).isEqualTo(DEFAULT_PRIMARY_CONTACT_NAME);
        assertThat(testRequestPoint.getZip()).isEqualTo(DEFAULT_ZIP);
        assertThat(testRequestPoint.getPhonenumber()).isEqualTo(DEFAULT_PHONENUMBER);
        assertThat(testRequestPoint.getLatx()).isEqualTo(DEFAULT_LATX);
        assertThat(testRequestPoint.getLongy()).isEqualTo(DEFAULT_LONGY);
        assertThat(testRequestPoint.getCity()).isEqualTo(DEFAULT_CITY);
        assertThat(testRequestPoint.getState()).isEqualTo(DEFAULT_STATE);
        assertThat(testRequestPoint.isIsDistributor()).isEqualTo(DEFAULT_IS_DISTRIBUTOR);
        assertThat(testRequestPoint.isIsHealthcare()).isEqualTo(DEFAULT_IS_HEALTHCARE);
        assertThat(testRequestPoint.isHasSterilization()).isEqualTo(DEFAULT_HAS_STERILIZATION);
        assertThat(testRequestPoint.getPriority()).isEqualTo(DEFAULT_PRIORITY);
        assertThat(testRequestPoint.getNotes()).isEqualTo(DEFAULT_NOTES);


    }

    @Test
    public void createRequestPointWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = requestPointRepository.findAll().size();

        // Create the RequestPoint with an existing ID
        requestPoint.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restRequestPointMockMvc.perform(post("/api/request-points").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(requestPoint)))
            .andExpect(status().isBadRequest());

        // Validate the RequestPoint in the database
        List<RequestPoint> requestPointList = requestPointRepository.findAll();
        assertThat(requestPointList).hasSize(databaseSizeBeforeCreate);

    }


    @Test
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = requestPointRepository.findAll().size();
        // set the field null
        requestPoint.setName(null);

        // Create the RequestPoint, which fails.

        restRequestPointMockMvc.perform(post("/api/request-points").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(requestPoint)))
            .andExpect(status().isBadRequest());

        List<RequestPoint> requestPointList = requestPointRepository.findAll();
        assertThat(requestPointList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkPrimaryContactNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = requestPointRepository.findAll().size();
        // set the field null
        requestPoint.setPrimaryContactName(null);

        // Create the RequestPoint, which fails.

        restRequestPointMockMvc.perform(post("/api/request-points").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(requestPoint)))
            .andExpect(status().isBadRequest());

        List<RequestPoint> requestPointList = requestPointRepository.findAll();
        assertThat(requestPointList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkZipIsRequired() throws Exception {
        int databaseSizeBeforeTest = requestPointRepository.findAll().size();
        // set the field null
        requestPoint.setZip(null);

        // Create the RequestPoint, which fails.

        restRequestPointMockMvc.perform(post("/api/request-points").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(requestPoint)))
            .andExpect(status().isBadRequest());

        List<RequestPoint> requestPointList = requestPointRepository.findAll();
        assertThat(requestPointList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllRequestPoints() throws Exception {
        // Initialize the database
        requestPointRepository.save(requestPoint);

        // Get all the requestPointList
        restRequestPointMockMvc.perform(get("/api/request-points?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(requestPoint.getId())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].address").value(hasItem(DEFAULT_ADDRESS)))
            .andExpect(jsonPath("$.[*].primaryContactName").value(hasItem(DEFAULT_PRIMARY_CONTACT_NAME)))
            .andExpect(jsonPath("$.[*].zip").value(hasItem(DEFAULT_ZIP)))
            .andExpect(jsonPath("$.[*].phonenumber").value(hasItem(DEFAULT_PHONENUMBER)))
            .andExpect(jsonPath("$.[*].latx").value(hasItem(DEFAULT_LATX.doubleValue())))
            .andExpect(jsonPath("$.[*].longy").value(hasItem(DEFAULT_LONGY.doubleValue())))
            .andExpect(jsonPath("$.[*].city").value(hasItem(DEFAULT_CITY)))
            .andExpect(jsonPath("$.[*].state").value(hasItem(DEFAULT_STATE)))
            .andExpect(jsonPath("$.[*].isDistributor").value(hasItem(DEFAULT_IS_DISTRIBUTOR.booleanValue())))
            .andExpect(jsonPath("$.[*].isHealthcare").value(hasItem(DEFAULT_IS_HEALTHCARE.booleanValue())))
            .andExpect(jsonPath("$.[*].hasSterilization").value(hasItem(DEFAULT_HAS_STERILIZATION.booleanValue())))
            .andExpect(jsonPath("$.[*].priority").value(hasItem(DEFAULT_PRIORITY)))
            .andExpect(jsonPath("$.[*].notes").value(hasItem(DEFAULT_NOTES)));
    }
    
    @Test
    public void getRequestPoint() throws Exception {
        // Initialize the database
        requestPointRepository.save(requestPoint);

        // Get the requestPoint
        restRequestPointMockMvc.perform(get("/api/request-points/{id}", requestPoint.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(requestPoint.getId()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.address").value(DEFAULT_ADDRESS))
            .andExpect(jsonPath("$.primaryContactName").value(DEFAULT_PRIMARY_CONTACT_NAME))
            .andExpect(jsonPath("$.zip").value(DEFAULT_ZIP))
            .andExpect(jsonPath("$.phonenumber").value(DEFAULT_PHONENUMBER))
            .andExpect(jsonPath("$.latx").value(DEFAULT_LATX.doubleValue()))
            .andExpect(jsonPath("$.longy").value(DEFAULT_LONGY.doubleValue()))
            .andExpect(jsonPath("$.city").value(DEFAULT_CITY))
            .andExpect(jsonPath("$.state").value(DEFAULT_STATE))
            .andExpect(jsonPath("$.isDistributor").value(DEFAULT_IS_DISTRIBUTOR.booleanValue()))
            .andExpect(jsonPath("$.isHealthcare").value(DEFAULT_IS_HEALTHCARE.booleanValue()))
            .andExpect(jsonPath("$.hasSterilization").value(DEFAULT_HAS_STERILIZATION.booleanValue()))
            .andExpect(jsonPath("$.priority").value(DEFAULT_PRIORITY))
            .andExpect(jsonPath("$.notes").value(DEFAULT_NOTES));
    }

    @Test
    public void getNonExistingRequestPoint() throws Exception {
        // Get the requestPoint
        restRequestPointMockMvc.perform(get("/api/request-points/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateRequestPoint() throws Exception {
        // Initialize the database
        requestPointRepository.save(requestPoint);

        int databaseSizeBeforeUpdate = requestPointRepository.findAll().size();

        // Update the requestPoint
        RequestPoint updatedRequestPoint = requestPointRepository.findById(requestPoint.getId()).get();
        updatedRequestPoint
            .name(UPDATED_NAME)
            .address(UPDATED_ADDRESS)
            .primaryContactName(UPDATED_PRIMARY_CONTACT_NAME)
            .zip(UPDATED_ZIP)
            .phonenumber(UPDATED_PHONENUMBER)
            .latx(UPDATED_LATX)
            .longy(UPDATED_LONGY)
            .city(UPDATED_CITY)
            .state(UPDATED_STATE)
            .isDistributor(UPDATED_IS_DISTRIBUTOR)
            .isHealthcare(UPDATED_IS_HEALTHCARE)
            .hasSterilization(UPDATED_HAS_STERILIZATION)
            .priority(UPDATED_PRIORITY)
            .notes(UPDATED_NOTES);

        restRequestPointMockMvc.perform(put("/api/request-points").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedRequestPoint)))
            .andExpect(status().isOk());

        // Validate the RequestPoint in the database
        List<RequestPoint> requestPointList = requestPointRepository.findAll();
        assertThat(requestPointList).hasSize(databaseSizeBeforeUpdate);
        RequestPoint testRequestPoint = requestPointList.get(requestPointList.size() - 1);
        assertThat(testRequestPoint.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testRequestPoint.getAddress()).isEqualTo(UPDATED_ADDRESS);
        assertThat(testRequestPoint.getPrimaryContactName()).isEqualTo(UPDATED_PRIMARY_CONTACT_NAME);
        assertThat(testRequestPoint.getZip()).isEqualTo(UPDATED_ZIP);
        assertThat(testRequestPoint.getPhonenumber()).isEqualTo(UPDATED_PHONENUMBER);
        assertThat(testRequestPoint.getLatx()).isEqualTo(UPDATED_LATX);
        assertThat(testRequestPoint.getLongy()).isEqualTo(UPDATED_LONGY);
        assertThat(testRequestPoint.getCity()).isEqualTo(UPDATED_CITY);
        assertThat(testRequestPoint.getState()).isEqualTo(UPDATED_STATE);
        assertThat(testRequestPoint.isIsDistributor()).isEqualTo(UPDATED_IS_DISTRIBUTOR);
        assertThat(testRequestPoint.isIsHealthcare()).isEqualTo(UPDATED_IS_HEALTHCARE);
        assertThat(testRequestPoint.isHasSterilization()).isEqualTo(UPDATED_HAS_STERILIZATION);
        assertThat(testRequestPoint.getPriority()).isEqualTo(UPDATED_PRIORITY);
        assertThat(testRequestPoint.getNotes()).isEqualTo(UPDATED_NOTES);
    }

    @Test
    public void updateNonExistingRequestPoint() throws Exception {
        int databaseSizeBeforeUpdate = requestPointRepository.findAll().size();

        // Create the RequestPoint

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRequestPointMockMvc.perform(put("/api/request-points").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(requestPoint)))
            .andExpect(status().isBadRequest());

        // Validate the RequestPoint in the database
        List<RequestPoint> requestPointList = requestPointRepository.findAll();
        assertThat(requestPointList).hasSize(databaseSizeBeforeUpdate);

    }

    @Test
    public void deleteRequestPoint() throws Exception {
        // Initialize the database
        requestPointRepository.save(requestPoint);

        int databaseSizeBeforeDelete = requestPointRepository.findAll().size();

        // Delete the requestPoint
        restRequestPointMockMvc.perform(delete("/api/request-points/{id}", requestPoint.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<RequestPoint> requestPointList = requestPointRepository.findAll();
        assertThat(requestPointList).hasSize(databaseSizeBeforeDelete - 1);

    }

}
