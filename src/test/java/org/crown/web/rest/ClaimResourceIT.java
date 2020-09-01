package org.crown.web.rest;

import org.crown.CrownApp;
import org.crown.domain.Claim;
import org.crown.domain.ReceiverResource;
import org.crown.domain.SupplierResource;
import org.crown.repository.ClaimRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.crown.domain.enumeration.ClaimStatusEnum;
/**
 * Integration tests for the {@link ClaimResource} REST controller.
 */
@SpringBootTest(classes = CrownApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class ClaimResourceIT {

    private static final Integer DEFAULT_QUANTITY = 1;
    private static final Integer UPDATED_QUANTITY = 2;

    private static final String DEFAULT_NOTES = "AAAAAAAAAA";
    private static final String UPDATED_NOTES = "BBBBBBBBBB";

    private static final ClaimStatusEnum DEFAULT_STATUS = ClaimStatusEnum.PENDING;
    private static final ClaimStatusEnum UPDATED_STATUS = ClaimStatusEnum.INREVIEW;

    @Autowired
    private ClaimRepository claimRepository;

    @Autowired
    private MockMvc restClaimMockMvc;

    private Claim claim;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Claim createEntity() {
        Claim claim = new Claim()
            .quantity(DEFAULT_QUANTITY)
            .notes(DEFAULT_NOTES)
            .status(DEFAULT_STATUS);
        // Add required entity
        ReceiverResource receiverResource;
        receiverResource = ReceiverResourceResourceIT.createEntity();
        receiverResource.setId("fixed-id-for-tests");
        claim.setReceiverResource(receiverResource);
        // Add required entity
        SupplierResource supplierResource;
        supplierResource = SupplierResourceResourceIT.createEntity();
        supplierResource.setId("fixed-id-for-tests");
        claim.setSupplierResource(supplierResource);
        return claim;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Claim createUpdatedEntity() {
        Claim claim = new Claim()
            .quantity(UPDATED_QUANTITY)
            .notes(UPDATED_NOTES)
            .status(UPDATED_STATUS);
        // Add required entity
        ReceiverResource receiverResource;
        receiverResource = ReceiverResourceResourceIT.createUpdatedEntity();
        receiverResource.setId("fixed-id-for-tests");
        claim.setReceiverResource(receiverResource);
        // Add required entity
        SupplierResource supplierResource;
        supplierResource = SupplierResourceResourceIT.createUpdatedEntity();
        supplierResource.setId("fixed-id-for-tests");
        claim.setSupplierResource(supplierResource);
        return claim;
    }

    @BeforeEach
    public void initTest() {
        claimRepository.deleteAll();
        claim = createEntity();
    }

    @Test
    public void createClaim() throws Exception {
        int databaseSizeBeforeCreate = claimRepository.findAll().size();

        // Create the Claim
        restClaimMockMvc.perform(post("/api/claims").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(claim)))
            .andExpect(status().isCreated());

        // Validate the Claim in the database
        List<Claim> claimList = claimRepository.findAll();
        assertThat(claimList).hasSize(databaseSizeBeforeCreate + 1);
        Claim testClaim = claimList.get(claimList.size() - 1);
        assertThat(testClaim.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
        assertThat(testClaim.getNotes()).isEqualTo(DEFAULT_NOTES);
        assertThat(testClaim.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    public void createClaimWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = claimRepository.findAll().size();

        // Create the Claim with an existing ID
        claim.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restClaimMockMvc.perform(post("/api/claims").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(claim)))
            .andExpect(status().isBadRequest());

        // Validate the Claim in the database
        List<Claim> claimList = claimRepository.findAll();
        assertThat(claimList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void checkQuantityIsRequired() throws Exception {
        int databaseSizeBeforeTest = claimRepository.findAll().size();
        // set the field null
        claim.setQuantity(null);

        // Create the Claim, which fails.

        restClaimMockMvc.perform(post("/api/claims").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(claim)))
            .andExpect(status().isBadRequest());

        List<Claim> claimList = claimRepository.findAll();
        assertThat(claimList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllClaims() throws Exception {
        // Initialize the database
        claimRepository.save(claim);

        // Get all the claimList
        restClaimMockMvc.perform(get("/api/claims?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(claim.getId())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY)))
            .andExpect(jsonPath("$.[*].notes").value(hasItem(DEFAULT_NOTES)))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }
    
    @Test
    public void getClaim() throws Exception {
        // Initialize the database
        claimRepository.save(claim);

        // Get the claim
        restClaimMockMvc.perform(get("/api/claims/{id}", claim.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(claim.getId()))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY))
            .andExpect(jsonPath("$.notes").value(DEFAULT_NOTES))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }

    @Test
    public void getNonExistingClaim() throws Exception {
        // Get the claim
        restClaimMockMvc.perform(get("/api/claims/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateClaim() throws Exception {
        // Initialize the database
        claimRepository.save(claim);

        int databaseSizeBeforeUpdate = claimRepository.findAll().size();

        // Update the claim
        Claim updatedClaim = claimRepository.findById(claim.getId()).get();
        updatedClaim
            .quantity(UPDATED_QUANTITY)
            .notes(UPDATED_NOTES)
            .status(UPDATED_STATUS);

        restClaimMockMvc.perform(put("/api/claims").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedClaim)))
            .andExpect(status().isOk());

        // Validate the Claim in the database
        List<Claim> claimList = claimRepository.findAll();
        assertThat(claimList).hasSize(databaseSizeBeforeUpdate);
        Claim testClaim = claimList.get(claimList.size() - 1);
        assertThat(testClaim.getQuantity()).isEqualTo(UPDATED_QUANTITY);
        assertThat(testClaim.getNotes()).isEqualTo(UPDATED_NOTES);
        assertThat(testClaim.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    public void updateNonExistingClaim() throws Exception {
        int databaseSizeBeforeUpdate = claimRepository.findAll().size();

        // Create the Claim

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restClaimMockMvc.perform(put("/api/claims").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(claim)))
            .andExpect(status().isBadRequest());

        // Validate the Claim in the database
        List<Claim> claimList = claimRepository.findAll();
        assertThat(claimList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteClaim() throws Exception {
        // Initialize the database
        claimRepository.save(claim);

        int databaseSizeBeforeDelete = claimRepository.findAll().size();

        // Delete the claim
        restClaimMockMvc.perform(delete("/api/claims/{id}", claim.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Claim> claimList = claimRepository.findAll();
        assertThat(claimList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
