package org.crown.service;

import org.crown.domain.SupplierResource;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PostFilter;

import java.util.List;

public interface SupplierResourceService {

    @PostFilter("filterObject?.supplier?.email == authentication.principal.email")
    List<SupplierResource> getAllSupplierResources(Pageable pageable);
}
