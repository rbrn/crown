package org.crown.repository.search;

import org.crown.domain.SupplierResource;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link SupplierResource} entity.
 */
public interface SupplierResourceSearchRepository extends ElasticsearchRepository<SupplierResource, String> {
}
