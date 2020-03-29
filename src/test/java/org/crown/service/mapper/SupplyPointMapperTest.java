package org.crown.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class SupplyPointMapperTest {

    private SupplyPointMapper supplyPointMapper;

    @BeforeEach
    public void setUp() {
        supplyPointMapper = new SupplyPointMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        String id = "id1";
        assertThat(supplyPointMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(supplyPointMapper.fromId(null)).isNull();
    }
}
