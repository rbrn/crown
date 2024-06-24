package org.crown.service;

import org.crown.domain.ReceiverResource;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PostFilter;

import java.util.List;

public interface ReceiverResourceService {
    @PostFilter("filterObject?.receiver?.email == authentication.principal.email")
    List<ReceiverResource> getAllReceiverResources(Pageable pageable);
}
