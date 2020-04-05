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
import org.crown.domain.ReceiverResource;
import org.crown.repository.ReceiverResourceRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

/**
 * Integration tests for the {@link ReceiverResourceResource} REST controller.
 */
@SpringBootTest(classes = CrownApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class ReceiverResourceResourceIT {

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
    private ReceiverResourceRepository receiverResourceRepository;


    @Autowired
    private MockMvc restReceiverResourceMockMvc;

    private ReceiverResource receiverResource;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ReceiverResource createEntity() {
        ReceiverResource receiverResource = new ReceiverResource()
            .name(DEFAULT_NAME)
            .quantity(DEFAULT_QUANTITY)
            .dailyUse(DEFAULT_DAILY_USE)
            .currentStock(DEFAULT_CURRENT_STOCK)
            .notes(DEFAULT_NOTES);
        return receiverResource;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ReceiverResource createUpdatedEntity() {
        ReceiverResource receiverResource = new ReceiverResource()
            .name(UPDATED_NAME)
            .quantity(UPDATED_QUANTITY)
            .dailyUse(UPDATED_DAILY_USE)
            .currentStock(UPDATED_CURRENT_STOCK)
            .notes(UPDATED_NOTES);
        return receiverResource;
    }

    @BeforeEach
    public void initTest() {
        receiverResourceRepository.deleteAll();
        receiverResource = createEntity();
    }

    @Test
    public void createReceiverResource() throws Exception {
        int databaseSizeBeforeCreate = receiverResourceRepository.findAll().size();

        // Create the ReceiverResource
        restReceiverResourceMockMvc.perform(post("/api/receiver-resources").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(receiverResource)))
            .andExpect(status().isCreated());

        // Validate the ReceiverResource in the database
        List<ReceiverResource> receiverResourceList = receiverResourceRepository.findAll();
        assertThat(receiverResourceList).hasSize(databaseSizeBeforeCreate + 1);
        ReceiverResource testReceiverResource = receiverResourceList.get(receiverResourceList.size() - 1);
        assertThat(testReceiverResource.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testReceiverResource.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
        assertThat(testReceiverResource.getDailyUse()).isEqualTo(DEFAULT_DAILY_USE);
        assertThat(testReceiverResource.getCurrentStock()).isEqualTo(DEFAULT_CURRENT_STOCK);
        assertThat(testReceiverResource.getNotes()).isEqualTo(DEFAULT_NOTES);

    }

    @Test
    public void createReceiverResourceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = receiverResourceRepository.findAll().size();

        // Create the ReceiverResource with an existing ID
        receiverResource.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restReceiverResourceMockMvc.perform(post("/api/receiver-resources").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(receiverResource)))
            .andExpect(status().isBadRequest());

        // Validate the ReceiverResource in the database
        List<ReceiverResource> receiverResourceList = receiverResourceRepository.findAll();
        assertThat(receiverResourceList).hasSize(databaseSizeBeforeCreate);

    }


    @Test
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = receiverResourceRepository.findAll().size();
        // set the field null
        receiverResource.setName(null);

        // Create the ReceiverResource, which fails.

        restReceiverResourceMockMvc.perform(post("/api/receiver-resources").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(receiverResource)))
            .andExpect(status().isBadRequest());

        List<ReceiverResource> receiverResourceList = receiverResourceRepository.findAll();
        assertThat(receiverResourceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkQuantityIsRequired() throws Exception {
        int databaseSizeBeforeTest = receiverResourceRepository.findAll().size();
        // set the field null
        receiverResource.setQuantity(null);

        // Create the ReceiverResource, which fails.

        restReceiverResourceMockMvc.perform(post("/api/receiver-resources").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(receiverResource)))
            .andExpect(status().isBadRequest());

        List<ReceiverResource> receiverResourceList = receiverResourceRepository.findAll();
        assertThat(receiverResourceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkDailyUseIsRequired() throws Exception {
        int databaseSizeBeforeTest = receiverResourceRepository.findAll().size();
        // set the field null
        receiverResource.setDailyUse(null);

        // Create the ReceiverResource, which fails.

        restReceiverResourceMockMvc.perform(post("/api/receiver-resources").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(receiverResource)))
            .andExpect(status().isBadRequest());

        List<ReceiverResource> receiverResourceList = receiverResourceRepository.findAll();
        assertThat(receiverResourceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllReceiverResources() throws Exception {
        // Initialize the database
        receiverResourceRepository.save(receiverResource);

        // Get all the receiverResourceList
        restReceiverResourceMockMvc.perform(get("/api/receiver-resources?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(receiverResource.getId())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY)))
            .andExpect(jsonPath("$.[*].dailyUse").value(hasItem(DEFAULT_DAILY_USE)))
            .andExpect(jsonPath("$.[*].currentStock").value(hasItem(DEFAULT_CURRENT_STOCK)))
            .andExpect(jsonPath("$.[*].notes").value(hasItem(DEFAULT_NOTES)));
    }
    
    @Test
    public void getReceiverResource() throws Exception {
        // Initialize the database
        receiverResourceRepository.save(receiverResource);

        // Get the receiverResource
        restReceiverResourceMockMvc.perform(get("/api/receiver-resources/{id}", receiverResource.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(receiverResource.getId()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY))
            .andExpect(jsonPath("$.dailyUse").value(DEFAULT_DAILY_USE))
            .andExpect(jsonPath("$.currentStock").value(DEFAULT_CURRENT_STOCK))
            .andExpect(jsonPath("$.notes").value(DEFAULT_NOTES));
    }

    @Test
    public void getNonExistingReceiverResource() throws Exception {
        // Get the receiverResource
        restReceiverResourceMockMvc.perform(get("/api/receiver-resources/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateReceiverResource() throws Exception {
        // Initialize the database
        receiverResourceRepository.save(receiverResource);

        int databaseSizeBeforeUpdate = receiverResourceRepository.findAll().size();

        // Update the receiverResource
        ReceiverResource updatedReceiverResource = receiverResourceRepository.findById(receiverResource.getId()).get();
        updatedReceiverResource
            .name(UPDATED_NAME)
            .quantity(UPDATED_QUANTITY)
            .dailyUse(UPDATED_DAILY_USE)
            .currentStock(UPDATED_CURRENT_STOCK)
            .notes(UPDATED_NOTES);

        restReceiverResourceMockMvc.perform(put("/api/receiver-resources").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedReceiverResource)))
            .andExpect(status().isOk());

        // Validate the ReceiverResource in the database
        List<ReceiverResource> receiverResourceList = receiverResourceRepository.findAll();
        assertThat(receiverResourceList).hasSize(databaseSizeBeforeUpdate);
        ReceiverResource testReceiverResource = receiverResourceList.get(receiverResourceList.size() - 1);
        assertThat(testReceiverResource.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testReceiverResource.getQuantity()).isEqualTo(UPDATED_QUANTITY);
        assertThat(testReceiverResource.getDailyUse()).isEqualTo(UPDATED_DAILY_USE);
        assertThat(testReceiverResource.getCurrentStock()).isEqualTo(UPDATED_CURRENT_STOCK);
        assertThat(testReceiverResource.getNotes()).isEqualTo(UPDATED_NOTES);

    }

    @Test
    public void updateNonExistingReceiverResource() throws Exception {
        int databaseSizeBeforeUpdate = receiverResourceRepository.findAll().size();

        // Create the ReceiverResource

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restReceiverResourceMockMvc.perform(put("/api/receiver-resources").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(receiverResource)))
            .andExpect(status().isBadRequest());

        // Validate the ReceiverResource in the database
        List<ReceiverResource> receiverResourceList = receiverResourceRepository.findAll();
        assertThat(receiverResourceList).hasSize(databaseSizeBeforeUpdate);

    }

    @Test
    public void deleteReceiverResource() throws Exception {
        // Initialize the database
        receiverResourceRepository.save(receiverResource);

        int databaseSizeBeforeDelete = receiverResourceRepository.findAll().size();

        // Delete the receiverResource
        restReceiverResourceMockMvc.perform(delete("/api/receiver-resources/{id}", receiverResource.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ReceiverResource> receiverResourceList = receiverResourceRepository.findAll();
        assertThat(receiverResourceList).hasSize(databaseSizeBeforeDelete - 1);

    }
}
