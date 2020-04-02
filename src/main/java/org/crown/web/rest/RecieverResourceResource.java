package org.crown.web.rest;

import org.crown.domain.RecieverResource;
import org.crown.repository.RecieverResourceRepository;
import org.crown.repository.search.RecieverResourceSearchRepository;
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
 * REST controller for managing {@link org.crown.domain.RecieverResource}.
 */
@RestController
@RequestMapping("/api")
public class RecieverResourceResource {

    private final Logger log = LoggerFactory.getLogger(RecieverResourceResource.class);

    private static final String ENTITY_NAME = "recieverResource";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RecieverResourceRepository recieverResourceRepository;

    private final RecieverResourceSearchRepository recieverResourceSearchRepository;

    public RecieverResourceResource(RecieverResourceRepository recieverResourceRepository, RecieverResourceSearchRepository recieverResourceSearchRepository) {
        this.recieverResourceRepository = recieverResourceRepository;
        this.recieverResourceSearchRepository = recieverResourceSearchRepository;
    }

    /**
     * {@code POST  /reciever-resources} : Create a new recieverResource.
     *
     * @param recieverResource the recieverResource to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new recieverResource, or with status {@code 400 (Bad Request)} if the recieverResource has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/reciever-resources")
    public ResponseEntity<RecieverResource> createRecieverResource(@Valid @RequestBody RecieverResource recieverResource) throws URISyntaxException {
        log.debug("REST request to save RecieverResource : {}", recieverResource);
        if (recieverResource.getId() != null) {
            throw new BadRequestAlertException("A new recieverResource cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RecieverResource result = recieverResourceRepository.save(recieverResource);
        recieverResourceSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/reciever-resources/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /reciever-resources} : Updates an existing recieverResource.
     *
     * @param recieverResource the recieverResource to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated recieverResource,
     * or with status {@code 400 (Bad Request)} if the recieverResource is not valid,
     * or with status {@code 500 (Internal Server Error)} if the recieverResource couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/reciever-resources")
    public ResponseEntity<RecieverResource> updateRecieverResource(@Valid @RequestBody RecieverResource recieverResource) throws URISyntaxException {
        log.debug("REST request to update RecieverResource : {}", recieverResource);
        if (recieverResource.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RecieverResource result = recieverResourceRepository.save(recieverResource);
        recieverResourceSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, recieverResource.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /reciever-resources} : get all the recieverResources.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of recieverResources in body.
     */
    @GetMapping("/reciever-resources")
    public ResponseEntity<List<RecieverResource>> getAllRecieverResources(Pageable pageable) {
        log.debug("REST request to get a page of RecieverResources");
        Page<RecieverResource> page = recieverResourceRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /reciever-resources/:id} : get the "id" recieverResource.
     *
     * @param id the id of the recieverResource to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the recieverResource, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/reciever-resources/{id}")
    public ResponseEntity<RecieverResource> getRecieverResource(@PathVariable String id) {
        log.debug("REST request to get RecieverResource : {}", id);
        Optional<RecieverResource> recieverResource = recieverResourceRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(recieverResource);
    }

    /**
     * {@code DELETE  /reciever-resources/:id} : delete the "id" recieverResource.
     *
     * @param id the id of the recieverResource to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/reciever-resources/{id}")
    public ResponseEntity<Void> deleteRecieverResource(@PathVariable String id) {
        log.debug("REST request to delete RecieverResource : {}", id);
        recieverResourceRepository.deleteById(id);
        recieverResourceSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }

    /**
     * {@code SEARCH  /_search/reciever-resources?query=:query} : search for the recieverResource corresponding
     * to the query.
     *
     * @param query the query of the recieverResource search.
     * @param pageable the pagination information.
     * @return the result of the search.
     */
    @GetMapping("/_search/reciever-resources")
    public ResponseEntity<List<RecieverResource>> searchRecieverResources(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of RecieverResources for query {}", query);
        Page<RecieverResource> page = recieverResourceSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
}
