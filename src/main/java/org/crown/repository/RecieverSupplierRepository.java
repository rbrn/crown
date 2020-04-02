package org.crown.repository;

import org.crown.domain.RecieverSupplier;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the RecieverSupplier entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RecieverSupplierRepository extends MongoRepository<RecieverSupplier, String> {
}
