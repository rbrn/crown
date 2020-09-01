package org.crown.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import org.crown.web.rest.TestUtil;

public class SupplyPointResourceTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SupplyPointResource.class);
        SupplyPointResource supplyPointResource1 = new SupplyPointResource();
        supplyPointResource1.setId("id1");
        SupplyPointResource supplyPointResource2 = new SupplyPointResource();
        supplyPointResource2.setId(supplyPointResource1.getId());
        assertThat(supplyPointResource1).isEqualTo(supplyPointResource2);
        supplyPointResource2.setId("id2");
        assertThat(supplyPointResource1).isNotEqualTo(supplyPointResource2);
        supplyPointResource1.setId(null);
        assertThat(supplyPointResource1).isNotEqualTo(supplyPointResource2);
    }
}
