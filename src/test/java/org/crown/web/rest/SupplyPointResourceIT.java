package org.crown.web.rest;

import org.crown.CrownApp;
import org.crown.domain.SupplyPoint;
import org.crown.repository.SupplyPointRepository;
import org.crown.repository.search.SupplyPointSearchRepository;
import org.crown.service.SupplyPointService;
import org.crown.service.dto.SupplyPointDTO;
import org.crown.service.mapper.SupplyPointMapper;

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

    private static final String DEFAULT_PHONE_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_PHONE_NUMBER = "BBBBBBBBBB";

    private static final Float DEFAULT_LATITUDE = 1F;
    private static final Float UPDATED_LATITUDE = 2F;

    private static final Float DEFAULT_LONGITUDE = 1F;
    private static final Float UPDATED_LONGITUDE = 2F;

    private static final String DEFAULT_CITY = "AAAAAAAAAA";
    private static final String UPDATED_CITY = "BBBBBBBBBB";

    private static final String DEFAULT_STATE = "AAAAAAAAAA";
    private static final String UPDATED_STATE = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

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
    private SupplyPointMapper supplyPointMapper;

    @Autowired
    private SupplyPointService supplyPointService;

    /**
     * This repository is mocked in the org.crown.repository.search test package.
     *
     * @see org.crown.repository.search.SupplyPointSearchRepositoryMockConfiguration
     */
    @Autowired
    private SupplyPointSearchRepository mockSupplyPointSearchRepository;

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
            .phoneNumber(DEFAULT_PHONE_NUMBER)
            .latitude(DEFAULT_LATITUDE)
            .longitude(DEFAULT_LONGITUDE)
            .city(DEFAULT_CITY)
            .state(DEFAULT_STATE)
            .email(DEFAULT_EMAIL)
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
            .phoneNumber(UPDATED_PHONE_NUMBER)
            .latitude(UPDATED_LATITUDE)
            .longitude(UPDATED_LONGITUDE)
            .city(UPDATED_CITY)
            .state(UPDATED_STATE)
            .email(UPDATED_EMAIL)
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
        SupplyPointDTO supplyPointDTO = supplyPointMapper.toDto(supplyPoint);
        restSupplyPointMockMvc.perform(post("/api/supply-points").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(supplyPointDTO)))
            .andExpect(status().isCreated());

        // Validate the SupplyPoint in the database
        List<SupplyPoint> supplyPointList = supplyPointRepository.findAll();
        assertThat(supplyPointList).hasSize(databaseSizeBeforeCreate + 1);
        SupplyPoint testSupplyPoint = supplyPointList.get(supplyPointList.size() - 1);
        assertThat(testSupplyPoint.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testSupplyPoint.getAddress()).isEqualTo(DEFAULT_ADDRESS);
        assertThat(testSupplyPoint.getPrimaryContactName()).isEqualTo(DEFAULT_PRIMARY_CONTACT_NAME);
        assertThat(testSupplyPoint.getZip()).isEqualTo(DEFAULT_ZIP);
        assertThat(testSupplyPoint.getPhoneNumber()).isEqualTo(DEFAULT_PHONE_NUMBER);
        assertThat(testSupplyPoint.getLatitude()).isEqualTo(DEFAULT_LATITUDE);
        assertThat(testSupplyPoint.getLongitude()).isEqualTo(DEFAULT_LONGITUDE);
        assertThat(testSupplyPoint.getCity()).isEqualTo(DEFAULT_CITY);
        assertThat(testSupplyPoint.getState()).isEqualTo(DEFAULT_STATE);
        assertThat(testSupplyPoint.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testSupplyPoint.isIsDistributor()).isEqualTo(DEFAULT_IS_DISTRIBUTOR);
        assertThat(testSupplyPoint.isIsHealthcare()).isEqualTo(DEFAULT_IS_HEALTHCARE);
        assertThat(testSupplyPoint.isHasSterilization()).isEqualTo(DEFAULT_HAS_STERILIZATION);
        assertThat(testSupplyPoint.getPriority()).isEqualTo(DEFAULT_PRIORITY);
        assertThat(testSupplyPoint.getNotes()).isEqualTo(DEFAULT_NOTES);

        // Validate the SupplyPoint in Elasticsearch
        verify(mockSupplyPointSearchRepository, times(1)).save(testSupplyPoint);
    }

    @Test
    public void createSupplyPointWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = supplyPointRepository.findAll().size();

        // Create the SupplyPoint with an existing ID
        supplyPoint.setId("existing_id");
        SupplyPointDTO supplyPointDTO = supplyPointMapper.toDto(supplyPoint);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSupplyPointMockMvc.perform(post("/api/supply-points").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(supplyPointDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SupplyPoint in the database
        List<SupplyPoint> supplyPointList = supplyPointRepository.findAll();
        assertThat(supplyPointList).hasSize(databaseSizeBeforeCreate);

        // Validate the SupplyPoint in Elasticsearch
        verify(mockSupplyPointSearchRepository, times(0)).save(supplyPoint);
    }


    @Test
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = supplyPointRepository.findAll().size();
        // set the field null
        supplyPoint.setName(null);

        // Create the SupplyPoint, which fails.
        SupplyPointDTO supplyPointDTO = supplyPointMapper.toDto(supplyPoint);

        restSupplyPointMockMvc.perform(post("/api/supply-points").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(supplyPointDTO)))
            .andExpect(status().isBadRequest());

        List<SupplyPoint> supplyPointList = supplyPointRepository.findAll();
        assertThat(supplyPointList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkAddressIsRequired() throws Exception {
        int databaseSizeBeforeTest = supplyPointRepository.findAll().size();
        // set the field null
        supplyPoint.setAddress(null);

        // Create the SupplyPoint, which fails.
        SupplyPointDTO supplyPointDTO = supplyPointMapper.toDto(supplyPoint);

        restSupplyPointMockMvc.perform(post("/api/supply-points").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(supplyPointDTO)))
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
        SupplyPointDTO supplyPointDTO = supplyPointMapper.toDto(supplyPoint);

        restSupplyPointMockMvc.perform(post("/api/supply-points").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(supplyPointDTO)))
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
        SupplyPointDTO supplyPointDTO = supplyPointMapper.toDto(supplyPoint);

        restSupplyPointMockMvc.perform(post("/api/supply-points").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(supplyPointDTO)))
            .andExpect(status().isBadRequest());

        List<SupplyPoint> supplyPointList = supplyPointRepository.findAll();
        assertThat(supplyPointList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkPhoneNumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = supplyPointRepository.findAll().size();
        // set the field null
        supplyPoint.setPhoneNumber(null);

        // Create the SupplyPoint, which fails.
        SupplyPointDTO supplyPointDTO = supplyPointMapper.toDto(supplyPoint);

        restSupplyPointMockMvc.perform(post("/api/supply-points").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(supplyPointDTO)))
            .andExpect(status().isBadRequest());

        List<SupplyPoint> supplyPointList = supplyPointRepository.findAll();
        assertThat(supplyPointList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkCityIsRequired() throws Exception {
        int databaseSizeBeforeTest = supplyPointRepository.findAll().size();
        // set the field null
        supplyPoint.setCity(null);

        // Create the SupplyPoint, which fails.
        SupplyPointDTO supplyPointDTO = supplyPointMapper.toDto(supplyPoint);

        restSupplyPointMockMvc.perform(post("/api/supply-points").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(supplyPointDTO)))
            .andExpect(status().isBadRequest());

        List<SupplyPoint> supplyPointList = supplyPointRepository.findAll();
        assertThat(supplyPointList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkStateIsRequired() throws Exception {
        int databaseSizeBeforeTest = supplyPointRepository.findAll().size();
        // set the field null
        supplyPoint.setState(null);

        // Create the SupplyPoint, which fails.
        SupplyPointDTO supplyPointDTO = supplyPointMapper.toDto(supplyPoint);

        restSupplyPointMockMvc.perform(post("/api/supply-points").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(supplyPointDTO)))
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
            .andExpect(jsonPath("$.[*].phoneNumber").value(hasItem(DEFAULT_PHONE_NUMBER)))
            .andExpect(jsonPath("$.[*].latitude").value(hasItem(DEFAULT_LATITUDE.doubleValue())))
            .andExpect(jsonPath("$.[*].longitude").value(hasItem(DEFAULT_LONGITUDE.doubleValue())))
            .andExpect(jsonPath("$.[*].city").value(hasItem(DEFAULT_CITY)))
            .andExpect(jsonPath("$.[*].state").value(hasItem(DEFAULT_STATE)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
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
            .andExpect(jsonPath("$.phoneNumber").value(DEFAULT_PHONE_NUMBER))
            .andExpect(jsonPath("$.latitude").value(DEFAULT_LATITUDE.doubleValue()))
            .andExpect(jsonPath("$.longitude").value(DEFAULT_LONGITUDE.doubleValue()))
            .andExpect(jsonPath("$.city").value(DEFAULT_CITY))
            .andExpect(jsonPath("$.state").value(DEFAULT_STATE))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL))
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
            .phoneNumber(UPDATED_PHONE_NUMBER)
            .latitude(UPDATED_LATITUDE)
            .longitude(UPDATED_LONGITUDE)
            .city(UPDATED_CITY)
            .state(UPDATED_STATE)
            .email(UPDATED_EMAIL)
            .isDistributor(UPDATED_IS_DISTRIBUTOR)
            .isHealthcare(UPDATED_IS_HEALTHCARE)
            .hasSterilization(UPDATED_HAS_STERILIZATION)
            .priority(UPDATED_PRIORITY)
            .notes(UPDATED_NOTES);
        SupplyPointDTO supplyPointDTO = supplyPointMapper.toDto(updatedSupplyPoint);

        restSupplyPointMockMvc.perform(put("/api/supply-points").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(supplyPointDTO)))
            .andExpect(status().isOk());

        // Validate the SupplyPoint in the database
        List<SupplyPoint> supplyPointList = supplyPointRepository.findAll();
        assertThat(supplyPointList).hasSize(databaseSizeBeforeUpdate);
        SupplyPoint testSupplyPoint = supplyPointList.get(supplyPointList.size() - 1);
        assertThat(testSupplyPoint.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testSupplyPoint.getAddress()).isEqualTo(UPDATED_ADDRESS);
        assertThat(testSupplyPoint.getPrimaryContactName()).isEqualTo(UPDATED_PRIMARY_CONTACT_NAME);
        assertThat(testSupplyPoint.getZip()).isEqualTo(UPDATED_ZIP);
        assertThat(testSupplyPoint.getPhoneNumber()).isEqualTo(UPDATED_PHONE_NUMBER);
        assertThat(testSupplyPoint.getLatitude()).isEqualTo(UPDATED_LATITUDE);
        assertThat(testSupplyPoint.getLongitude()).isEqualTo(UPDATED_LONGITUDE);
        assertThat(testSupplyPoint.getCity()).isEqualTo(UPDATED_CITY);
        assertThat(testSupplyPoint.getState()).isEqualTo(UPDATED_STATE);
        assertThat(testSupplyPoint.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testSupplyPoint.isIsDistributor()).isEqualTo(UPDATED_IS_DISTRIBUTOR);
        assertThat(testSupplyPoint.isIsHealthcare()).isEqualTo(UPDATED_IS_HEALTHCARE);
        assertThat(testSupplyPoint.isHasSterilization()).isEqualTo(UPDATED_HAS_STERILIZATION);
        assertThat(testSupplyPoint.getPriority()).isEqualTo(UPDATED_PRIORITY);
        assertThat(testSupplyPoint.getNotes()).isEqualTo(UPDATED_NOTES);

        // Validate the SupplyPoint in Elasticsearch
        verify(mockSupplyPointSearchRepository, times(1)).save(testSupplyPoint);
    }

    @Test
    public void updateNonExistingSupplyPoint() throws Exception {
        int databaseSizeBeforeUpdate = supplyPointRepository.findAll().size();

        // Create the SupplyPoint
        SupplyPointDTO supplyPointDTO = supplyPointMapper.toDto(supplyPoint);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSupplyPointMockMvc.perform(put("/api/supply-points").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(supplyPointDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SupplyPoint in the database
        List<SupplyPoint> supplyPointList = supplyPointRepository.findAll();
        assertThat(supplyPointList).hasSize(databaseSizeBeforeUpdate);

        // Validate the SupplyPoint in Elasticsearch
        verify(mockSupplyPointSearchRepository, times(0)).save(supplyPoint);
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

        // Validate the SupplyPoint in Elasticsearch
        verify(mockSupplyPointSearchRepository, times(1)).deleteById(supplyPoint.getId());
    }

    @Test
    public void searchSupplyPoint() throws Exception {
        // Initialize the database
        supplyPointRepository.save(supplyPoint);
        when(mockSupplyPointSearchRepository.search(queryStringQuery("id:" + supplyPoint.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(supplyPoint), PageRequest.of(0, 1), 1));
        // Search the supplyPoint
        restSupplyPointMockMvc.perform(get("/api/_search/supply-points?query=id:" + supplyPoint.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(supplyPoint.getId())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].address").value(hasItem(DEFAULT_ADDRESS)))
            .andExpect(jsonPath("$.[*].primaryContactName").value(hasItem(DEFAULT_PRIMARY_CONTACT_NAME)))
            .andExpect(jsonPath("$.[*].zip").value(hasItem(DEFAULT_ZIP)))
            .andExpect(jsonPath("$.[*].phoneNumber").value(hasItem(DEFAULT_PHONE_NUMBER)))
            .andExpect(jsonPath("$.[*].latitude").value(hasItem(DEFAULT_LATITUDE.doubleValue())))
            .andExpect(jsonPath("$.[*].longitude").value(hasItem(DEFAULT_LONGITUDE.doubleValue())))
            .andExpect(jsonPath("$.[*].city").value(hasItem(DEFAULT_CITY)))
            .andExpect(jsonPath("$.[*].state").value(hasItem(DEFAULT_STATE)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
            .andExpect(jsonPath("$.[*].isDistributor").value(hasItem(DEFAULT_IS_DISTRIBUTOR.booleanValue())))
            .andExpect(jsonPath("$.[*].isHealthcare").value(hasItem(DEFAULT_IS_HEALTHCARE.booleanValue())))
            .andExpect(jsonPath("$.[*].hasSterilization").value(hasItem(DEFAULT_HAS_STERILIZATION.booleanValue())))
            .andExpect(jsonPath("$.[*].priority").value(hasItem(DEFAULT_PRIORITY)))
            .andExpect(jsonPath("$.[*].notes").value(hasItem(DEFAULT_NOTES)));
    }
}
