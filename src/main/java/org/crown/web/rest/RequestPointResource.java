package org.crown.web.rest;

import org.crown.domain.RequestPoint;
import org.crown.repository.RequestPointRepository;
import org.crown.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
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


/**
 * REST controller for managing {@link org.crown.domain.RequestPoint}.
 */
@RestController
@RequestMapping("/api")
public class RequestPointResource {

    private final Logger log = LoggerFactory.getLogger(RequestPointResource.class);

    private static final String ENTITY_NAME = "requestPoint";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RequestPointRepository requestPointRepository;


    public RequestPointResource(RequestPointRepository requestPointRepository) {
        this.requestPointRepository = requestPointRepository;
    }

    /**
     * {@code POST  /request-points} : Create a new requestPoint.
     *
     * @param requestPoint the requestPoint to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new requestPoint, or with status {@code 400 (Bad Request)} if the requestPoint has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/request-points")
    public ResponseEntity<RequestPoint> createRequestPoint(@Valid @RequestBody RequestPoint requestPoint) throws URISyntaxException {
        log.debug("REST request to save RequestPoint : {}", requestPoint);
        if (requestPoint.getId() != null) {
            throw new BadRequestAlertException("A new requestPoint cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RequestPoint result = requestPointRepository.save(requestPoint);
        return ResponseEntity.created(new URI("/api/request-points/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /request-points} : Updates an existing requestPoint.
     *
     * @param requestPoint the requestPoint to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated requestPoint,
     * or with status {@code 400 (Bad Request)} if the requestPoint is not valid,
     * or with status {@code 500 (Internal Server Error)} if the requestPoint couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/request-points")
    public ResponseEntity<RequestPoint> updateRequestPoint(@Valid @RequestBody RequestPoint requestPoint) throws URISyntaxException {
        log.debug("REST request to update RequestPoint : {}", requestPoint);
        if (requestPoint.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RequestPoint result = requestPointRepository.save(requestPoint);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, requestPoint.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /request-points} : get all the requestPoints.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of requestPoints in body.
     */
    @GetMapping("/request-points")
    public List<RequestPoint> getAllRequestPoints() {
        log.debug("REST request to get all RequestPoints");
        return requestPointRepository.findAll();
    }

    /**
     * {@code GET  /request-points/:id} : get the "id" requestPoint.
     *
     * @param id the id of the requestPoint to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the requestPoint, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/request-points/{id}")
    public ResponseEntity<RequestPoint> getRequestPoint(@PathVariable String id) {
        log.debug("REST request to get RequestPoint : {}", id);
        Optional<RequestPoint> requestPoint = requestPointRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(requestPoint);
    }

    /**
     * {@code DELETE  /request-points/:id} : delete the "id" requestPoint.
     *
     * @param id the id of the requestPoint to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/request-points/{id}")
    public ResponseEntity<Void> deleteRequestPoint(@PathVariable String id) {
        log.debug("REST request to delete RequestPoint : {}", id);
        requestPointRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }

}
