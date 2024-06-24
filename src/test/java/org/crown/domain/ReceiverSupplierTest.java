package org.crown.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import org.crown.web.rest.TestUtil;

public class ReceiverSupplierTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ReceiverSupplier.class);
        ReceiverSupplier receiverSupplier1 = new ReceiverSupplier();
        receiverSupplier1.setId("id1");
        ReceiverSupplier receiverSupplier2 = new ReceiverSupplier();
        receiverSupplier2.setId(receiverSupplier1.getId());
        assertThat(receiverSupplier1).isEqualTo(receiverSupplier2);
        receiverSupplier2.setId("id2");
        assertThat(receiverSupplier1).isNotEqualTo(receiverSupplier2);
        receiverSupplier1.setId(null);
        assertThat(receiverSupplier1).isNotEqualTo(receiverSupplier2);
    }
}
