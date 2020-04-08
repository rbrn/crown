package org.crown.web.rest;

import org.crown.domain.ReceiverSupplier;
import org.crown.repository.ReceiverSupplierRepository;
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

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link org.crown.domain.ReceiverSupplier}.
 */
@RestController
@RequestMapping("/api")
public class ReceiverSupplierResource {

    private final Logger log = LoggerFactory.getLogger(ReceiverSupplierResource.class);

    private static final String ENTITY_NAME = "receiverSupplier";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ReceiverSupplierRepository receiverSupplierRepository;

    public ReceiverSupplierResource(ReceiverSupplierRepository receiverSupplierRepository) {
        this.receiverSupplierRepository = receiverSupplierRepository;
    }

    /**
     * {@code POST  /receiver-suppliers} : Create a new receiverSupplier.
     *
     * @param receiverSupplier the receiverSupplier to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new receiverSupplier, or with status {@code 400 (Bad Request)} if the receiverSupplier has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/receiver-suppliers")
    public ResponseEntity<ReceiverSupplier> createReceiverSupplier(@Valid @RequestBody ReceiverSupplier receiverSupplier) throws URISyntaxException {
        log.debug("REST request to save ReceiverSupplier : {}", receiverSupplier);
        if (receiverSupplier.getId() != null) {
            throw new BadRequestAlertException("A new receiverSupplier cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ReceiverSupplier result = receiverSupplierRepository.save(receiverSupplier);
        return ResponseEntity.created(new URI("/api/receiver-suppliers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /receiver-suppliers} : Updates an existing receiverSupplier.
     *
     * @param receiverSupplier the receiverSupplier to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated receiverSupplier,
     * or with status {@code 400 (Bad Request)} if the receiverSupplier is not valid,
     * or with status {@code 500 (Internal Server Error)} if the receiverSupplier couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/receiver-suppliers")
    public ResponseEntity<ReceiverSupplier> updateReceiverSupplier(@Valid @RequestBody ReceiverSupplier receiverSupplier) throws URISyntaxException {
        log.debug("REST request to update ReceiverSupplier : {}", receiverSupplier);
        if (receiverSupplier.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ReceiverSupplier result = receiverSupplierRepository.save(receiverSupplier);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, receiverSupplier.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /receiver-suppliers} : get all the receiverSuppliers.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of receiverSuppliers in body.
     */
    @GetMapping("/receiver-suppliers")
    public ResponseEntity<List<ReceiverSupplier>> getAllReceiverSuppliers(Pageable pageable) {
        log.debug("REST request to get a page of ReceiverSuppliers");
        Page<ReceiverSupplier> page = receiverSupplierRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /receiver-suppliers/:id} : get the "id" receiverSupplier.
     *
     * @param id the id of the receiverSupplier to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the receiverSupplier, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/receiver-suppliers/{id}")
    public ResponseEntity<ReceiverSupplier> getReceiverSupplier(@PathVariable String id) {
        log.debug("REST request to get ReceiverSupplier : {}", id);
        Optional<ReceiverSupplier> receiverSupplier = receiverSupplierRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(receiverSupplier);
    }

    /**
     * {@code DELETE  /receiver-suppliers/:id} : delete the "id" receiverSupplier.
     *
     * @param id the id of the receiverSupplier to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/receiver-suppliers/{id}")
    public ResponseEntity<Void> deleteReceiverSupplier(@PathVariable String id) {
        log.debug("REST request to delete ReceiverSupplier : {}", id);
        receiverSupplierRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
