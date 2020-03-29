package org.crown.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import org.crown.web.rest.TestUtil;

public class DeliveryTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Delivery.class);
        Delivery delivery1 = new Delivery();
        delivery1.setId("id1");
        Delivery delivery2 = new Delivery();
        delivery2.setId(delivery1.getId());
        assertThat(delivery1).isEqualTo(delivery2);
        delivery2.setId("id2");
        assertThat(delivery1).isNotEqualTo(delivery2);
        delivery1.setId(null);
        assertThat(delivery1).isNotEqualTo(delivery2);
    }
}
