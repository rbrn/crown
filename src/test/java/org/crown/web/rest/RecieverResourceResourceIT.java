package org.crown.web.rest;

import org.crown.CrownApp;
import org.crown.domain.RecieverResource;
import org.crown.repository.RecieverResourceRepository;
import org.crown.repository.search.RecieverResourceSearchRepository;

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
 * Integration tests for the {@link RecieverResourceResource} REST controller.
 */
@SpringBootTest(classes = CrownApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class RecieverResourceResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_QUANTITY = 1;
    private static final Integer UPDATED_QUANTITY = 2;

    private static final Integer DEFAULT_DAILY_USE = 1;
    private static final Integer UPDATED_DAILY_USE = 2;

    private static final Integer DEFAULT_CURRENT_STOCK = 1;
    private static final Integer UPDATED_CURRENT_STOCK = 2;

    private static final String DEFAULT_NOTES = "AAAAAAAAAA";
    private static final String UPDATED_NOTES = "BBBBBBBBBB";

    @Autowired
    private RecieverResourceRepository recieverResourceRepository;

    /**
     * This repository is mocked in the org.crown.repository.search test package.
     *
     * @see org.crown.repository.search.RecieverResourceSearchRepositoryMockConfiguration
     */
    @Autowired
    private RecieverResourceSearchRepository mockRecieverResourceSearchRepository;

    @Autowired
    private MockMvc restRecieverResourceMockMvc;

    private RecieverResource recieverResource;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RecieverResource createEntity() {
        RecieverResource recieverResource = new RecieverResource()
            .name(DEFAULT_NAME)
            .quantity(DEFAULT_QUANTITY)
            .dailyUse(DEFAULT_DAILY_USE)
            .currentStock(DEFAULT_CURRENT_STOCK)
            .notes(DEFAULT_NOTES);
        return recieverResource;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RecieverResource createUpdatedEntity() {
        RecieverResource recieverResource = new RecieverResource()
            .name(UPDATED_NAME)
            .quantity(UPDATED_QUANTITY)
            .dailyUse(UPDATED_DAILY_USE)
            .currentStock(UPDATED_CURRENT_STOCK)
            .notes(UPDATED_NOTES);
        return recieverResource;
    }

    @BeforeEach
    public void initTest() {
        recieverResourceRepository.deleteAll();
        recieverResource = createEntity();
    }

    @Test
    public void createRecieverResource() throws Exception {
        int databaseSizeBeforeCreate = recieverResourceRepository.findAll().size();

        // Create the RecieverResource
        restRecieverResourceMockMvc.perform(post("/api/reciever-resources").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(recieverResource)))
            .andExpect(status().isCreated());

        // Validate the RecieverResource in the database
        List<RecieverResource> recieverResourceList = recieverResourceRepository.findAll();
        assertThat(recieverResourceList).hasSize(databaseSizeBeforeCreate + 1);
        RecieverResource testRecieverResource = recieverResourceList.get(recieverResourceList.size() - 1);
        assertThat(testRecieverResource.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testRecieverResource.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
        assertThat(testRecieverResource.getDailyUse()).isEqualTo(DEFAULT_DAILY_USE);
        assertThat(testRecieverResource.getCurrentStock()).isEqualTo(DEFAULT_CURRENT_STOCK);
        assertThat(testRecieverResource.getNotes()).isEqualTo(DEFAULT_NOTES);

        // Validate the RecieverResource in Elasticsearch
        verify(mockRecieverResourceSearchRepository, times(1)).save(testRecieverResource);
    }

    @Test
    public void createRecieverResourceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = recieverResourceRepository.findAll().size();

        // Create the RecieverResource with an existing ID
        recieverResource.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restRecieverResourceMockMvc.perform(post("/api/reciever-resources").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(recieverResource)))
            .andExpect(status().isBadRequest());

        // Validate the RecieverResource in the database
        List<RecieverResource> recieverResourceList = recieverResourceRepository.findAll();
        assertThat(recieverResourceList).hasSize(databaseSizeBeforeCreate);

        // Validate the RecieverResource in Elasticsearch
        verify(mockRecieverResourceSearchRepository, times(0)).save(recieverResource);
    }


    @Test
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = recieverResourceRepository.findAll().size();
        // set the field null
        recieverResource.setName(null);

        // Create the RecieverResource, which fails.

        restRecieverResourceMockMvc.perform(post("/api/reciever-resources").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(recieverResource)))
            .andExpect(status().isBadRequest());

        List<RecieverResource> recieverResourceList = recieverResourceRepository.findAll();
        assertThat(recieverResourceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkQuantityIsRequired() throws Exception {
        int databaseSizeBeforeTest = recieverResourceRepository.findAll().size();
        // set the field null
        recieverResource.setQuantity(null);

        // Create the RecieverResource, which fails.

        restRecieverResourceMockMvc.perform(post("/api/reciever-resources").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(recieverResource)))
            .andExpect(status().isBadRequest());

        List<RecieverResource> recieverResourceList = recieverResourceRepository.findAll();
        assertThat(recieverResourceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkDailyUseIsRequired() throws Exception {
        int databaseSizeBeforeTest = recieverResourceRepository.findAll().size();
        // set the field null
        recieverResource.setDailyUse(null);

        // Create the RecieverResource, which fails.

        restRecieverResourceMockMvc.perform(post("/api/reciever-resources").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(recieverResource)))
            .andExpect(status().isBadRequest());

        List<RecieverResource> recieverResourceList = recieverResourceRepository.findAll();
        assertThat(recieverResourceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllRecieverResources() throws Exception {
        // Initialize the database
        recieverResourceRepository.save(recieverResource);

        // Get all the recieverResourceList
        restRecieverResourceMockMvc.perform(get("/api/reciever-resources?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(recieverResource.getId())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY)))
            .andExpect(jsonPath("$.[*].dailyUse").value(hasItem(DEFAULT_DAILY_USE)))
            .andExpect(jsonPath("$.[*].currentStock").value(hasItem(DEFAULT_CURRENT_STOCK)))
            .andExpect(jsonPath("$.[*].notes").value(hasItem(DEFAULT_NOTES)));
    }
    
    @Test
    public void getRecieverResource() throws Exception {
        // Initialize the database
        recieverResourceRepository.save(recieverResource);

        // Get the recieverResource
        restRecieverResourceMockMvc.perform(get("/api/reciever-resources/{id}", recieverResource.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(recieverResource.getId()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY))
            .andExpect(jsonPath("$.dailyUse").value(DEFAULT_DAILY_USE))
            .andExpect(jsonPath("$.currentStock").value(DEFAULT_CURRENT_STOCK))
            .andExpect(jsonPath("$.notes").value(DEFAULT_NOTES));
    }

    @Test
    public void getNonExistingRecieverResource() throws Exception {
        // Get the recieverResource
        restRecieverResourceMockMvc.perform(get("/api/reciever-resources/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateRecieverResource() throws Exception {
        // Initialize the database
        recieverResourceRepository.save(recieverResource);

        int databaseSizeBeforeUpdate = recieverResourceRepository.findAll().size();

        // Update the recieverResource
        RecieverResource updatedRecieverResource = recieverResourceRepository.findById(recieverResource.getId()).get();
        updatedRecieverResource
            .name(UPDATED_NAME)
            .quantity(UPDATED_QUANTITY)
            .dailyUse(UPDATED_DAILY_USE)
            .currentStock(UPDATED_CURRENT_STOCK)
            .notes(UPDATED_NOTES);

        restRecieverResourceMockMvc.perform(put("/api/reciever-resources").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedRecieverResource)))
            .andExpect(status().isOk());

        // Validate the RecieverResource in the database
        List<RecieverResource> recieverResourceList = recieverResourceRepository.findAll();
        assertThat(recieverResourceList).hasSize(databaseSizeBeforeUpdate);
        RecieverResource testRecieverResource = recieverResourceList.get(recieverResourceList.size() - 1);
        assertThat(testRecieverResource.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testRecieverResource.getQuantity()).isEqualTo(UPDATED_QUANTITY);
        assertThat(testRecieverResource.getDailyUse()).isEqualTo(UPDATED_DAILY_USE);
        assertThat(testRecieverResource.getCurrentStock()).isEqualTo(UPDATED_CURRENT_STOCK);
        assertThat(testRecieverResource.getNotes()).isEqualTo(UPDATED_NOTES);

        // Validate the RecieverResource in Elasticsearch
        verify(mockRecieverResourceSearchRepository, times(1)).save(testRecieverResource);
    }

    @Test
    public void updateNonExistingRecieverResource() throws Exception {
        int databaseSizeBeforeUpdate = recieverResourceRepository.findAll().size();

        // Create the RecieverResource

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRecieverResourceMockMvc.perform(put("/api/reciever-resources").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(recieverResource)))
            .andExpect(status().isBadRequest());

        // Validate the RecieverResource in the database
        List<RecieverResource> recieverResourceList = recieverResourceRepository.findAll();
        assertThat(recieverResourceList).hasSize(databaseSizeBeforeUpdate);

        // Validate the RecieverResource in Elasticsearch
        verify(mockRecieverResourceSearchRepository, times(0)).save(recieverResource);
    }

    @Test
    public void deleteRecieverResource() throws Exception {
        // Initialize the database
        recieverResourceRepository.save(recieverResource);

        int databaseSizeBeforeDelete = recieverResourceRepository.findAll().size();

        // Delete the recieverResource
        restRecieverResourceMockMvc.perform(delete("/api/reciever-resources/{id}", recieverResource.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<RecieverResource> recieverResourceList = recieverResourceRepository.findAll();
        assertThat(recieverResourceList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the RecieverResource in Elasticsearch
        verify(mockRecieverResourceSearchRepository, times(1)).deleteById(recieverResource.getId());
    }

    @Test
    public void searchRecieverResource() throws Exception {
        // Initialize the database
        recieverResourceRepository.save(recieverResource);
        when(mockRecieverResourceSearchRepository.search(queryStringQuery("id:" + recieverResource.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(recieverResource), PageRequest.of(0, 1), 1));
        // Search the recieverResource
        restRecieverResourceMockMvc.perform(get("/api/_search/reciever-resources?query=id:" + recieverResource.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(recieverResource.getId())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY)))
            .andExpect(jsonPath("$.[*].dailyUse").value(hasItem(DEFAULT_DAILY_USE)))
            .andExpect(jsonPath("$.[*].currentStock").value(hasItem(DEFAULT_CURRENT_STOCK)))
            .andExpect(jsonPath("$.[*].notes").value(hasItem(DEFAULT_NOTES)));
    }
}
