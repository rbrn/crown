package org.crown.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import org.crown.web.rest.TestUtil;

public class SupplyPointTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SupplyPoint.class);
        SupplyPoint supplyPoint1 = new SupplyPoint();
        supplyPoint1.setId("id1");
        SupplyPoint supplyPoint2 = new SupplyPoint();
        supplyPoint2.setId(supplyPoint1.getId());
        assertThat(supplyPoint1).isEqualTo(supplyPoint2);
        supplyPoint2.setId("id2");
        assertThat(supplyPoint1).isNotEqualTo(supplyPoint2);
        supplyPoint1.setId(null);
        assertThat(supplyPoint1).isNotEqualTo(supplyPoint2);
    }
}
