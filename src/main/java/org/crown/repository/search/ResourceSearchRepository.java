package org.crown.repository.search;

import org.crown.domain.Resource;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Resource} entity.
 */
public interface ResourceSearchRepository extends ElasticsearchRepository<Resource, String> {
}
