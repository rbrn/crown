package org.crown.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import org.crown.web.rest.TestUtil;

public class RecieverResourceTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RecieverResource.class);
        RecieverResource recieverResource1 = new RecieverResource();
        recieverResource1.setId("id1");
        RecieverResource recieverResource2 = new RecieverResource();
        recieverResource2.setId(recieverResource1.getId());
        assertThat(recieverResource1).isEqualTo(recieverResource2);
        recieverResource2.setId("id2");
        assertThat(recieverResource1).isNotEqualTo(recieverResource2);
        recieverResource1.setId(null);
        assertThat(recieverResource1).isNotEqualTo(recieverResource2);
    }
}
