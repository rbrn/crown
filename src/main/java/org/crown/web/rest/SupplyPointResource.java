package org.crown.web.rest;

import org.crown.service.SupplyPointService;
import org.crown.web.rest.errors.BadRequestAlertException;
import org.crown.service.dto.SupplyPointDTO;

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
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
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

    private final SupplyPointService supplyPointService;

    public SupplyPointResource(SupplyPointService supplyPointService) {
        this.supplyPointService = supplyPointService;
    }

    /**
     * {@code POST  /supply-points} : Create a new supplyPoint.
     *
     * @param supplyPointDTO the supplyPointDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new supplyPointDTO, or with status {@code 400 (Bad Request)} if the supplyPoint has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/supply-points")
    public ResponseEntity<SupplyPointDTO> createSupplyPoint(@Valid @RequestBody SupplyPointDTO supplyPointDTO) throws URISyntaxException {
        log.debug("REST request to save SupplyPoint : {}", supplyPointDTO);
        if (supplyPointDTO.getId() != null) {
            throw new BadRequestAlertException("A new supplyPoint cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SupplyPointDTO result = supplyPointService.save(supplyPointDTO);
        return ResponseEntity.created(new URI("/api/supply-points/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /supply-points} : Updates an existing supplyPoint.
     *
     * @param supplyPointDTO the supplyPointDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated supplyPointDTO,
     * or with status {@code 400 (Bad Request)} if the supplyPointDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the supplyPointDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/supply-points")
    public ResponseEntity<SupplyPointDTO> updateSupplyPoint(@Valid @RequestBody SupplyPointDTO supplyPointDTO) throws URISyntaxException {
        log.debug("REST request to update SupplyPoint : {}", supplyPointDTO);
        if (supplyPointDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SupplyPointDTO result = supplyPointService.save(supplyPointDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, supplyPointDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /supply-points} : get all the supplyPoints.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of supplyPoints in body.
     */
    @GetMapping("/supply-points")
    public ResponseEntity<List<SupplyPointDTO>> getAllSupplyPoints(Pageable pageable) {
        log.debug("REST request to get a page of SupplyPoints");
        Page<SupplyPointDTO> page = supplyPointService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /supply-points/:id} : get the "id" supplyPoint.
     *
     * @param id the id of the supplyPointDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the supplyPointDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/supply-points/{id}")
    public ResponseEntity<SupplyPointDTO> getSupplyPoint(@PathVariable String id) {
        log.debug("REST request to get SupplyPoint : {}", id);
        Optional<SupplyPointDTO> supplyPointDTO = supplyPointService.findOne(id);
        return ResponseUtil.wrapOrNotFound(supplyPointDTO);
    }

    /**
     * {@code DELETE  /supply-points/:id} : delete the "id" supplyPoint.
     *
     * @param id the id of the supplyPointDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/supply-points/{id}")
    public ResponseEntity<Void> deleteSupplyPoint(@PathVariable String id) {
        log.debug("REST request to delete SupplyPoint : {}", id);
        supplyPointService.delete(id);
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
    public ResponseEntity<List<SupplyPointDTO>> searchSupplyPoints(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of SupplyPoints for query {}", query);
        Page<SupplyPointDTO> page = supplyPointService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
}
