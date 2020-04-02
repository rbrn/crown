package org.crown.repository.search;

import org.crown.domain.ReceiverResource;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link ReceiverResource} entity.
 */
public interface ReceiverResourceSearchRepository extends ElasticsearchRepository<ReceiverResource, String> {
}
