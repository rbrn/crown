package org.crown.service.impl;

import org.crown.domain.Claim;
import org.crown.repository.ClaimRepository;
import org.crown.service.ClaimResourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClaimResourceServiceImpl implements ClaimResourceService {

    @Autowired
    private ClaimRepository claimRepository;

    @Override
    public List<Claim> getAllClaims() {
        List<Claim> claims = claimRepository.findAll();
        return claims;
    }
}
