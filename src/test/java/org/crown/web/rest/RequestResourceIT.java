package org.crown.web.rest;

import org.crown.CrownApp;
import org.crown.domain.Request;
import org.crown.domain.Resource;
import org.crown.repository.RequestRepository;
import org.crown.repository.search.RequestSearchRepository;

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
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link RequestResource} REST controller.
 */
@SpringBootTest(classes = CrownApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class RequestResourceIT {

    private static final String DEFAULT_ITEM_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_ITEM_TYPE = "BBBBBBBBBB";

    private static final Integer DEFAULT_NUM_REQUESTED = 1;
    private static final Integer UPDATED_NUM_REQUESTED = 2;

    private static final Integer DEFAULT_DAILY_NEED = 1;
    private static final Integer UPDATED_DAILY_NEED = 2;

    private static final Integer DEFAULT_NUMIN_STOCK = 1;
    private static final Integer UPDATED_NUMIN_STOCK = 2;

    private static final Integer DEFAULT_DAYS_LEFT = 1;
    private static final Integer UPDATED_DAYS_LEFT = 2;

    @Autowired
    private RequestRepository requestRepository;

    /**
     * This repository is mocked in the org.crown.repository.search test package.
     *
     * @see org.crown.repository.search.RequestSearchRepositoryMockConfiguration
     */
    @Autowired
    private RequestSearchRepository mockRequestSearchRepository;

    @Autowired
    private MockMvc restRequestMockMvc;

    private Request request;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Request createEntity() {
        Request request = new Request()
            .itemType(DEFAULT_ITEM_TYPE)
            .numRequested(DEFAULT_NUM_REQUESTED)
            .dailyNeed(DEFAULT_DAILY_NEED)
            .numinStock(DEFAULT_NUMIN_STOCK)
            .daysLeft(DEFAULT_DAYS_LEFT);
        // Add required entity
        Resource resource;
        resource = ResourceResourceIT.createEntity();
        resource.setId("fixed-id-for-tests");
        request.setResource(resource);
        return request;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Request createUpdatedEntity() {
        Request request = new Request()
            .itemType(UPDATED_ITEM_TYPE)
            .numRequested(UPDATED_NUM_REQUESTED)
            .dailyNeed(UPDATED_DAILY_NEED)
            .numinStock(UPDATED_NUMIN_STOCK)
            .daysLeft(UPDATED_DAYS_LEFT);
        // Add required entity
        Resource resource;
        resource = ResourceResourceIT.createUpdatedEntity();
        resource.setId("fixed-id-for-tests");
        request.setResource(resource);
        return request;
    }

    @BeforeEach
    public void initTest() {
        requestRepository.deleteAll();
        request = createEntity();
    }

    @Test
    public void createRequest() throws Exception {
        int databaseSizeBeforeCreate = requestRepository.findAll().size();

        // Create the Request
        restRequestMockMvc.perform(post("/api/requests").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(request)))
            .andExpect(status().isCreated());

        // Validate the Request in the database
        List<Request> requestList = requestRepository.findAll();
        assertThat(requestList).hasSize(databaseSizeBeforeCreate + 1);
        Request testRequest = requestList.get(requestList.size() - 1);
        assertThat(testRequest.getItemType()).isEqualTo(DEFAULT_ITEM_TYPE);
        assertThat(testRequest.getNumRequested()).isEqualTo(DEFAULT_NUM_REQUESTED);
        assertThat(testRequest.getDailyNeed()).isEqualTo(DEFAULT_DAILY_NEED);
        assertThat(testRequest.getNuminStock()).isEqualTo(DEFAULT_NUMIN_STOCK);
        assertThat(testRequest.getDaysLeft()).isEqualTo(DEFAULT_DAYS_LEFT);

        // Validate the Request in Elasticsearch
        verify(mockRequestSearchRepository, times(1)).save(testRequest);
    }

    @Test
    public void createRequestWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = requestRepository.findAll().size();

        // Create the Request with an existing ID
        request.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restRequestMockMvc.perform(post("/api/requests").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(request)))
            .andExpect(status().isBadRequest());

        // Validate the Request in the database
        List<Request> requestList = requestRepository.findAll();
        assertThat(requestList).hasSize(databaseSizeBeforeCreate);

        // Validate the Request in Elasticsearch
        verify(mockRequestSearchRepository, times(0)).save(request);
    }


    @Test
    public void getAllRequests() throws Exception {
        // Initialize the database
        requestRepository.save(request);

        // Get all the requestList
        restRequestMockMvc.perform(get("/api/requests?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(request.getId())))
            .andExpect(jsonPath("$.[*].itemType").value(hasItem(DEFAULT_ITEM_TYPE)))
            .andExpect(jsonPath("$.[*].numRequested").value(hasItem(DEFAULT_NUM_REQUESTED)))
            .andExpect(jsonPath("$.[*].dailyNeed").value(hasItem(DEFAULT_DAILY_NEED)))
            .andExpect(jsonPath("$.[*].numinStock").value(hasItem(DEFAULT_NUMIN_STOCK)))
            .andExpect(jsonPath("$.[*].daysLeft").value(hasItem(DEFAULT_DAYS_LEFT)));
    }
    
    @Test
    public void getRequest() throws Exception {
        // Initialize the database
        requestRepository.save(request);

        // Get the request
        restRequestMockMvc.perform(get("/api/requests/{id}", request.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(request.getId()))
            .andExpect(jsonPath("$.itemType").value(DEFAULT_ITEM_TYPE))
            .andExpect(jsonPath("$.numRequested").value(DEFAULT_NUM_REQUESTED))
            .andExpect(jsonPath("$.dailyNeed").value(DEFAULT_DAILY_NEED))
            .andExpect(jsonPath("$.numinStock").value(DEFAULT_NUMIN_STOCK))
            .andExpect(jsonPath("$.daysLeft").value(DEFAULT_DAYS_LEFT));
    }

    @Test
    public void getNonExistingRequest() throws Exception {
        // Get the request
        restRequestMockMvc.perform(get("/api/requests/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateRequest() throws Exception {
        // Initialize the database
        requestRepository.save(request);

        int databaseSizeBeforeUpdate = requestRepository.findAll().size();

        // Update the request
        Request updatedRequest = requestRepository.findById(request.getId()).get();
        updatedRequest
            .itemType(UPDATED_ITEM_TYPE)
            .numRequested(UPDATED_NUM_REQUESTED)
            .dailyNeed(UPDATED_DAILY_NEED)
            .numinStock(UPDATED_NUMIN_STOCK)
            .daysLeft(UPDATED_DAYS_LEFT);

        restRequestMockMvc.perform(put("/api/requests").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedRequest)))
            .andExpect(status().isOk());

        // Validate the Request in the database
        List<Request> requestList = requestRepository.findAll();
        assertThat(requestList).hasSize(databaseSizeBeforeUpdate);
        Request testRequest = requestList.get(requestList.size() - 1);
        assertThat(testRequest.getItemType()).isEqualTo(UPDATED_ITEM_TYPE);
        assertThat(testRequest.getNumRequested()).isEqualTo(UPDATED_NUM_REQUESTED);
        assertThat(testRequest.getDailyNeed()).isEqualTo(UPDATED_DAILY_NEED);
        assertThat(testRequest.getNuminStock()).isEqualTo(UPDATED_NUMIN_STOCK);
        assertThat(testRequest.getDaysLeft()).isEqualTo(UPDATED_DAYS_LEFT);

        // Validate the Request in Elasticsearch
        verify(mockRequestSearchRepository, times(1)).save(testRequest);
    }

    @Test
    public void updateNonExistingRequest() throws Exception {
        int databaseSizeBeforeUpdate = requestRepository.findAll().size();

        // Create the Request

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRequestMockMvc.perform(put("/api/requests").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(request)))
            .andExpect(status().isBadRequest());

        // Validate the Request in the database
        List<Request> requestList = requestRepository.findAll();
        assertThat(requestList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Request in Elasticsearch
        verify(mockRequestSearchRepository, times(0)).save(request);
    }

    @Test
    public void deleteRequest() throws Exception {
        // Initialize the database
        requestRepository.save(request);

        int databaseSizeBeforeDelete = requestRepository.findAll().size();

        // Delete the request
        restRequestMockMvc.perform(delete("/api/requests/{id}", request.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Request> requestList = requestRepository.findAll();
        assertThat(requestList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Request in Elasticsearch
        verify(mockRequestSearchRepository, times(1)).deleteById(request.getId());
    }

    @Test
    public void searchRequest() throws Exception {
        // Initialize the database
        requestRepository.save(request);
        when(mockRequestSearchRepository.search(queryStringQuery("id:" + request.getId())))
            .thenReturn(Collections.singletonList(request));
        // Search the request
        restRequestMockMvc.perform(get("/api/_search/requests?query=id:" + request.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(request.getId())))
            .andExpect(jsonPath("$.[*].itemType").value(hasItem(DEFAULT_ITEM_TYPE)))
            .andExpect(jsonPath("$.[*].numRequested").value(hasItem(DEFAULT_NUM_REQUESTED)))
            .andExpect(jsonPath("$.[*].dailyNeed").value(hasItem(DEFAULT_DAILY_NEED)))
            .andExpect(jsonPath("$.[*].numinStock").value(hasItem(DEFAULT_NUMIN_STOCK)))
            .andExpect(jsonPath("$.[*].daysLeft").value(hasItem(DEFAULT_DAYS_LEFT)));
    }
}
