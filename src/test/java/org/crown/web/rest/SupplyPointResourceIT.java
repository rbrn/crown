package org.crown.web.rest;

import org.crown.CrownApp;
import org.crown.domain.SupplyPoint;
import org.crown.repository.SupplyPointRepository;

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
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link SupplyPointResource} REST controller.
 */
@SpringBootTest(classes = CrownApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class SupplyPointResourceIT {

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
    private SupplyPointRepository supplyPointRepository;


    @Autowired
    private MockMvc restSupplyPointMockMvc;

    private SupplyPoint supplyPoint;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SupplyPoint createEntity() {
        SupplyPoint supplyPoint = new SupplyPoint()
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
        return supplyPoint;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SupplyPoint createUpdatedEntity() {
        SupplyPoint supplyPoint = new SupplyPoint()
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
        return supplyPoint;
    }

    @BeforeEach
    public void initTest() {
        supplyPointRepository.deleteAll();
        supplyPoint = createEntity();
    }

    @Test
    public void createSupplyPoint() throws Exception {
        int databaseSizeBeforeCreate = supplyPointRepository.findAll().size();

        // Create the SupplyPoint
        restSupplyPointMockMvc.perform(post("/api/supply-points").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(supplyPoint)))
            .andExpect(status().isCreated());

        // Validate the SupplyPoint in the database
        List<SupplyPoint> supplyPointList = supplyPointRepository.findAll();
        assertThat(supplyPointList).hasSize(databaseSizeBeforeCreate + 1);
        SupplyPoint testSupplyPoint = supplyPointList.get(supplyPointList.size() - 1);
        assertThat(testSupplyPoint.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testSupplyPoint.getAddress()).isEqualTo(DEFAULT_ADDRESS);
        assertThat(testSupplyPoint.getPrimaryContactName()).isEqualTo(DEFAULT_PRIMARY_CONTACT_NAME);
        assertThat(testSupplyPoint.getZip()).isEqualTo(DEFAULT_ZIP);
        assertThat(testSupplyPoint.getPhonenumber()).isEqualTo(DEFAULT_PHONENUMBER);
        assertThat(testSupplyPoint.getLatx()).isEqualTo(DEFAULT_LATX);
        assertThat(testSupplyPoint.getLongy()).isEqualTo(DEFAULT_LONGY);
        assertThat(testSupplyPoint.getCity()).isEqualTo(DEFAULT_CITY);
        assertThat(testSupplyPoint.getState()).isEqualTo(DEFAULT_STATE);
        assertThat(testSupplyPoint.isIsDistributor()).isEqualTo(DEFAULT_IS_DISTRIBUTOR);
        assertThat(testSupplyPoint.isIsHealthcare()).isEqualTo(DEFAULT_IS_HEALTHCARE);
        assertThat(testSupplyPoint.isHasSterilization()).isEqualTo(DEFAULT_HAS_STERILIZATION);
        assertThat(testSupplyPoint.getPriority()).isEqualTo(DEFAULT_PRIORITY);
        assertThat(testSupplyPoint.getNotes()).isEqualTo(DEFAULT_NOTES);

    }

    @Test
    public void createSupplyPointWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = supplyPointRepository.findAll().size();

        // Create the SupplyPoint with an existing ID
        supplyPoint.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restSupplyPointMockMvc.perform(post("/api/supply-points").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(supplyPoint)))
            .andExpect(status().isBadRequest());

        // Validate the SupplyPoint in the database
        List<SupplyPoint> supplyPointList = supplyPointRepository.findAll();
        assertThat(supplyPointList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = supplyPointRepository.findAll().size();
        // set the field null
        supplyPoint.setName(null);

        // Create the SupplyPoint, which fails.

        restSupplyPointMockMvc.perform(post("/api/supply-points").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(supplyPoint)))
            .andExpect(status().isBadRequest());

        List<SupplyPoint> supplyPointList = supplyPointRepository.findAll();
        assertThat(supplyPointList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkPrimaryContactNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = supplyPointRepository.findAll().size();
        // set the field null
        supplyPoint.setPrimaryContactName(null);

        // Create the SupplyPoint, which fails.

        restSupplyPointMockMvc.perform(post("/api/supply-points").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(supplyPoint)))
            .andExpect(status().isBadRequest());

        List<SupplyPoint> supplyPointList = supplyPointRepository.findAll();
        assertThat(supplyPointList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkZipIsRequired() throws Exception {
        int databaseSizeBeforeTest = supplyPointRepository.findAll().size();
        // set the field null
        supplyPoint.setZip(null);

        // Create the SupplyPoint, which fails.

        restSupplyPointMockMvc.perform(post("/api/supply-points").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(supplyPoint)))
            .andExpect(status().isBadRequest());

        List<SupplyPoint> supplyPointList = supplyPointRepository.findAll();
        assertThat(supplyPointList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllSupplyPoints() throws Exception {
        // Initialize the database
        supplyPointRepository.save(supplyPoint);

        // Get all the supplyPointList
        restSupplyPointMockMvc.perform(get("/api/supply-points?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(supplyPoint.getId())))
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
    public void getSupplyPoint() throws Exception {
        // Initialize the database
        supplyPointRepository.save(supplyPoint);

        // Get the supplyPoint
        restSupplyPointMockMvc.perform(get("/api/supply-points/{id}", supplyPoint.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(supplyPoint.getId()))
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
    public void getNonExistingSupplyPoint() throws Exception {
        // Get the supplyPoint
        restSupplyPointMockMvc.perform(get("/api/supply-points/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateSupplyPoint() throws Exception {
        // Initialize the database
        supplyPointRepository.save(supplyPoint);

        int databaseSizeBeforeUpdate = supplyPointRepository.findAll().size();

        // Update the supplyPoint
        SupplyPoint updatedSupplyPoint = supplyPointRepository.findById(supplyPoint.getId()).get();
        updatedSupplyPoint
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

        restSupplyPointMockMvc.perform(put("/api/supply-points").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedSupplyPoint)))
            .andExpect(status().isOk());

        // Validate the SupplyPoint in the database
        List<SupplyPoint> supplyPointList = supplyPointRepository.findAll();
        assertThat(supplyPointList).hasSize(databaseSizeBeforeUpdate);
        SupplyPoint testSupplyPoint = supplyPointList.get(supplyPointList.size() - 1);
        assertThat(testSupplyPoint.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testSupplyPoint.getAddress()).isEqualTo(UPDATED_ADDRESS);
        assertThat(testSupplyPoint.getPrimaryContactName()).isEqualTo(UPDATED_PRIMARY_CONTACT_NAME);
        assertThat(testSupplyPoint.getZip()).isEqualTo(UPDATED_ZIP);
        assertThat(testSupplyPoint.getPhonenumber()).isEqualTo(UPDATED_PHONENUMBER);
        assertThat(testSupplyPoint.getLatx()).isEqualTo(UPDATED_LATX);
        assertThat(testSupplyPoint.getLongy()).isEqualTo(UPDATED_LONGY);
        assertThat(testSupplyPoint.getCity()).isEqualTo(UPDATED_CITY);
        assertThat(testSupplyPoint.getState()).isEqualTo(UPDATED_STATE);
        assertThat(testSupplyPoint.isIsDistributor()).isEqualTo(UPDATED_IS_DISTRIBUTOR);
        assertThat(testSupplyPoint.isIsHealthcare()).isEqualTo(UPDATED_IS_HEALTHCARE);
        assertThat(testSupplyPoint.isHasSterilization()).isEqualTo(UPDATED_HAS_STERILIZATION);
        assertThat(testSupplyPoint.getPriority()).isEqualTo(UPDATED_PRIORITY);
        assertThat(testSupplyPoint.getNotes()).isEqualTo(UPDATED_NOTES);

    }

    @Test
    public void updateNonExistingSupplyPoint() throws Exception {
        int databaseSizeBeforeUpdate = supplyPointRepository.findAll().size();

        // Create the SupplyPoint

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSupplyPointMockMvc.perform(put("/api/supply-points").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(supplyPoint)))
            .andExpect(status().isBadRequest());

        // Validate the SupplyPoint in the database
        List<SupplyPoint> supplyPointList = supplyPointRepository.findAll();
        assertThat(supplyPointList).hasSize(databaseSizeBeforeUpdate);

    }

    @Test
    public void deleteSupplyPoint() throws Exception {
        // Initialize the database
        supplyPointRepository.save(supplyPoint);

        int databaseSizeBeforeDelete = supplyPointRepository.findAll().size();

        // Delete the supplyPoint
        restSupplyPointMockMvc.perform(delete("/api/supply-points/{id}", supplyPoint.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SupplyPoint> supplyPointList = supplyPointRepository.findAll();
        assertThat(supplyPointList).hasSize(databaseSizeBeforeDelete - 1);

    }

}
