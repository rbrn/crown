package org.crown.web.rest;

import org.crown.CrownApp;
import org.crown.domain.SupplierResource;
import org.crown.repository.SupplierResourceRepository;
import org.crown.repository.search.SupplierResourceSearchRepository;

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
 * Integration tests for the {@link SupplierResourceResource} REST controller.
 */
@SpringBootTest(classes = CrownApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class SupplierResourceResourceIT {

    private static final Integer DEFAULT_QUANTITY = 1;
    private static final Integer UPDATED_QUANTITY = 2;

    private static final Double DEFAULT_COST = 1.0;
    private static final Double UPDATED_COST = 2.0;

    @Autowired
    private SupplierResourceRepository supplierResourceRepository;

    /**
     * This repository is mocked in the org.crown.repository.search test package.
     *
     * @see org.crown.repository.search.SupplierResourceSearchRepositoryMockConfiguration
     */
    @Autowired
    private SupplierResourceSearchRepository mockSupplierResourceSearchRepository;

    @Autowired
    private MockMvc restSupplierResourceMockMvc;

    private SupplierResource supplierResource;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SupplierResource createEntity() {
        SupplierResource supplierResource = new SupplierResource()
            .quantity(DEFAULT_QUANTITY)
            .cost(DEFAULT_COST);
        return supplierResource;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SupplierResource createUpdatedEntity() {
        SupplierResource supplierResource = new SupplierResource()
            .quantity(UPDATED_QUANTITY)
            .cost(UPDATED_COST);
        return supplierResource;
    }

    @BeforeEach
    public void initTest() {
        supplierResourceRepository.deleteAll();
        supplierResource = createEntity();
    }

    @Test
    public void createSupplierResource() throws Exception {
        int databaseSizeBeforeCreate = supplierResourceRepository.findAll().size();

        // Create the SupplierResource
        restSupplierResourceMockMvc.perform(post("/api/supplier-resources").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(supplierResource)))
            .andExpect(status().isCreated());

        // Validate the SupplierResource in the database
        List<SupplierResource> supplierResourceList = supplierResourceRepository.findAll();
        assertThat(supplierResourceList).hasSize(databaseSizeBeforeCreate + 1);
        SupplierResource testSupplierResource = supplierResourceList.get(supplierResourceList.size() - 1);
        assertThat(testSupplierResource.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
        assertThat(testSupplierResource.getCost()).isEqualTo(DEFAULT_COST);

        // Validate the SupplierResource in Elasticsearch
        verify(mockSupplierResourceSearchRepository, times(1)).save(testSupplierResource);
    }

    @Test
    public void createSupplierResourceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = supplierResourceRepository.findAll().size();

        // Create the SupplierResource with an existing ID
        supplierResource.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restSupplierResourceMockMvc.perform(post("/api/supplier-resources").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(supplierResource)))
            .andExpect(status().isBadRequest());

        // Validate the SupplierResource in the database
        List<SupplierResource> supplierResourceList = supplierResourceRepository.findAll();
        assertThat(supplierResourceList).hasSize(databaseSizeBeforeCreate);

        // Validate the SupplierResource in Elasticsearch
        verify(mockSupplierResourceSearchRepository, times(0)).save(supplierResource);
    }


    @Test
    public void checkQuantityIsRequired() throws Exception {
        int databaseSizeBeforeTest = supplierResourceRepository.findAll().size();
        // set the field null
        supplierResource.setQuantity(null);

        // Create the SupplierResource, which fails.

        restSupplierResourceMockMvc.perform(post("/api/supplier-resources").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(supplierResource)))
            .andExpect(status().isBadRequest());

        List<SupplierResource> supplierResourceList = supplierResourceRepository.findAll();
        assertThat(supplierResourceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkCostIsRequired() throws Exception {
        int databaseSizeBeforeTest = supplierResourceRepository.findAll().size();
        // set the field null
        supplierResource.setCost(null);

        // Create the SupplierResource, which fails.

        restSupplierResourceMockMvc.perform(post("/api/supplier-resources").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(supplierResource)))
            .andExpect(status().isBadRequest());

        List<SupplierResource> supplierResourceList = supplierResourceRepository.findAll();
        assertThat(supplierResourceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllSupplierResources() throws Exception {
        // Initialize the database
        supplierResourceRepository.save(supplierResource);

        // Get all the supplierResourceList
        restSupplierResourceMockMvc.perform(get("/api/supplier-resources?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(supplierResource.getId())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY)))
            .andExpect(jsonPath("$.[*].cost").value(hasItem(DEFAULT_COST)));
    }
    
    @Test
    public void getSupplierResource() throws Exception {
        // Initialize the database
        supplierResourceRepository.save(supplierResource);

        // Get the supplierResource
        restSupplierResourceMockMvc.perform(get("/api/supplier-resources/{id}", supplierResource.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(supplierResource.getId()))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY))
            .andExpect(jsonPath("$.cost").value(DEFAULT_COST));
    }

    @Test
    public void getNonExistingSupplierResource() throws Exception {
        // Get the supplierResource
        restSupplierResourceMockMvc.perform(get("/api/supplier-resources/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateSupplierResource() throws Exception {
        // Initialize the database
        supplierResourceRepository.save(supplierResource);

        int databaseSizeBeforeUpdate = supplierResourceRepository.findAll().size();

        // Update the supplierResource
        SupplierResource updatedSupplierResource = supplierResourceRepository.findById(supplierResource.getId()).get();
        updatedSupplierResource
            .quantity(UPDATED_QUANTITY)
            .cost(UPDATED_COST);

        restSupplierResourceMockMvc.perform(put("/api/supplier-resources").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedSupplierResource)))
            .andExpect(status().isOk());

        // Validate the SupplierResource in the database
        List<SupplierResource> supplierResourceList = supplierResourceRepository.findAll();
        assertThat(supplierResourceList).hasSize(databaseSizeBeforeUpdate);
        SupplierResource testSupplierResource = supplierResourceList.get(supplierResourceList.size() - 1);
        assertThat(testSupplierResource.getQuantity()).isEqualTo(UPDATED_QUANTITY);
        assertThat(testSupplierResource.getCost()).isEqualTo(UPDATED_COST);

        // Validate the SupplierResource in Elasticsearch
        verify(mockSupplierResourceSearchRepository, times(1)).save(testSupplierResource);
    }

    @Test
    public void updateNonExistingSupplierResource() throws Exception {
        int databaseSizeBeforeUpdate = supplierResourceRepository.findAll().size();

        // Create the SupplierResource

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSupplierResourceMockMvc.perform(put("/api/supplier-resources").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(supplierResource)))
            .andExpect(status().isBadRequest());

        // Validate the SupplierResource in the database
        List<SupplierResource> supplierResourceList = supplierResourceRepository.findAll();
        assertThat(supplierResourceList).hasSize(databaseSizeBeforeUpdate);

        // Validate the SupplierResource in Elasticsearch
        verify(mockSupplierResourceSearchRepository, times(0)).save(supplierResource);
    }

    @Test
    public void deleteSupplierResource() throws Exception {
        // Initialize the database
        supplierResourceRepository.save(supplierResource);

        int databaseSizeBeforeDelete = supplierResourceRepository.findAll().size();

        // Delete the supplierResource
        restSupplierResourceMockMvc.perform(delete("/api/supplier-resources/{id}", supplierResource.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SupplierResource> supplierResourceList = supplierResourceRepository.findAll();
        assertThat(supplierResourceList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the SupplierResource in Elasticsearch
        verify(mockSupplierResourceSearchRepository, times(1)).deleteById(supplierResource.getId());
    }

    @Test
    public void searchSupplierResource() throws Exception {
        // Initialize the database
        supplierResourceRepository.save(supplierResource);
        when(mockSupplierResourceSearchRepository.search(queryStringQuery("id:" + supplierResource.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(supplierResource), PageRequest.of(0, 1), 1));
        // Search the supplierResource
        restSupplierResourceMockMvc.perform(get("/api/_search/supplier-resources?query=id:" + supplierResource.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(supplierResource.getId())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY)))
            .andExpect(jsonPath("$.[*].cost").value(hasItem(DEFAULT_COST)));
    }
}
