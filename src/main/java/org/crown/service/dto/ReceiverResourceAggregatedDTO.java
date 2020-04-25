package org.crown.service.dto;

import org.crown.domain.ReceiverResource;

import java.util.List;
import java.util.Map;

public class ReceiverResourceAggregatedDTO extends AggregatedDTO<ReceiverResource> {
    public static ReceiverResourceAggregatedDTO ofReceiverResource(Map.Entry<String, List<ReceiverResource>> stringListEntry) {
        ReceiverResourceAggregatedDTO receiverResourceAggregatedDTO = new ReceiverResourceAggregatedDTO();
        receiverResourceAggregatedDTO.setItemType(stringListEntry.getKey());
        receiverResourceAggregatedDTO.setItemTypesList(stringListEntry.getValue());
        receiverResourceAggregatedDTO.setCountItems(stringListEntry.getValue().stream().mapToLong(ReceiverResource::getQuantity).sum());
        return receiverResourceAggregatedDTO;
    }
}
