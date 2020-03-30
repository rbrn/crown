package org.crown.service;

import org.crown.domain.Request;
import org.crown.domain.RequestPoint;
import org.crown.domain.SupplyPoint;
import org.crown.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
        if (nearbyRequestPoints.isEmpty())
            return new ArrayList<Request>();

        List<Request> requests = getRequestsForItem(itemId, nearbyRequestPoints);

        Collections.sort(requests, new NeedComparator());

        return requests;

    }

    private List<Request> getRequestsForItem(String itemId, List<RequestPoint> nearbyRequestPoints) {
        List<Request> requests = new ArrayList<Request>();
        for (RequestPoint requestPoint: nearbyRequestPoints) {
            for (Request request: requestPoint.getRequests()) {
                if (request.getItemType().equals(itemId))
                    requests.add(request);
            }
        }
        return requests;
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
