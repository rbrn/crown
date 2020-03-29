package org.crown.repository.search;

import org.crown.domain.SupplyPointResource;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link SupplyPointResource} entity.
 */
public interface SupplyPointResourceSearchRepository extends ElasticsearchRepository<SupplyPointResource, String> {
}
