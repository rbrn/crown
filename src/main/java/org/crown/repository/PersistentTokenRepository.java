package org.crown.repository;

import org.crown.domain.PersistentToken;
import org.crown.domain.User;
import java.time.LocalDate;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

/**
 * Spring Data MongoDB repository for the {@link PersistentToken} entity.
 */
public interface PersistentTokenRepository extends MongoRepository<PersistentToken, String> {

    List<PersistentToken> findByUser(User user);

    List<PersistentToken> findByTokenDateBefore(LocalDate localDate);

}
