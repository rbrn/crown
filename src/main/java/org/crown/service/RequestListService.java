package org.crown.service;

import org.crown.domain.Request;
import org.crown.domain.RequestPoint;
import org.crown.domain.SupplyPoint;
import org.crown.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Service class for managing users.
 */
@Service
public class RequestListService {

    private final Logger log = LoggerFactory.getLogger(RequestListService.class);

    private final RequestPointRepository requestPointRepository;

    private final RequestRepository requestRepository;

    public RequestListService(RequestPointRepository requestPointRepository, RequestRepository requestRepository) {
        this.requestPointRepository = requestPointRepository;
        this.requestRepository = requestRepository;}

    public List<Request> mostUrgentRequests(SupplyPoint supplyPoint, String itemId) {
        log.debug("Requesting Most Ugent Request - supplyPoint {}, Item {}", supplyPoint.getName(), itemId);

        // All nearby requests brought into memory and sorted so maybe not
        // scalable solution but should do as initial implementation i think

        List<RequestPoint> nearbyRequestPoints = nearby(supplyPoint);
        log.debug("Nearby Requests Size:" + nearbyRequestPoints.size());
        if (nearbyRequestPoints.isEmpty())
            return new ArrayList<Request>();

        List<Request> requests = getRequestsForItem(itemId, nearbyRequestPoints);
        Collections.sort(requests, new NeedComparator());
        return requests;

    }

    private List<Request> getRequestsForItem(String itemType, List<RequestPoint> nearbyRequestPoints) {
        List<Request> result = new ArrayList<Request>();
        for (RequestPoint requestPoint: nearbyRequestPoints)
                result.addAll(getRequests(itemType, requestPoint));
        return result;
    }

    private List<Request> getRequests(String itemType, RequestPoint requestPoint) {
        Request requestExample = new Request();
        requestExample.setItemType(itemType);
        requestExample.setRequestPoint(requestPoint);
        Example<Request> example = Example.of(requestExample);
        return requestRepository.findAll(example);
    }

    public List<RequestPoint> nearby(SupplyPoint supplyPoint) {
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
