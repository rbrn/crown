package org.crown.web.rest;

import org.crown.domain.SupplyPointResource;
import org.crown.repository.SupplyPointResourceRepository;
import org.crown.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing {@link org.crown.domain.SupplyPointResource}.
 */
@RestController
@RequestMapping("/api")
public class SupplyPointResourceResource {

    private final Logger log = LoggerFactory.getLogger(SupplyPointResourceResource.class);

    private static final String ENTITY_NAME = "supplyPointResource";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SupplyPointResourceRepository supplyPointResourceRepository;

    public SupplyPointResourceResource(SupplyPointResourceRepository supplyPointResourceRepository) {
        this.supplyPointResourceRepository = supplyPointResourceRepository;
    }

    /**
     * {@code POST  /supply-point-resources} : Create a new supplyPointResource.
     *
     * @param supplyPointResource the supplyPointResource to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new supplyPointResource, or with status {@code 400 (Bad Request)} if the supplyPointResource has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/supply-point-resources")
    public ResponseEntity<SupplyPointResource> createSupplyPointResource(@RequestBody SupplyPointResource supplyPointResource) throws URISyntaxException {
        log.debug("REST request to save SupplyPointResource : {}", supplyPointResource);
        if (supplyPointResource.getId() != null) {
            throw new BadRequestAlertException("A new supplyPointResource cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SupplyPointResource result = supplyPointResourceRepository.save(supplyPointResource);
        return ResponseEntity.created(new URI("/api/supply-point-resources/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /supply-point-resources} : Updates an existing supplyPointResource.
     *
     * @param supplyPointResource the supplyPointResource to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated supplyPointResource,
     * or with status {@code 400 (Bad Request)} if the supplyPointResource is not valid,
     * or with status {@code 500 (Internal Server Error)} if the supplyPointResource couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/supply-point-resources")
    public ResponseEntity<SupplyPointResource> updateSupplyPointResource(@RequestBody SupplyPointResource supplyPointResource) throws URISyntaxException {
        log.debug("REST request to update SupplyPointResource : {}", supplyPointResource);
        if (supplyPointResource.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SupplyPointResource result = supplyPointResourceRepository.save(supplyPointResource);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, supplyPointResource.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /supply-point-resources} : get all the supplyPointResources.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of supplyPointResources in body.
     */
    @GetMapping("/supply-point-resources")
    public ResponseEntity<List<SupplyPointResource>> getAllSupplyPointResources(Pageable pageable) {
        log.debug("REST request to get a page of SupplyPointResources");
        Page<SupplyPointResource> page = supplyPointResourceRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /supply-point-resources/:id} : get the "id" supplyPointResource.
     *
     * @param id the id of the supplyPointResource to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the supplyPointResource, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/supply-point-resources/{id}")
    public ResponseEntity<SupplyPointResource> getSupplyPointResource(@PathVariable String id) {
        log.debug("REST request to get SupplyPointResource : {}", id);
        Optional<SupplyPointResource> supplyPointResource = supplyPointResourceRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(supplyPointResource);
    }

    /**
     * {@code DELETE  /supply-point-resources/:id} : delete the "id" supplyPointResource.
     *
     * @param id the id of the supplyPointResource to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/supply-point-resources/{id}")
    public ResponseEntity<Void> deleteSupplyPointResource(@PathVariable String id) {
        log.debug("REST request to delete SupplyPointResource : {}", id);
        supplyPointResourceRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }

}
