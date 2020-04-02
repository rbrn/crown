package org.crown.web.rest;

import org.crown.domain.RecieverSupplier;
import org.crown.repository.RecieverSupplierRepository;
import org.crown.repository.search.RecieverSupplierSearchRepository;
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
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link org.crown.domain.RecieverSupplier}.
 */
@RestController
@RequestMapping("/api")
public class RecieverSupplierResource {

    private final Logger log = LoggerFactory.getLogger(RecieverSupplierResource.class);

    private static final String ENTITY_NAME = "recieverSupplier";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RecieverSupplierRepository recieverSupplierRepository;

    private final RecieverSupplierSearchRepository recieverSupplierSearchRepository;

    public RecieverSupplierResource(RecieverSupplierRepository recieverSupplierRepository, RecieverSupplierSearchRepository recieverSupplierSearchRepository) {
        this.recieverSupplierRepository = recieverSupplierRepository;
        this.recieverSupplierSearchRepository = recieverSupplierSearchRepository;
    }

    /**
     * {@code POST  /reciever-suppliers} : Create a new recieverSupplier.
     *
     * @param recieverSupplier the recieverSupplier to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new recieverSupplier, or with status {@code 400 (Bad Request)} if the recieverSupplier has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/reciever-suppliers")
    public ResponseEntity<RecieverSupplier> createRecieverSupplier(@Valid @RequestBody RecieverSupplier recieverSupplier) throws URISyntaxException {
        log.debug("REST request to save RecieverSupplier : {}", recieverSupplier);
        if (recieverSupplier.getId() != null) {
            throw new BadRequestAlertException("A new recieverSupplier cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RecieverSupplier result = recieverSupplierRepository.save(recieverSupplier);
        recieverSupplierSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/reciever-suppliers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /reciever-suppliers} : Updates an existing recieverSupplier.
     *
     * @param recieverSupplier the recieverSupplier to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated recieverSupplier,
     * or with status {@code 400 (Bad Request)} if the recieverSupplier is not valid,
     * or with status {@code 500 (Internal Server Error)} if the recieverSupplier couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/reciever-suppliers")
    public ResponseEntity<RecieverSupplier> updateRecieverSupplier(@Valid @RequestBody RecieverSupplier recieverSupplier) throws URISyntaxException {
        log.debug("REST request to update RecieverSupplier : {}", recieverSupplier);
        if (recieverSupplier.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RecieverSupplier result = recieverSupplierRepository.save(recieverSupplier);
        recieverSupplierSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, recieverSupplier.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /reciever-suppliers} : get all the recieverSuppliers.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of recieverSuppliers in body.
     */
    @GetMapping("/reciever-suppliers")
    public ResponseEntity<List<RecieverSupplier>> getAllRecieverSuppliers(Pageable pageable) {
        log.debug("REST request to get a page of RecieverSuppliers");
        Page<RecieverSupplier> page = recieverSupplierRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /reciever-suppliers/:id} : get the "id" recieverSupplier.
     *
     * @param id the id of the recieverSupplier to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the recieverSupplier, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/reciever-suppliers/{id}")
    public ResponseEntity<RecieverSupplier> getRecieverSupplier(@PathVariable String id) {
        log.debug("REST request to get RecieverSupplier : {}", id);
        Optional<RecieverSupplier> recieverSupplier = recieverSupplierRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(recieverSupplier);
    }

    /**
     * {@code DELETE  /reciever-suppliers/:id} : delete the "id" recieverSupplier.
     *
     * @param id the id of the recieverSupplier to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/reciever-suppliers/{id}")
    public ResponseEntity<Void> deleteRecieverSupplier(@PathVariable String id) {
        log.debug("REST request to delete RecieverSupplier : {}", id);
        recieverSupplierRepository.deleteById(id);
        recieverSupplierSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }

    /**
     * {@code SEARCH  /_search/reciever-suppliers?query=:query} : search for the recieverSupplier corresponding
     * to the query.
     *
     * @param query the query of the recieverSupplier search.
     * @param pageable the pagination information.
     * @return the result of the search.
     */
    @GetMapping("/_search/reciever-suppliers")
    public ResponseEntity<List<RecieverSupplier>> searchRecieverSuppliers(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of RecieverSuppliers for query {}", query);
        Page<RecieverSupplier> page = recieverSupplierSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
}
