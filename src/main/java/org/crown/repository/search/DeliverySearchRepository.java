package org.crown.repository.search;

import org.crown.domain.Delivery;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Delivery} entity.
 */
public interface DeliverySearchRepository extends ElasticsearchRepository<Delivery, String> {
}
