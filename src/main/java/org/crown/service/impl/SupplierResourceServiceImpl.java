package org.crown.service.impl;

import org.crown.domain.SupplierResource;
import org.crown.repository.SupplierResourceRepository;
import org.crown.service.SupplierResourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SupplierResourceServiceImpl implements SupplierResourceService {

    @Autowired
    private SupplierResourceRepository supplierResourceRepository;

    @Override
    public List<SupplierResource> getAllSupplierResources(Pageable pageable) {
        ArrayList<SupplierResource> supplierResourceArrayList = new ArrayList<SupplierResource>();
        supplierResourceArrayList.addAll(supplierResourceRepository.findAll());
        return supplierResourceArrayList;
    }
}
