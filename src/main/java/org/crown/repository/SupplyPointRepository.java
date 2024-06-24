package org.crown.repository;

import org.crown.domain.SupplyPoint;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the SupplyPoint entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SupplyPointRepository extends MongoRepository<SupplyPoint, String> {
}
