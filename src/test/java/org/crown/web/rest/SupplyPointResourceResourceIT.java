package org.crown.web.rest;

import org.crown.CrownApp;
import org.crown.domain.SupplyPointResource;
import org.crown.repository.SupplyPointResourceRepository;

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
 * Integration tests for the {@link SupplyPointResourceResource} REST controller.
 */
@SpringBootTest(classes = CrownApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class SupplyPointResourceResourceIT {

    private static final Integer DEFAULT_NUM_REQUESTED = 1;
    private static final Integer UPDATED_NUM_REQUESTED = 2;

    private static final Integer DEFAULT_CAN_PRODUCE = 1;
    private static final Integer UPDATED_CAN_PRODUCE = 2;

    private static final Integer DEFAULT_NUMIN_STOCK = 1;
    private static final Integer UPDATED_NUMIN_STOCK = 2;

    @Autowired
    private SupplyPointResourceRepository supplyPointResourceRepository;


    @Autowired
    private MockMvc restSupplyPointResourceMockMvc;

    private SupplyPointResource supplyPointResource;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SupplyPointResource createEntity() {
        SupplyPointResource supplyPointResource = new SupplyPointResource()
            .numRequested(DEFAULT_NUM_REQUESTED)
            .canProduce(DEFAULT_CAN_PRODUCE)
            .numinStock(DEFAULT_NUMIN_STOCK);
        return supplyPointResource;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SupplyPointResource createUpdatedEntity() {
        SupplyPointResource supplyPointResource = new SupplyPointResource()
            .numRequested(UPDATED_NUM_REQUESTED)
            .canProduce(UPDATED_CAN_PRODUCE)
            .numinStock(UPDATED_NUMIN_STOCK);
        return supplyPointResource;
    }

    @BeforeEach
    public void initTest() {
        supplyPointResourceRepository.deleteAll();
        supplyPointResource = createEntity();
    }

    @Test
    public void createSupplyPointResource() throws Exception {
        int databaseSizeBeforeCreate = supplyPointResourceRepository.findAll().size();

        // Create the SupplyPointResource
        restSupplyPointResourceMockMvc.perform(post("/api/supply-point-resources").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(supplyPointResource)))
            .andExpect(status().isCreated());

        // Validate the SupplyPointResource in the database
        List<SupplyPointResource> supplyPointResourceList = supplyPointResourceRepository.findAll();
        assertThat(supplyPointResourceList).hasSize(databaseSizeBeforeCreate + 1);
        SupplyPointResource testSupplyPointResource = supplyPointResourceList.get(supplyPointResourceList.size() - 1);
        assertThat(testSupplyPointResource.getNumRequested()).isEqualTo(DEFAULT_NUM_REQUESTED);
        assertThat(testSupplyPointResource.getCanProduce()).isEqualTo(DEFAULT_CAN_PRODUCE);
        assertThat(testSupplyPointResource.getNuminStock()).isEqualTo(DEFAULT_NUMIN_STOCK);

    }

    @Test
    public void createSupplyPointResourceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = supplyPointResourceRepository.findAll().size();

        // Create the SupplyPointResource with an existing ID
        supplyPointResource.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restSupplyPointResourceMockMvc.perform(post("/api/supply-point-resources").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(supplyPointResource)))
            .andExpect(status().isBadRequest());

        // Validate the SupplyPointResource in the database
        List<SupplyPointResource> supplyPointResourceList = supplyPointResourceRepository.findAll();
        assertThat(supplyPointResourceList).hasSize(databaseSizeBeforeCreate);

    }


    @Test
    public void getAllSupplyPointResources() throws Exception {
        // Initialize the database
        supplyPointResourceRepository.save(supplyPointResource);

        // Get all the supplyPointResourceList
        restSupplyPointResourceMockMvc.perform(get("/api/supply-point-resources?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(supplyPointResource.getId())))
            .andExpect(jsonPath("$.[*].numRequested").value(hasItem(DEFAULT_NUM_REQUESTED)))
            .andExpect(jsonPath("$.[*].canProduce").value(hasItem(DEFAULT_CAN_PRODUCE)))
            .andExpect(jsonPath("$.[*].numinStock").value(hasItem(DEFAULT_NUMIN_STOCK)));
    }
    
    @Test
    public void getSupplyPointResource() throws Exception {
        // Initialize the database
        supplyPointResourceRepository.save(supplyPointResource);

        // Get the supplyPointResource
        restSupplyPointResourceMockMvc.perform(get("/api/supply-point-resources/{id}", supplyPointResource.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(supplyPointResource.getId()))
            .andExpect(jsonPath("$.numRequested").value(DEFAULT_NUM_REQUESTED))
            .andExpect(jsonPath("$.canProduce").value(DEFAULT_CAN_PRODUCE))
            .andExpect(jsonPath("$.numinStock").value(DEFAULT_NUMIN_STOCK));
    }

    @Test
    public void getNonExistingSupplyPointResource() throws Exception {
        // Get the supplyPointResource
        restSupplyPointResourceMockMvc.perform(get("/api/supply-point-resources/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateSupplyPointResource() throws Exception {
        // Initialize the database
        supplyPointResourceRepository.save(supplyPointResource);

        int databaseSizeBeforeUpdate = supplyPointResourceRepository.findAll().size();

        // Update the supplyPointResource
        SupplyPointResource updatedSupplyPointResource = supplyPointResourceRepository.findById(supplyPointResource.getId()).get();
        updatedSupplyPointResource
            .numRequested(UPDATED_NUM_REQUESTED)
            .canProduce(UPDATED_CAN_PRODUCE)
            .numinStock(UPDATED_NUMIN_STOCK);

        restSupplyPointResourceMockMvc.perform(put("/api/supply-point-resources").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedSupplyPointResource)))
            .andExpect(status().isOk());

        // Validate the SupplyPointResource in the database
        List<SupplyPointResource> supplyPointResourceList = supplyPointResourceRepository.findAll();
        assertThat(supplyPointResourceList).hasSize(databaseSizeBeforeUpdate);
        SupplyPointResource testSupplyPointResource = supplyPointResourceList.get(supplyPointResourceList.size() - 1);
        assertThat(testSupplyPointResource.getNumRequested()).isEqualTo(UPDATED_NUM_REQUESTED);
        assertThat(testSupplyPointResource.getCanProduce()).isEqualTo(UPDATED_CAN_PRODUCE);
        assertThat(testSupplyPointResource.getNuminStock()).isEqualTo(UPDATED_NUMIN_STOCK);

    }

    @Test
    public void updateNonExistingSupplyPointResource() throws Exception {
        int databaseSizeBeforeUpdate = supplyPointResourceRepository.findAll().size();

        // Create the SupplyPointResource

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSupplyPointResourceMockMvc.perform(put("/api/supply-point-resources").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(supplyPointResource)))
            .andExpect(status().isBadRequest());

        // Validate the SupplyPointResource in the database
        List<SupplyPointResource> supplyPointResourceList = supplyPointResourceRepository.findAll();
        assertThat(supplyPointResourceList).hasSize(databaseSizeBeforeUpdate);

    }

    @Test
    public void deleteSupplyPointResource() throws Exception {
        // Initialize the database
        supplyPointResourceRepository.save(supplyPointResource);

        int databaseSizeBeforeDelete = supplyPointResourceRepository.findAll().size();

        // Delete the supplyPointResource
        restSupplyPointResourceMockMvc.perform(delete("/api/supply-point-resources/{id}", supplyPointResource.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SupplyPointResource> supplyPointResourceList = supplyPointResourceRepository.findAll();
        assertThat(supplyPointResourceList).hasSize(databaseSizeBeforeDelete - 1);

    }
}
