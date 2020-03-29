package org.crown.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link SupplyPointSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class SupplyPointSearchRepositoryMockConfiguration {

    @MockBean
    private SupplyPointSearchRepository mockSupplyPointSearchRepository;

}
