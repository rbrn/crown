package org.crown.repository;

import org.crown.domain.RequestPoint;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the RequestPoint entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RequestPointRepository extends MongoRepository<RequestPoint, String> {
}
