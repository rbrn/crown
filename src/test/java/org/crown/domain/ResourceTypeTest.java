package org.crown.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import org.crown.web.rest.TestUtil;

public class ResourceTypeTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ResourceType.class);
        ResourceType resourceType1 = new ResourceType();
        resourceType1.setId("id1");
        ResourceType resourceType2 = new ResourceType();
        resourceType2.setId(resourceType1.getId());
        assertThat(resourceType1).isEqualTo(resourceType2);
        resourceType2.setId("id2");
        assertThat(resourceType1).isNotEqualTo(resourceType2);
        resourceType1.setId(null);
        assertThat(resourceType1).isNotEqualTo(resourceType2);
    }
}
