package org.crown.repository;

import org.crown.domain.ReceiverSupplier;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the ReceiverSupplier entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReceiverSupplierRepository extends MongoRepository<ReceiverSupplier, String> {
}
