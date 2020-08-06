package org.crown.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import org.crown.web.rest.TestUtil;

public class ResourceTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Resource.class);
        Resource resource1 = new Resource();
        resource1.setId("id1");
        Resource resource2 = new Resource();
        resource2.setId(resource1.getId());
        assertThat(resource1).isEqualTo(resource2);
        resource2.setId("id2");
        assertThat(resource1).isNotEqualTo(resource2);
        resource1.setId(null);
        assertThat(resource1).isNotEqualTo(resource2);
    }
}
