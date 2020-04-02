package org.crown.web.rest;

import org.crown.domain.Request;
import org.crown.domain.SupplyPoint;
import org.crown.repository.SupplyPointRepository;
import org.crown.repository.search.SupplyPointSearchRepository;
import org.crown.service.RequestListService;
import org.crown.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.support.PagedListHolder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
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
 * REST controller for managing {@link org.crown.domain.SupplyPoint}.
 */
@RestController
@RequestMapping("/api")
public class SupplyPointResource {

    private final Logger log = LoggerFactory.getLogger(SupplyPointResource.class);

    private static final String ENTITY_NAME = "supplyPoint";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SupplyPointRepository supplyPointRepository;

    private final SupplyPointSearchRepository supplyPointSearchRepository;

    private final RequestListService requestListService;

    public SupplyPointResource(SupplyPointRepository supplyPointRepository, SupplyPointSearchRepository supplyPointSearchRepository, RequestListService requestListService) {
        this.supplyPointRepository = supplyPointRepository;
        this.supplyPointSearchRepository = supplyPointSearchRepository;
        this.requestListService = requestListService;
    }

    /**
     * {@code POST  /supply-points} : Create a new supplyPoint.
     *
     * @param supplyPoint the supplyPoint to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new supplyPoint, or with status {@code 400 (Bad Request)} if the supplyPoint has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/supply-points")
    public ResponseEntity<SupplyPoint> createSupplyPoint(@Valid @RequestBody SupplyPoint supplyPoint) throws URISyntaxException {
        log.debug("REST request to save SupplyPoint : {}", supplyPoint);
        if (supplyPoint.getId() != null) {
            throw new BadRequestAlertException("A new supplyPoint cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SupplyPoint result = supplyPointRepository.save(supplyPoint);
        supplyPointSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/supply-points/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /supply-points} : Updates an existing supplyPoint.
     *
     * @param supplyPoint the supplyPoint to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated supplyPoint,
     * or with status {@code 400 (Bad Request)} if the supplyPoint is not valid,
     * or with status {@code 500 (Internal Server Error)} if the supplyPoint couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/supply-points")
    public ResponseEntity<SupplyPoint> updateSupplyPoint(@Valid @RequestBody SupplyPoint supplyPoint) throws URISyntaxException {
        log.debug("REST request to update SupplyPoint : {}", supplyPoint);
        if (supplyPoint.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SupplyPoint result = supplyPointRepository.save(supplyPoint);
        supplyPointSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, supplyPoint.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /supply-points} : get all the supplyPoints.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of supplyPoints in body.
     */
    @GetMapping("/supply-points")
    public ResponseEntity<List<SupplyPoint>> getAllSupplyPoints(Pageable pageable) {
        log.debug("REST request to get a page of SupplyPoints");
        Page<SupplyPoint> page = supplyPointRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /supply-points/:id} : get the "id" supplyPoint.
     *
     * @param id the id of the supplyPoint to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the supplyPoint, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/supply-points/{id}")
    public ResponseEntity<SupplyPoint> getSupplyPoint(@PathVariable String id) {
        log.debug("REST request to get SupplyPoint : {}", id);
        Optional<SupplyPoint> supplyPoint = supplyPointRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(supplyPoint);
    }

    /**
     * {@code DELETE  /supply-points/:id} : delete the "id" supplyPoint.
     *
     * @param id the id of the supplyPoint to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/supply-points/{id}")
    public ResponseEntity<Void> deleteSupplyPoint(@PathVariable String id) {
        log.debug("REST request to delete SupplyPoint : {}", id);
        supplyPointRepository.deleteById(id);
        supplyPointSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }

    /**
     * {@code SEARCH  /_search/supply-points?query=:query} : search for the supplyPoint corresponding
     * to the query.
     *
     * @param query the query of the supplyPoint search.
     * @param pageable the pagination information.
     * @return the result of the search.
     */
    @GetMapping("/_search/supply-points")
    public ResponseEntity<List<SupplyPoint>> searchSupplyPoints(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of SupplyPoints for query {}", query);
        Page<SupplyPoint> page = supplyPointSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code SEARCH  /supply-point/{id}/itemid/{id}/urgent} : return the most urgent requests
     * to the query.
     *
     * @param supplyPointId the id of the supplyPoint to retrieve.
     * @param itemId the item id of the item urgent list to retrieve
     * @return a list of requests
     */
    @GetMapping("/supply-point/{supplyPointId}/itemid/{itemId}/urgent")
    public ResponseEntity<List<Request>> supplyPointUrgentRequests(@PathVariable String supplyPointId, @PathVariable String itemId) {
        log.debug("REST request to retrieve most urgent requests for a supply point {}, item {}", supplyPointId, itemId);

        Optional<SupplyPoint> optionalSupplyPoint = supplyPointRepository.findById(supplyPointId);
        if (!optionalSupplyPoint.isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);

        return ResponseEntity.ok().body(requestListService.mostUrgentRequests(optionalSupplyPoint.get(), itemId));
    }


}
