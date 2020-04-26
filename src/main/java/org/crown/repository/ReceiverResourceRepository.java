package org.crown.repository;

import java.util.Optional;

import org.crown.domain.ReceiverResource;
import org.crown.domain.ReceiverSupplier;
import org.crown.domain.ResourceType;
import org.springframework.data.domain.Pageable;
import org.springframework.data.geo.Box;
import org.springframework.data.geo.Circle;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.GeoPage;
import org.springframework.data.geo.GeoResults;
import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the ReceiverResource entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReceiverResourceRepository extends MongoRepository<ReceiverResource, String> {

	/**
	 * Finds ReceiverResource within circle shape.
	 * @param circle
	 * @return
	 */
	GeoPage<ReceiverResource> findByPositionWithin(Circle circle, Pageable pageable);

	/**
	 * Finds ReceiverResource within box shape.
	 * @param box
	 * @return
	 */
	GeoPage<ReceiverResource> findByPositionWithin(Box box, Pageable pageable);

	/**
	 * Finds ReceiverResource near a point within a distance.
	 * @param point
	 * @param distance
	 * @return
	 */
	GeoPage<ReceiverResource> findByPositionNear(Point point, Distance distance, Pageable pageable);
    /**
     * Finds ReceiverResource near a point within a distance.
     * @param point
     * @param distance
     * @return
     */
    GeoResults<ReceiverResource> findByPositionNear(Point point, Distance distance);



	Optional<ReceiverResource> findByReceiverAndResourceType(ReceiverSupplier receiver, ResourceType resourceType);
}
