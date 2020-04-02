package org.crown.repository.search;

import org.crown.domain.RecieverSupplier;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link RecieverSupplier} entity.
 */
public interface RecieverSupplierSearchRepository extends ElasticsearchRepository<RecieverSupplier, String> {
}
