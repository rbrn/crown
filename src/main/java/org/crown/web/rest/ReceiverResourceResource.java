package org.crown.web.rest;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;

import org.apache.logging.log4j.util.Strings;
import org.crown.domain.ReceiverResource;
import org.crown.domain.ReceiverSupplier;
import org.crown.domain.SupplierResource;
import org.crown.repository.ReceiverResourceRepository;
import org.crown.repository.ReceiverSupplierRepository;
import org.crown.service.ReceiverResourceService;
import org.crown.service.UserService;
import org.crown.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.GeoPage;
import org.springframework.data.geo.Metrics;
import org.springframework.data.geo.Point;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostFilter;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.crown.service.dto.UserDTO;
import java.util.Set;


/**
 * REST controller for managing {@link ReceiverResource}.
 */
@RestController
@RequestMapping("/api")
public class ReceiverResourceResource {

    private final Logger log = LoggerFactory.getLogger(ReceiverResourceResource.class);

    private static final String ENTITY_NAME = "receiverResource";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ReceiverResourceRepository receiverResourceRepository;
    private final ReceiverResourceService receiverResourceService;
    private final UserService userService;

    public ReceiverResourceResource(ReceiverResourceRepository receiverResourceRepository, ReceiverResourceService receiverResourceService, UserService userService) {
        this.receiverResourceRepository = receiverResourceRepository;
        this.receiverResourceService = receiverResourceService;
        this.userService = userService;
    }

    @Autowired
    private ReceiverSupplierRepository receiverSupplierRepository;

    /**
     * {@code POST  /receiver-resources} : Create a new receiverResource.
     *
     * @param receiverResource the receiverResource to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new receiverResource, or with status {@code 400 (Bad Request)} if the receiverResource has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/receiver-resources")
    public ResponseEntity<ReceiverResource> createReceiverResource(@Valid @RequestBody ReceiverResource receiverResource) throws URISyntaxException {
        log.debug("REST request to save ReceiverResource : {}", receiverResource);
        if (receiverResource.getId() != null) {
            throw new BadRequestAlertException("A new receiverResource cannot already have an ID", ENTITY_NAME, "idexists");
        }


        if(receiverSupplierRepository.countAllByEmail(receiverResource.getReceiver().getEmail()) == 0){
            ReceiverSupplier receiverSupplier =  receiverSupplierRepository.save(receiverResource.getReceiver());
            receiverResource.setReceiver(receiverSupplier);
        } else {
            ReceiverSupplier receiverSupplier =  receiverSupplierRepository.findByEmail(receiverResource.getReceiver().getEmail());
            receiverResource.setReceiver(receiverSupplier);
        }


        ReceiverResource result = receiverResourceRepository.save(receiverResource);

        return ResponseEntity.created(new URI("/api/receiver-resources/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /receiver-resources} : Updates an existing receiverResource.
     *
     * @param receiverResource the receiverResource to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated receiverResource,
     * or with status {@code 400 (Bad Request)} if the receiverResource is not valid,
     * or with status {@code 500 (Internal Server Error)} if the receiverResource couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/receiver-resources")
    public ResponseEntity<ReceiverResource> updateReceiverResource(@Valid @RequestBody ReceiverResource receiverResource) throws URISyntaxException {
        log.debug("REST request to update ReceiverResource : {}", receiverResource);
        if (receiverResource.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ReceiverResource result = receiverResourceRepository.save(receiverResource);

        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, receiverResource.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /receiver-resources} : get all the receiverResources.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of receiverResources in body.
     */
    @GetMapping("/receiver-resources")
    //public ResponseEntity<List<ReceiverResource>> getAllReceiverResources(Pageable pageable) {

    public ResponseEntity<List<ReceiverResource>> getAllReceiverResources(Pageable pageable) {
        log.debug("REST request to get a page of ReceiverResources");

        UserDTO user = userService.getUserWithAuthorities().map(UserDTO::new).orElseThrow(()->new RuntimeException("User could not be found"));
        Set<String> adminList = user.getAuthorities();

        List<ReceiverResource> filtered;

        if(adminList.contains("ROLE_ADMIN")){
            log.debug(String.valueOf(receiverResourceRepository.findAll(pageable)));
            ArrayList<ReceiverResource> receiverResources = new ArrayList<>();
            receiverResources.addAll(receiverResourceRepository.findAll());
            filtered = receiverResources;
        }
        else {
            filtered = receiverResourceService.getAllReceiverResources(pageable);
        }

        Page<ReceiverResource> receiverResourcePage1 = new PageImpl<ReceiverResource>(filtered, pageable, filtered.size());
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), receiverResourcePage1);
        return ResponseEntity.ok().headers(headers).body(filtered);
    }

    /**
     * {@code GET  /receiver-resources/:id} : get the "id" receiverResource.
     *
     * @param id the id of the receiverResource to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the receiverResource, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/receiver-resources/{id}")
    public ResponseEntity<ReceiverResource> getReceiverResource(@PathVariable String id) {
        log.debug("REST request to get ReceiverResource : {}", id);
        Optional<ReceiverResource> receiverResource = receiverResourceRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(receiverResource);
    }

    /**
     * {@code DELETE  /receiver-resources/:id} : delete the "id" receiverResource.
     *
     * @param id the id of the receiverResource to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/receiver-resources/{id}")
    public ResponseEntity<Void> deleteReceiverResource(@PathVariable String id) {
        log.debug("REST request to delete ReceiverResource : {}", id);
        receiverResourceRepository.deleteById(id);
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
    @GetMapping("/_search/receiver-resources")
    public ResponseEntity<?> searchReceiverResources(@RequestParam double x, double y,
    		double distance, Pageable pageable, String units) {
        log.debug("REST request to search for a page of ReceiverResources for longitude: {} latitude:{} distance: {}", x, y, distance);
        Point point = new Point(x, y);
        Metrics metrics = Metrics.MILES;
        if(!Strings.isBlank(units) && units.equals("km"))
        	 metrics = Metrics.KILOMETERS;
		Distance dist = new Distance(distance, metrics);
		GeoPage<ReceiverResource> page = receiverResourceRepository.findByPositionNear(point, dist, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
}
