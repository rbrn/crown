package org.crown.web.rest.custom;

import java.util.List;
import java.util.Optional;

import org.crown.domain.Claim;
import org.crown.domain.ReceiverResource;
import org.crown.domain.ReceiverSupplier;
import org.crown.domain.SupplierResource;
import org.crown.repository.ClaimRepository;
import org.crown.repository.ReceiverResourceRepository;
import org.crown.repository.ReceiverSupplierRepository;
import org.crown.repository.SupplierResourceRepository;
import org.crown.service.dto.AggregatedDTO;
import org.crown.service.dto.ReceiverResourceAggregatedDTO;
import org.crown.web.rest.ReceiverResourceResource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Pageable;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.GeoPage;
import org.springframework.data.geo.Point;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class Claims {
	 private final Logger log = LoggerFactory.getLogger(ReceiverResourceResource.class);

	    private static final String ENTITY_NAME = "receiverResource";

	    @Value("${jhipster.clientApp.name}")
	    private String applicationName;

	    private final ReceiverResourceRepository receiverResourceRepository;
	    private final SupplierResourceRepository supplierResourceRepository;
	    private final ReceiverSupplierRepository receiverSupplierRepository;
	    private final ClaimRepository claimRepository;

	    public Claims(ReceiverResourceRepository receiverResourceRepository, SupplierResourceRepository supplierResourceRepository, ReceiverSupplierRepository receiverSupplierRepository, ClaimRepository claimRepository) {
	        this.receiverResourceRepository = receiverResourceRepository;
	        this.supplierResourceRepository = supplierResourceRepository;
	        this.receiverSupplierRepository = receiverSupplierRepository;
	        this.claimRepository = claimRepository;
	    }

	    @GetMapping("/_claim/claim-supply-resource")
	    public ResponseEntity<Void> searchReceiverResources(@RequestParam String supplierResourceId, @RequestParam int quantity) {
	        log.debug("REST request to claim item {}", supplierResourceId);
	        Optional<SupplierResource> supplierResource = supplierResourceRepository.findById(supplierResourceId);
	        Claim claim= new Claim();
	        claim.setSupplierResource(supplierResource.get());

	        //SecurityUtils.getCurrentUserLogin()

	        ReceiverSupplier receiver= receiverSupplierRepository.findByEmail("tiparega@gmail.com");

	        Optional<ReceiverResource> receiverResource = receiverResourceRepository.findByReceiverAndResourceType(receiver, supplierResource.get().getResourceType());

	        claim.setReceiverResource(receiverResource.orElse( null));
	        claim.setQuantity(quantity);

	        claimRepository.save(claim);

	        return ResponseEntity.ok().build();
	    }
}
