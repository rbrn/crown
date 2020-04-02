package org.crown.repository.search;

import org.crown.domain.RecieverResource;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link RecieverResource} entity.
 */
public interface RecieverResourceSearchRepository extends ElasticsearchRepository<RecieverResource, String> {
}
