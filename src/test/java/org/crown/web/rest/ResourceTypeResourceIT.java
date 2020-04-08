package org.crown.web.rest;

import org.crown.CrownApp;
import org.crown.domain.ResourceType;
import org.crown.repository.ResourceTypeRepository;

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
 * Integration tests for the {@link ResourceTypeResource} REST controller.
 */
@SpringBootTest(classes = CrownApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class ResourceTypeResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_NOTES = "AAAAAAAAAA";
    private static final String UPDATED_NOTES = "BBBBBBBBBB";

    @Autowired
    private ResourceTypeRepository resourceTypeRepository;

    @Autowired
    private MockMvc restResourceTypeMockMvc;

    private ResourceType resourceType;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ResourceType createEntity() {
        ResourceType resourceType = new ResourceType()
            .name(DEFAULT_NAME)
            .notes(DEFAULT_NOTES);
        return resourceType;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ResourceType createUpdatedEntity() {
        ResourceType resourceType = new ResourceType()
            .name(UPDATED_NAME)
            .notes(UPDATED_NOTES);
        return resourceType;
    }

    @BeforeEach
    public void initTest() {
        resourceTypeRepository.deleteAll();
        resourceType = createEntity();
    }

    @Test
    public void createResourceType() throws Exception {
        int databaseSizeBeforeCreate = resourceTypeRepository.findAll().size();

        // Create the ResourceType
        restResourceTypeMockMvc.perform(post("/api/resource-types").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(resourceType)))
            .andExpect(status().isCreated());

        // Validate the ResourceType in the database
        List<ResourceType> resourceTypeList = resourceTypeRepository.findAll();
        assertThat(resourceTypeList).hasSize(databaseSizeBeforeCreate + 1);
        ResourceType testResourceType = resourceTypeList.get(resourceTypeList.size() - 1);
        assertThat(testResourceType.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testResourceType.getNotes()).isEqualTo(DEFAULT_NOTES);

        // Validate the ResourceType in Elasticsearch
        //verify(mockResourceTypeSearchRepository, times(1)).save(testResourceType);
    }

    @Test
    public void createResourceTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = resourceTypeRepository.findAll().size();

        // Create the ResourceType with an existing ID
        resourceType.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restResourceTypeMockMvc.perform(post("/api/resource-types").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(resourceType)))
            .andExpect(status().isBadRequest());

        // Validate the ResourceType in the database
        List<ResourceType> resourceTypeList = resourceTypeRepository.findAll();
        assertThat(resourceTypeList).hasSize(databaseSizeBeforeCreate);

        // Validate the ResourceType in Elasticsearch
        //verify(mockResourceTypeSearchRepository, times(0)).save(resourceType);
    }


    @Test
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = resourceTypeRepository.findAll().size();
        // set the field null
        resourceType.setName(null);

        // Create the ResourceType, which fails.

        restResourceTypeMockMvc.perform(post("/api/resource-types").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(resourceType)))
            .andExpect(status().isBadRequest());

        List<ResourceType> resourceTypeList = resourceTypeRepository.findAll();
        assertThat(resourceTypeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllResourceTypes() throws Exception {
        // Initialize the database
        resourceTypeRepository.save(resourceType);

        // Get all the resourceTypeList
        restResourceTypeMockMvc.perform(get("/api/resource-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(resourceType.getId())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].notes").value(hasItem(DEFAULT_NOTES)));
    }

    @Test
    public void getResourceType() throws Exception {
        // Initialize the database
        resourceTypeRepository.save(resourceType);

        // Get the resourceType
        restResourceTypeMockMvc.perform(get("/api/resource-types/{id}", resourceType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(resourceType.getId()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.notes").value(DEFAULT_NOTES));
    }

    @Test
    public void getNonExistingResourceType() throws Exception {
        // Get the resourceType
        restResourceTypeMockMvc.perform(get("/api/resource-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateResourceType() throws Exception {
        // Initialize the database
        resourceTypeRepository.save(resourceType);

        int databaseSizeBeforeUpdate = resourceTypeRepository.findAll().size();

        // Update the resourceType
        ResourceType updatedResourceType = resourceTypeRepository.findById(resourceType.getId()).get();
        updatedResourceType
            .name(UPDATED_NAME)
            .notes(UPDATED_NOTES);

        restResourceTypeMockMvc.perform(put("/api/resource-types").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedResourceType)))
            .andExpect(status().isOk());

        // Validate the ResourceType in the database
        List<ResourceType> resourceTypeList = resourceTypeRepository.findAll();
        assertThat(resourceTypeList).hasSize(databaseSizeBeforeUpdate);
        ResourceType testResourceType = resourceTypeList.get(resourceTypeList.size() - 1);
        assertThat(testResourceType.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testResourceType.getNotes()).isEqualTo(UPDATED_NOTES);

        // Validate the ResourceType in Elasticsearch
        //verify(mockResourceTypeSearchRepository, times(1)).save(testResourceType);
    }

    @Test
    public void updateNonExistingResourceType() throws Exception {
        int databaseSizeBeforeUpdate = resourceTypeRepository.findAll().size();

        // Create the ResourceType

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restResourceTypeMockMvc.perform(put("/api/resource-types").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(resourceType)))
            .andExpect(status().isBadRequest());

        // Validate the ResourceType in the database
        List<ResourceType> resourceTypeList = resourceTypeRepository.findAll();
        assertThat(resourceTypeList).hasSize(databaseSizeBeforeUpdate);

        // Validate the ResourceType in Elasticsearch
        //verify(mockResourceTypeSearchRepository, times(0)).save(resourceType);
    }

    @Test
    public void deleteResourceType() throws Exception {
        // Initialize the database
        resourceTypeRepository.save(resourceType);

        int databaseSizeBeforeDelete = resourceTypeRepository.findAll().size();

        // Delete the resourceType
        restResourceTypeMockMvc.perform(delete("/api/resource-types/{id}", resourceType.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ResourceType> resourceTypeList = resourceTypeRepository.findAll();
        assertThat(resourceTypeList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the ResourceType in Elasticsearch
        //verify(mockResourceTypeSearchRepository, times(1)).deleteById(resourceType.getId());
    }

}
