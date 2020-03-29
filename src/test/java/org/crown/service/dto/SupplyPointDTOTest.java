package org.crown.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import org.crown.web.rest.TestUtil;

public class SupplyPointDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SupplyPointDTO.class);
        SupplyPointDTO supplyPointDTO1 = new SupplyPointDTO();
        supplyPointDTO1.setId("id1");
        SupplyPointDTO supplyPointDTO2 = new SupplyPointDTO();
        assertThat(supplyPointDTO1).isNotEqualTo(supplyPointDTO2);
        supplyPointDTO2.setId(supplyPointDTO1.getId());
        assertThat(supplyPointDTO1).isEqualTo(supplyPointDTO2);
        supplyPointDTO2.setId("id2");
        assertThat(supplyPointDTO1).isNotEqualTo(supplyPointDTO2);
        supplyPointDTO1.setId(null);
        assertThat(supplyPointDTO1).isNotEqualTo(supplyPointDTO2);
    }
}
