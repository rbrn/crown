package org.crown.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link DeliverySearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class DeliverySearchRepositoryMockConfiguration {

    @MockBean
    private DeliverySearchRepository mockDeliverySearchRepository;

}
