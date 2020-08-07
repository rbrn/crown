package org.crown.web.rest.custom;

import java.time.LocalDate;
import java.util.Optional;

import org.crown.domain.Claim;
import org.crown.domain.ReceiverResource;
import org.crown.domain.ReceiverSupplier;
import org.crown.domain.SupplierResource;
import org.crown.domain.User;
import org.crown.repository.ClaimRepository;
import org.crown.repository.ReceiverResourceRepository;
import org.crown.repository.ReceiverSupplierRepository;
import org.crown.repository.SupplierResourceRepository;
import org.crown.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class Claims {
	private final Logger log = LoggerFactory.getLogger(this.getClass());

	@Value("${jhipster.clientApp.name}")
	private String applicationName;

	private final ReceiverResourceRepository receiverResourceRepository;
	private final SupplierResourceRepository supplierResourceRepository;
	private final ReceiverSupplierRepository receiverSupplierRepository;
	private final ClaimRepository claimRepository;
	private final UserService userService;

	public Claims(ReceiverResourceRepository receiverResourceRepository,
			SupplierResourceRepository supplierResourceRepository,
			ReceiverSupplierRepository receiverSupplierRepository, ClaimRepository claimRepository,
			UserService userService) {
		this.receiverResourceRepository = receiverResourceRepository;
		this.supplierResourceRepository = supplierResourceRepository;
		this.receiverSupplierRepository = receiverSupplierRepository;
		this.claimRepository = claimRepository;
		this.userService = userService;
	}

	@GetMapping("/_claim/claim-supply-resource")
	public ResponseEntity<Void> claimSupplyResource(@RequestParam String supplierResourceId,
			@RequestParam int quantity) {
		log.debug("REST request to claim item {}", supplierResourceId);
		SupplierResource supplierResource = supplierResourceRepository.findById(supplierResourceId)
				.orElseThrow(() -> new RuntimeException("Suplier Resource not found"));
		log.debug("supplierResource: " + supplierResource);

		Claim claim = new Claim();
		claim.setSupplierResource(supplierResource);

		User user = userService.getUserWithAuthorities()
				.orElseThrow(() -> new RuntimeException("User could not be found"));

		ReceiverSupplier receiver = receiverSupplierRepository.findByEmail(user.getEmail());

		if (receiver == null) {
			receiver = new ReceiverSupplier();
			receiver.setEmail(user.getEmail());
			receiver.setOrgName(user.getEmail().replaceFirst("@.*", ""));
			receiver.setPrimaryContactName(receiver.getOrgName());
			receiver.setIsSupplier(true);
			receiverSupplierRepository.save(receiver);
		}

		log.debug("Receiver: " + receiver);

		Optional<ReceiverResource> receiverResource = receiverResourceRepository.findByReceiverAndResourceType(receiver,
				supplierResource.getResourceType());
		if (receiverResource.isPresent()) {
			log.debug("receiverResource: " + receiverResource);
			claim.setReceiverResource(receiverResource.get());
		} else {
			ReceiverResource recRes = new ReceiverResource();
			recRes.setCurrentStock(0);
			recRes.setDailyUse(0);
			recRes.setName("Resource needed");
			recRes.setQuantity(quantity);
			recRes.setNotes("Automatically created");
			recRes.setResourceType(supplierResource.getResourceType());
			recRes.setReceiver(receiver);
			recRes.setPostedDate(LocalDate.now());

			receiverResourceRepository.save(recRes);
			claim.setReceiverResource(recRes);
			log.debug("Created receiver resource: " + recRes);
		}

		claim.setQuantity(quantity);
		log.debug("Creating claim: " + claim + " from " + claim.getSupplierResource() + " to "
				+ claim.getReceiverResource());
		claimRepository.save(claim);

		return ResponseEntity.ok().build();
	}

	@GetMapping("/_claim/claim-receive-resource")
	public ResponseEntity<Void> claimReceiveResource(@RequestParam String receiverResourceId,
			@RequestParam int quantity) {
		log.debug("REST request to claim item {}", receiverResourceId);
		ReceiverResource receiverResource = receiverResourceRepository.findById(receiverResourceId)
				.orElseThrow(() -> new RuntimeException("Suplier Resource not found"));
		log.debug("receiverResource: " + receiverResource);

		Claim claim = new Claim();
		claim.setReceiverResource(receiverResource);

		User user = userService.getUserWithAuthorities()
				.orElseThrow(() -> new RuntimeException("User could not be found"));

		ReceiverSupplier supplier = receiverSupplierRepository.findByEmail(user.getEmail());

		if (supplier == null) {
			supplier = new ReceiverSupplier();
			supplier.setEmail(user.getEmail());
			supplier.setOrgName(user.getEmail().replaceFirst("@.*", ""));
			supplier.setPrimaryContactName(supplier.getOrgName());
			supplier.setIsSupplier(true);
			receiverSupplierRepository.save(supplier);
		}

		log.debug("Supplier: " + supplier);

		Optional<SupplierResource> supplierResource = supplierResourceRepository.findBySupplierAndResourceType(supplier,
				receiverResource.getResourceType());
		if (supplierResource.isPresent()) {
			log.debug("supplierResource: " + supplierResource);
			claim.setSupplierResource(supplierResource.get());
		} else {
			SupplierResource supRes = new SupplierResource();
			supRes.setQuantity(quantity);
			supRes.setResourceType(receiverResource.getResourceType());
			supRes.setSupplier(supplier);

			supplierResourceRepository.save(supRes);
			claim.setSupplierResource(supRes);
			log.debug("Created receiver resource: " + supRes);
		}

		claim.setQuantity(quantity);
		log.debug("Creating claim: " + claim + " from " + claim.getSupplierResource() + " to "
				+ claim.getReceiverResource());
		claimRepository.save(claim);

		return ResponseEntity.ok().build();
	}
}
