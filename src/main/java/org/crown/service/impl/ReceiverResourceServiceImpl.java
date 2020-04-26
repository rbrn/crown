package org.crown.service.impl;

import org.crown.domain.ReceiverResource;
import org.crown.domain.SupplierResource;
import org.crown.repository.ReceiverResourceRepository;
import org.crown.service.ReceiverResourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ReceiverResourceServiceImpl implements ReceiverResourceService {

    @Autowired
    private ReceiverResourceRepository receiverResourceRepository;

    @Override
    public List<ReceiverResource> getAllReceiverResources(Pageable pageable) {
        ArrayList<ReceiverResource> receiverResources = new ArrayList<>();
        receiverResources.addAll(receiverResourceRepository.findAll(pageable).getContent());
        return receiverResources;
    }
}
