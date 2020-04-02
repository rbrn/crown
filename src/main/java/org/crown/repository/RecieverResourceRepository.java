package org.crown.repository;

import org.crown.domain.RecieverResource;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the RecieverResource entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RecieverResourceRepository extends MongoRepository<RecieverResource, String> {
}
