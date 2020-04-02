package org.crown.web.rest;

import org.crown.CrownApp;
import org.crown.domain.Delivery;
import org.crown.repository.DeliveryRepository;
import org.crown.repository.search.DeliverySearchRepository;

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
 * Integration tests for the {@link DeliveryResource} REST controller.
 */
@SpringBootTest(classes = CrownApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class DeliveryResourceIT {

    private static final String DEFAULT_DELIVERY_CONTACT = "AAAAAAAAAA";
    private static final String UPDATED_DELIVERY_CONTACT = "BBBBBBBBBB";

    private static final String DEFAULT_PHONE_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_PHONE_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_NOTES = "AAAAAAAAAA";
    private static final String UPDATED_NOTES = "BBBBBBBBBB";

    @Autowired
    private DeliveryRepository deliveryRepository;

    /**
     * This repository is mocked in the org.crown.repository.search test package.
     *
     * @see org.crown.repository.search.DeliverySearchRepositoryMockConfiguration
     */
    @Autowired
    private DeliverySearchRepository mockDeliverySearchRepository;

    @Autowired
    private MockMvc restDeliveryMockMvc;

    private Delivery delivery;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Delivery createEntity() {
        Delivery delivery = new Delivery()
            .deliveryContact(DEFAULT_DELIVERY_CONTACT)
            .phoneNumber(DEFAULT_PHONE_NUMBER)
            .notes(DEFAULT_NOTES);
        return delivery;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Delivery createUpdatedEntity() {
        Delivery delivery = new Delivery()
            .deliveryContact(UPDATED_DELIVERY_CONTACT)
            .phoneNumber(UPDATED_PHONE_NUMBER)
            .notes(UPDATED_NOTES);
        return delivery;
    }

    @BeforeEach
    public void initTest() {
        deliveryRepository.deleteAll();
        delivery = createEntity();
    }

    @Test
    public void createDelivery() throws Exception {
        int databaseSizeBeforeCreate = deliveryRepository.findAll().size();

        // Create the Delivery
        restDeliveryMockMvc.perform(post("/api/deliveries").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(delivery)))
            .andExpect(status().isCreated());

        // Validate the Delivery in the database
        List<Delivery> deliveryList = deliveryRepository.findAll();
        assertThat(deliveryList).hasSize(databaseSizeBeforeCreate + 1);
        Delivery testDelivery = deliveryList.get(deliveryList.size() - 1);
        assertThat(testDelivery.getDeliveryContact()).isEqualTo(DEFAULT_DELIVERY_CONTACT);
        assertThat(testDelivery.getPhoneNumber()).isEqualTo(DEFAULT_PHONE_NUMBER);
        assertThat(testDelivery.getNotes()).isEqualTo(DEFAULT_NOTES);

        // Validate the Delivery in Elasticsearch
        verify(mockDeliverySearchRepository, times(1)).save(testDelivery);
    }

    @Test
    public void createDeliveryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = deliveryRepository.findAll().size();

        // Create the Delivery with an existing ID
        delivery.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restDeliveryMockMvc.perform(post("/api/deliveries").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(delivery)))
            .andExpect(status().isBadRequest());

        // Validate the Delivery in the database
        List<Delivery> deliveryList = deliveryRepository.findAll();
        assertThat(deliveryList).hasSize(databaseSizeBeforeCreate);

        // Validate the Delivery in Elasticsearch
        verify(mockDeliverySearchRepository, times(0)).save(delivery);
    }


    @Test
    public void checkDeliveryContactIsRequired() throws Exception {
        int databaseSizeBeforeTest = deliveryRepository.findAll().size();
        // set the field null
        delivery.setDeliveryContact(null);

        // Create the Delivery, which fails.

        restDeliveryMockMvc.perform(post("/api/deliveries").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(delivery)))
            .andExpect(status().isBadRequest());

        List<Delivery> deliveryList = deliveryRepository.findAll();
        assertThat(deliveryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkPhoneNumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = deliveryRepository.findAll().size();
        // set the field null
        delivery.setPhoneNumber(null);

        // Create the Delivery, which fails.

        restDeliveryMockMvc.perform(post("/api/deliveries").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(delivery)))
            .andExpect(status().isBadRequest());

        List<Delivery> deliveryList = deliveryRepository.findAll();
        assertThat(deliveryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllDeliveries() throws Exception {
        // Initialize the database
        deliveryRepository.save(delivery);

        // Get all the deliveryList
        restDeliveryMockMvc.perform(get("/api/deliveries?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(delivery.getId())))
            .andExpect(jsonPath("$.[*].deliveryContact").value(hasItem(DEFAULT_DELIVERY_CONTACT)))
            .andExpect(jsonPath("$.[*].phoneNumber").value(hasItem(DEFAULT_PHONE_NUMBER)))
            .andExpect(jsonPath("$.[*].notes").value(hasItem(DEFAULT_NOTES)));
    }
    
    @Test
    public void getDelivery() throws Exception {
        // Initialize the database
        deliveryRepository.save(delivery);

        // Get the delivery
        restDeliveryMockMvc.perform(get("/api/deliveries/{id}", delivery.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(delivery.getId()))
            .andExpect(jsonPath("$.deliveryContact").value(DEFAULT_DELIVERY_CONTACT))
            .andExpect(jsonPath("$.phoneNumber").value(DEFAULT_PHONE_NUMBER))
            .andExpect(jsonPath("$.notes").value(DEFAULT_NOTES));
    }

    @Test
    public void getNonExistingDelivery() throws Exception {
        // Get the delivery
        restDeliveryMockMvc.perform(get("/api/deliveries/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateDelivery() throws Exception {
        // Initialize the database
        deliveryRepository.save(delivery);

        int databaseSizeBeforeUpdate = deliveryRepository.findAll().size();

        // Update the delivery
        Delivery updatedDelivery = deliveryRepository.findById(delivery.getId()).get();
        updatedDelivery
            .deliveryContact(UPDATED_DELIVERY_CONTACT)
            .phoneNumber(UPDATED_PHONE_NUMBER)
            .notes(UPDATED_NOTES);

        restDeliveryMockMvc.perform(put("/api/deliveries").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedDelivery)))
            .andExpect(status().isOk());

        // Validate the Delivery in the database
        List<Delivery> deliveryList = deliveryRepository.findAll();
        assertThat(deliveryList).hasSize(databaseSizeBeforeUpdate);
        Delivery testDelivery = deliveryList.get(deliveryList.size() - 1);
        assertThat(testDelivery.getDeliveryContact()).isEqualTo(UPDATED_DELIVERY_CONTACT);
        assertThat(testDelivery.getPhoneNumber()).isEqualTo(UPDATED_PHONE_NUMBER);
        assertThat(testDelivery.getNotes()).isEqualTo(UPDATED_NOTES);

        // Validate the Delivery in Elasticsearch
        verify(mockDeliverySearchRepository, times(1)).save(testDelivery);
    }

    @Test
    public void updateNonExistingDelivery() throws Exception {
        int databaseSizeBeforeUpdate = deliveryRepository.findAll().size();

        // Create the Delivery

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDeliveryMockMvc.perform(put("/api/deliveries").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(delivery)))
            .andExpect(status().isBadRequest());

        // Validate the Delivery in the database
        List<Delivery> deliveryList = deliveryRepository.findAll();
        assertThat(deliveryList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Delivery in Elasticsearch
        verify(mockDeliverySearchRepository, times(0)).save(delivery);
    }

    @Test
    public void deleteDelivery() throws Exception {
        // Initialize the database
        deliveryRepository.save(delivery);

        int databaseSizeBeforeDelete = deliveryRepository.findAll().size();

        // Delete the delivery
        restDeliveryMockMvc.perform(delete("/api/deliveries/{id}", delivery.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Delivery> deliveryList = deliveryRepository.findAll();
        assertThat(deliveryList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Delivery in Elasticsearch
        verify(mockDeliverySearchRepository, times(1)).deleteById(delivery.getId());
    }

    @Test
    public void searchDelivery() throws Exception {
        // Initialize the database
        deliveryRepository.save(delivery);
        when(mockDeliverySearchRepository.search(queryStringQuery("id:" + delivery.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(delivery), PageRequest.of(0, 1), 1));
        // Search the delivery
        restDeliveryMockMvc.perform(get("/api/_search/deliveries?query=id:" + delivery.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(delivery.getId())))
            .andExpect(jsonPath("$.[*].deliveryContact").value(hasItem(DEFAULT_DELIVERY_CONTACT)))
            .andExpect(jsonPath("$.[*].phoneNumber").value(hasItem(DEFAULT_PHONE_NUMBER)))
            .andExpect(jsonPath("$.[*].notes").value(hasItem(DEFAULT_NOTES)));
    }
}
