package org.crown.web.rest.custom;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import org.apache.logging.log4j.util.Strings;
import org.crown.domain.ReceiverResource;
import org.crown.domain.ReceiverSupplier;
import org.crown.domain.ResourceType;
import org.crown.domain.SupplierResource;
import org.crown.repository.ReceiverResourceRepository;
import org.crown.repository.SupplierResourceRepository;
import org.crown.service.dto.AggregatedDTO;
import org.crown.service.dto.AroundMeSuppliesDTO;
import org.crown.service.dto.ReceiverResourceAggregatedDTO;
import org.crown.service.dto.SupplierResourceAggregatedDTO;
import org.crown.web.rest.ReceiverResourceResource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.geo.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.groupingBy;
import static java.util.stream.Collectors.toList;

/**
 * REST controller for managing {@link ReceiverSupplier}.
 */
@RestController
@RequestMapping("/api")
public class AggregatedReceiverSupplierResource {

    private final Logger log = LoggerFactory.getLogger(ReceiverResourceResource.class);

    private static final String ENTITY_NAME = "receiverResource";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ReceiverResourceRepository receiverResourceRepository;
    private final SupplierResourceRepository supplierResourceRepository;


    public AggregatedReceiverSupplierResource(ReceiverResourceRepository receiverResourceRepository, SupplierResourceRepository supplierResourceRepository) {
        this.receiverResourceRepository = receiverResourceRepository;
        this.supplierResourceRepository = supplierResourceRepository;
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
    @GetMapping("/_search/receiver-resources/aggregated")
    public ResponseEntity<List<? extends AggregatedDTO>> searchReceiverResources(@RequestParam double x, double y,
                                                                                 double distance, Pageable pageable, String units) {
        log.debug("REST request to search for a page of ReceiverResources for longitude: {} latitude:{} distance: {}", x, y, distance);
        CreateDistance createDistance = new CreateDistance(x, y, distance, units).invoke();
        Point point = createDistance.getPoint();
        Distance dist = createDistance.getDist();
        GeoPage<ReceiverResource> geoPage = receiverResourceRepository.findByPositionNear(point, dist, pageable);
        List<ReceiverResourceAggregatedDTO> aggregatedDTOS = getAggregatedResources(geoPage.getContent());

        return ResponseEntity.ok().body(aggregatedDTOS);
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
    @GetMapping("/_search/supplier-resources/aroundme")
    public ResponseEntity<?> searchSupplierResourcesAroundMe(@RequestParam double x, double y,
                                                     double distance, Pageable pageable, String units) {
        log.debug("REST request to search for a page of SupplierResources for longitude: {} latitude:{} distance: {}", x, y, distance);
        CreateDistance createDistance = new CreateDistance(x, y, distance, units).invoke();
        Point point = createDistance.getPoint();
        Distance dist = createDistance.getDist();

            GeoResults<SupplierResource> page = supplierResourceRepository.findByPositionNear(point, dist);
        List<AroundMeSuppliesDTO> aggregatedDTOS = getAroundMe(page);
        return ResponseEntity.ok().body(aggregatedDTOS);
    }

    private List<AroundMeSuppliesDTO> getAroundMe(GeoResults<SupplierResource> page) {
        return page.getContent().stream().map(AroundMeSuppliesDTO::of).collect(toList());
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
    @GetMapping("/_search/supplier-resources/aggregated")
    public ResponseEntity<?> searchSupplierResources(@RequestParam double x, double y,
                                                     double distance, Pageable pageable, String units) {
        log.debug("REST request to search for a page of SupplierResources for longitude: {} latitude:{} distance: {}", x, y, distance);
        CreateDistance createDistance = new CreateDistance(x, y, distance, units).invoke();
        Point point = createDistance.getPoint();
        Distance dist = createDistance.getDist();

        GeoPage<SupplierResource> page = supplierResourceRepository.findByPositionNear(point, dist, pageable);
        List<SupplierResourceAggregatedDTO> aggregatedDTOS = getAggregatedSupplierResources(page.getContent());
        return ResponseEntity.ok().body(aggregatedDTOS);
    }

    private List<SupplierResourceAggregatedDTO> getAggregatedSupplierResources(List<GeoResult<SupplierResource>> content) {
        Map<ResourceType, List<SupplierResource>> receiverResourceMap = content.stream().map(page -> page.getContent()).collect(groupingBy(SupplierResource::getResourceType));
        return receiverResourceMap.entrySet().stream().map(SupplierResourceAggregatedDTO::ofSupplierResource).collect(Collectors.toList());
    }


    private List<ReceiverResourceAggregatedDTO> getAggregatedResources(List<GeoResult<ReceiverResource>> content) {
        Map<ResourceType, List<ReceiverResource>> receiverResourceMap = content.stream().map(page -> page.getContent()).collect(groupingBy(ReceiverResource::getResourceType));
        return receiverResourceMap.entrySet().stream().map(ReceiverResourceAggregatedDTO::ofReceiverResource).collect(Collectors.toList());
    }

    private class CreateDistance {
        private double x;
        private double y;
        private double distance;
        private String units;
        private Point point;
        private Distance dist;

        public CreateDistance(double x, double y, double distance, String units) {
            this.x = x;
            this.y = y;
            this.distance = distance;
            this.units = units;
        }

        public Point getPoint() {
            return point;
        }

        public Distance getDist() {
            return dist;
        }

        public CreateDistance invoke() {
            point = new Point(x, y);
            Metrics metrics = Metrics.MILES;
            if (!Strings.isBlank(units) && units.equals("km"))
                metrics = Metrics.KILOMETERS;
            dist = new Distance(distance, metrics);
            return this;
        }
    }
}
