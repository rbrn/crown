package org.crown.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import org.crown.web.rest.TestUtil;

public class RecieverSupplierTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RecieverSupplier.class);
        RecieverSupplier recieverSupplier1 = new RecieverSupplier();
        recieverSupplier1.setId("id1");
        RecieverSupplier recieverSupplier2 = new RecieverSupplier();
        recieverSupplier2.setId(recieverSupplier1.getId());
        assertThat(recieverSupplier1).isEqualTo(recieverSupplier2);
        recieverSupplier2.setId("id2");
        assertThat(recieverSupplier1).isNotEqualTo(recieverSupplier2);
        recieverSupplier1.setId(null);
        assertThat(recieverSupplier1).isNotEqualTo(recieverSupplier2);
    }
}
