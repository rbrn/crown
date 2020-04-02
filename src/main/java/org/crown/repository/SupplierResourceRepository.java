package org.crown.repository;

import org.crown.domain.SupplierResource;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the SupplierResource entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SupplierResourceRepository extends MongoRepository<SupplierResource, String> {
}
