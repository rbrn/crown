package org.crown.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import org.crown.web.rest.TestUtil;

public class RequestPointTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RequestPoint.class);
        RequestPoint requestPoint1 = new RequestPoint();
        requestPoint1.setId("id1");
        RequestPoint requestPoint2 = new RequestPoint();
        requestPoint2.setId(requestPoint1.getId());
        assertThat(requestPoint1).isEqualTo(requestPoint2);
        requestPoint2.setId("id2");
        assertThat(requestPoint1).isNotEqualTo(requestPoint2);
        requestPoint1.setId(null);
        assertThat(requestPoint1).isNotEqualTo(requestPoint2);
    }
}
