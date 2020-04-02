package org.crown.repository;

import java.util.List;

import org.crown.domain.ReceiverResource;
import org.crown.domain.SupplierResource;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.geo.Box;
import org.springframework.data.geo.Circle;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the SupplierResource entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SupplierResourceRepository extends MongoRepository<SupplierResource, String> {
	/**
	 * Finds ReceiverResource within circle shape.
	 * @param circle
	 * @return
	 */
	List<SupplierResource> findByPositionWithin(Circle circle);

	/**
	 * Finds ReceiverResource within box shape.
	 * @param box
	 * @return
	 */
	List<SupplierResource> findByPositionWithin(Box box);

	/**
	 * Finds ReceiverResource near a point within a distance.
	 * @param point
	 * @param distance
	 * @return
	 */
	List<SupplierResource> findByPositionNear(Point point, Distance distance);
}
