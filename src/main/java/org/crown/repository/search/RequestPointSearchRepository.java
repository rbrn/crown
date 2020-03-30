package org.crown.repository.search;

import org.crown.domain.RequestPoint;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link RequestPoint} entity.
 */
public interface RequestPointSearchRepository extends ElasticsearchRepository<RequestPoint, String> {
}
