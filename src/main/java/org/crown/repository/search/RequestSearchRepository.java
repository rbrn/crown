package org.crown.repository.search;

import org.crown.domain.Request;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Request} entity.
 */
public interface RequestSearchRepository extends ElasticsearchRepository<Request, String> {
}
