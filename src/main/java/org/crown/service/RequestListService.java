package org.crown.service;

import org.crown.domain.Request;
import org.crown.domain.RequestPoint;
import org.crown.domain.Resource;
import org.crown.domain.SupplyPoint;
import org.crown.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import java.util.*;

import static org.crown.service.InvalidIdException.*;
import static org.crown.service.InvalidIdException.SUPPLY_POINT;

/**
 * Service class for managing users.
 */
@Service
public class RequestListService {

    private final Logger log = LoggerFactory.getLogger(RequestListService.class);

    private final SupplyPointRepository supplyPointRepository;

    private final ResourceRepository resourceRepository;

    private final RequestPointRepository requestPointRepository;

    private final RequestRepository requestRepository;

    public RequestListService(SupplyPointRepository supplyPointRepository, ResourceRepository resourceRepository, RequestPointRepository requestPointRepository, RequestRepository requestRepository) {
        this.supplyPointRepository = supplyPointRepository;
        this.resourceRepository = resourceRepository;
        this.requestPointRepository = requestPointRepository;
        this.requestRepository = requestRepository;}

        /*
            @GetMapping("/requests/urgent")
    public ResponseEntity<List<Request>> supplyPointUrgentRequests(@RequestParam String supplypoint, @RequestParam String resource, @RequestParam Integer radius) {

        log.debug("REST request to retrieve most urgent requests for a supply point {}, resource {}, radius {}", supplypoint, resource, radius);

        Optional<SupplyPoint> optionalSupplyPoint = supplyPointRepository.findById(supplypoint);
        if (!optionalSupplyPoint.isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);

        Optional<SupplyPoint> optionalSupplyPoint = supplyPointRepository.findById(supplyPointId);
        if (!optionalSupplyPoint.isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);

        try {
            return ResponseEntity.ok().body(requestListService.mostUrgentRequests(supplypoint, resource, radius));
        }
    }
         */

    public List<Request> mostUrgentRequests(String supplyPointId, String resourceId, Integer radius) {

        Optional<SupplyPoint> optionalSupplyPoint = supplyPointRepository.findById(supplyPointId);
        if (!optionalSupplyPoint.isPresent())
            throw new InvalidIdException(SUPPLY_POINT, supplyPointId);

        Optional<Resource> optionalResource = resourceRepository.findById(resourceId);
        if (!optionalResource.isPresent())
            throw new InvalidIdException(RESOURCE, resourceId);

        return mostUrgentRequests(optionalSupplyPoint.get(), optionalResource.get(), radius);

    }

    private List<Request> mostUrgentRequests(SupplyPoint supplyPoint, Resource resource, Integer radius) {

        List<RequestPoint> nearbyRequestPoints = nearby(supplyPoint, radius);
        if (nearbyRequestPoints.isEmpty())
            return new ArrayList<Request>();

        List<Request> requests = getRequestsForItem(resource, nearbyRequestPoints);
        Collections.sort(requests, new NeedComparator());
        return requests;

    }

    private List<Request> getRequestsForItem(Resource resource, List<RequestPoint> nearbyRequestPoints) {
        List<Request> result = new ArrayList<Request>();
        for (RequestPoint requestPoint: nearbyRequestPoints)
                result.addAll(getRequests(resource, requestPoint));
        return result;
    }

    private List<Request> getRequests(Resource resource, RequestPoint requestPoint) {
        Request requestExample = new Request();
        requestExample.setResource(resource);
        requestExample.setRequestPoint(requestPoint);
        Example<Request> example = Example.of(requestExample);
        return requestRepository.findAll(example);
    }

    public List<RequestPoint> nearby(SupplyPoint supplyPoint, int radius) {
        /*
        Code to retrieve requestPoints within a certain radius of SupplyPoint
        should be implemented here - currently returning all request points
         */
       return requestPointRepository.findAll();

    }

    private static class NeedComparator implements Comparator<Request> {

        @Override
        public int compare(Request r1, Request r2) {
            return r1.getDaysLeft().compareTo(r2.getDaysLeft());
        }
    }

}
