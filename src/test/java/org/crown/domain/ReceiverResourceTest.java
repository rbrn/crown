package org.crown.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import org.crown.web.rest.TestUtil;

public class ReceiverResourceTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ReceiverResource.class);
        ReceiverResource receiverResource1 = new ReceiverResource();
        receiverResource1.setId("id1");
        ReceiverResource receiverResource2 = new ReceiverResource();
        receiverResource2.setId(receiverResource1.getId());
        assertThat(receiverResource1).isEqualTo(receiverResource2);
        receiverResource2.setId("id2");
        assertThat(receiverResource1).isNotEqualTo(receiverResource2);
        receiverResource1.setId(null);
        assertThat(receiverResource1).isNotEqualTo(receiverResource2);
    }
}
