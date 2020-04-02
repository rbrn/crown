package org.crown.repository;

import java.util.List;

import org.crown.domain.ReceiverResource;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.geo.Box;
import org.springframework.data.geo.Circle;
import org.springframework.data.geo.Distance;
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
	List<ReceiverResource> findByPositionWithin(Circle circle);

	/**
	 * Finds ReceiverResource within box shape.
	 * @param box
	 * @return
	 */
	List<ReceiverResource> findByPositionWithin(Box box);

	/**
	 * Finds ReceiverResource near a point within a distance.
	 * @param point
	 * @param distance
	 * @return
	 */
	List<ReceiverResource> findByPositionNear(Point point, Distance distance);
	
}
