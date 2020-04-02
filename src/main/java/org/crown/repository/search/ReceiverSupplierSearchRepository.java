package org.crown.repository.search;

import org.crown.domain.ReceiverSupplier;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link ReceiverSupplier} entity.
 */
public interface ReceiverSupplierSearchRepository extends ElasticsearchRepository<ReceiverSupplier, String> {
}
