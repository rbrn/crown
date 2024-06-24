package org.crown.service.dto;

import org.crown.domain.ResourceType;
import org.crown.domain.SupplierResource;

import java.util.List;
import java.util.Map;

public class SupplierResourceAggregatedDTO extends AggregatedDTO<SupplierResource> {
    public static SupplierResourceAggregatedDTO ofSupplierResource(Map.Entry<ResourceType, List<SupplierResource>> resourceTypeListEntry) {
        SupplierResourceAggregatedDTO receiverResourceAggregatedDTO = new SupplierResourceAggregatedDTO();
        receiverResourceAggregatedDTO.setItemType(resourceTypeListEntry.getKey().getName());
        receiverResourceAggregatedDTO.setItemTypesList(resourceTypeListEntry.getValue());
        receiverResourceAggregatedDTO.setCountItems(resourceTypeListEntry.getValue()
            .stream().mapToLong(SupplierResource::getQuantity).sum());
        return receiverResourceAggregatedDTO;
    }
}
