package org.crown.repository;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.crown.CrownApp;
import org.crown.domain.ReceiverResource;
import org.crown.domain.SupplierResource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.geo.Distance;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;

@SpringBootTest(classes = CrownApp.class)
public class CustomSupplierResourceRepositoryIT {
	
	@Autowired
	SupplierResourceRepository resourceRepository;
	
	 @BeforeEach
	 public void setup() {
		 resourceRepository.deleteAll();
		 
		 SupplierResource s1 = new SupplierResource();
		 s1.setCost(10.99);
		 s1.setId(new ObjectId().toHexString());
		 s1.setQuantity(1000);
		 GeoJsonPoint pos1 = new GeoJsonPoint(50,50);
		 s1.setPosition(pos1);
		 
		 SupplierResource s2 = new SupplierResource();
		 s2.setCost(10.99);
		 s2.setId(new ObjectId().toHexString());
		 s2.setQuantity(1000);
		 GeoJsonPoint pos2 = new GeoJsonPoint(48.32,49.50);
		 s2.setPosition(pos2);
		 
		 resourceRepository.save(s1);
		 resourceRepository.save(s2);
	 }
	 
	 @Test
	 public void testCentroidSearch()
	 {
		 double DIST_UNIT_PER_MILE = 1/3963.2;
		 long miles = 100;
		 GeoJsonPoint point = new GeoJsonPoint(50,50);
		 Distance distance = new Distance(miles/DIST_UNIT_PER_MILE);
		 Pageable pageable = PageRequest.of(0, 10);
		 Page<SupplierResource> resources = resourceRepository.findByPositionNear(point, distance, pageable);
		 assertThat(resources.getSize()).isEqualTo(2);
	 }
	 
}
