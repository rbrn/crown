package org.crown.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import org.crown.web.rest.TestUtil;

public class SupplierResourceTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SupplierResource.class);
        SupplierResource supplierResource1 = new SupplierResource();
        supplierResource1.setId("id1");
        SupplierResource supplierResource2 = new SupplierResource();
        supplierResource2.setId(supplierResource1.getId());
        assertThat(supplierResource1).isEqualTo(supplierResource2);
        supplierResource2.setId("id2");
        assertThat(supplierResource1).isNotEqualTo(supplierResource2);
        supplierResource1.setId(null);
        assertThat(supplierResource1).isNotEqualTo(supplierResource2);
    }
}
