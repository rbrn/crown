package org.crown.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.apache.logging.log4j.util.Strings;
import org.crown.domain.SupplierResource;
import org.crown.repository.SupplierResourceRepository;
import org.crown.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.GeoPage;
import org.springframework.data.geo.GeoResult;
import org.springframework.data.geo.Metrics;
import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link org.crown.domain.SupplierResource}.
 */
@RestController
@RequestMapping("/api")
public class SupplierResourceResource {

    private final Logger log = LoggerFactory.getLogger(SupplierResourceResource.class);

    private static final String ENTITY_NAME = "supplierResource";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SupplierResourceRepository supplierResourceRepository;


    public SupplierResourceResource(SupplierResourceRepository supplierResourceRepository) {
        this.supplierResourceRepository = supplierResourceRepository;
    }

    /**
     * {@code POST  /supplier-resources} : Create a new supplierResource.
     *
     * @param supplierResource the supplierResource to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new supplierResource, or with status {@code 400 (Bad Request)} if the supplierResource has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/supplier-resources")
    public ResponseEntity<SupplierResource> createSupplierResource(@Valid @RequestBody SupplierResource supplierResource) throws URISyntaxException {
        log.debug("REST request to save SupplierResource : {}", supplierResource);
        if (supplierResource.getId() != null) {
            throw new BadRequestAlertException("A new supplierResource cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SupplierResource result = supplierResourceRepository.save(supplierResource);
        return ResponseEntity.created(new URI("/api/supplier-resources/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /supplier-resources} : Updates an existing supplierResource.
     *
     * @param supplierResource the supplierResource to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated supplierResource,
     * or with status {@code 400 (Bad Request)} if the supplierResource is not valid,
     * or with status {@code 500 (Internal Server Error)} if the supplierResource couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/supplier-resources")
    public ResponseEntity<SupplierResource> updateSupplierResource(@Valid @RequestBody SupplierResource supplierResource) throws URISyntaxException {
        log.debug("REST request to update SupplierResource : {}", supplierResource);
        if (supplierResource.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SupplierResource result = supplierResourceRepository.save(supplierResource);        
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, supplierResource.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /supplier-resources} : get all the supplierResources.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of supplierResources in body.
     */
    @GetMapping("/supplier-resources")
    public ResponseEntity<List<SupplierResource>> getAllSupplierResources(Pageable pageable) {
        log.debug("REST request to get a page of SupplierResources");
        Page<SupplierResource> page = supplierResourceRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /supplier-resources/:id} : get the "id" supplierResource.
     *
     * @param id the id of the supplierResource to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the supplierResource, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/supplier-resources/{id}")
    public ResponseEntity<SupplierResource> getSupplierResource(@PathVariable String id) {
        log.debug("REST request to get SupplierResource : {}", id);
        Optional<SupplierResource> supplierResource = supplierResourceRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(supplierResource);
    }

    /**
     * {@code DELETE  /supplier-resources/:id} : delete the "id" supplierResource.
     *
     * @param id the id of the supplierResource to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/supplier-resources/{id}")
    public ResponseEntity<Void> deleteSupplierResource(@PathVariable String id) {
        log.debug("REST request to delete SupplierResource : {}", id);
        supplierResourceRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }

    
    /**
     * {@code SEARCH  /_search/receiver-resources?x=:x&y=:y&distance=:distance} : geo search - search for the receiverResource corresponding
     * to the query.
     *
     * @param x
     * @param y
     * @param distance - distance in meters
     * @return the result of the search.
     */
    @GetMapping("/_search/supplier-resources")
    public ResponseEntity<?> searchReceiverResources(@RequestParam double x, double y, 
    		double distance, Pageable pageable, String units) {
        log.debug("REST request to search for a page of SupplierResources for longitude: {} latitude:{} distance: {}", x, y, distance);
        Point point = new Point(x, y);
        Metrics metrics = Metrics.MILES;
        if(!Strings.isBlank(units) && units.equals("km"))
        	 metrics = Metrics.KILOMETERS;        
		Distance dist = new Distance(distance, metrics);
		GeoPage<SupplierResource> page = supplierResourceRepository.findByPositionNear(point, dist, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
}
