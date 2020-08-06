package org.crown.repository;

import java.util.List;
import java.util.Optional;

import org.crown.domain.ReceiverResource;
import org.crown.domain.ReceiverSupplier;
import org.crown.domain.ResourceType;
import org.crown.domain.SupplierResource;

import org.springframework.data.geo.*;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
	GeoPage<SupplierResource> findByPositionWithin(Circle circle, Pageable page);

	/**
	 * Finds ReceiverResource within box shape.
	 * @param box
	 * @return
	 */
	GeoPage<SupplierResource> findByPositionWithin(Box box, Pageable page);

	/**
	 * Finds ReceiverResource near a point within a distance.
	 * @param point
	 * @param distance
	 * @return
	 */
	GeoPage<SupplierResource> findByPositionNear(Point point, Distance distance, Pageable page);

    /**
     * Finds ReceiverResource near a point within a distance.
     * @param point
     * @param distance
     * @return
     */
    GeoResults<SupplierResource> findByPositionNear(Point point, Distance distance);

    /**
     * Finds a supplierResource asked from a supplier of specific resourceType
     * @param supplier
     * @param resourceType
     * @return
     */
	Optional<SupplierResource> findBySupplierAndResourceType(ReceiverSupplier supplier, ResourceType resourceType);

}
