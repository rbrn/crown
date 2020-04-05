package org.crown.repository;

import java.util.List;

import org.crown.domain.ReceiverResource;
import org.crown.domain.SupplierResource;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
	Page<SupplierResource> findByPositionWithin(Circle circle, Pageable page);

	/**
	 * Finds ReceiverResource within box shape.
	 * @param box
	 * @return
	 */
	Page<SupplierResource> findByPositionWithin(Box box, Pageable page);

	/**
	 * Finds ReceiverResource near a point within a distance.
	 * @param point
	 * @param distance
	 * @return
	 */
	Page<SupplierResource> findByPositionNear(Point point, Distance distance, Pageable page);
	
}
