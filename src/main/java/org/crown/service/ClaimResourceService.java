package org.crown.service;

import org.crown.domain.Claim;
import org.springframework.security.access.prepost.PostFilter;

import java.util.List;

public interface ClaimResourceService {

    @PostFilter("filterObject?.supplierResource?.supplier?.email == authentication.principal.email or filterObject?.receiverResource?.receiver?.email == authentication.principal.email")
    List<Claim> getAllClaims();
}
