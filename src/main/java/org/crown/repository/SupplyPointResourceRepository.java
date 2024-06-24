package org.crown.repository;

import org.crown.domain.SupplyPointResource;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the SupplyPointResource entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SupplyPointResourceRepository extends MongoRepository<SupplyPointResource, String> {
}
