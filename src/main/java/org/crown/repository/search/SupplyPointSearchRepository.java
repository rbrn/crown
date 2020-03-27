package org.crown.repository.search;

import org.crown.domain.SupplyPoint;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link SupplyPoint} entity.
 */
public interface SupplyPointSearchRepository extends ElasticsearchRepository<SupplyPoint, String> {
}
