package org.crown.service.mapper;


import org.crown.domain.*;
import org.crown.service.dto.SupplyPointDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link SupplyPoint} and its DTO {@link SupplyPointDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface SupplyPointMapper extends EntityMapper<SupplyPointDTO, SupplyPoint> {



    default SupplyPoint fromId(String id) {
        if (id == null) {
            return null;
        }
        SupplyPoint supplyPoint = new SupplyPoint();
        supplyPoint.setId(id);
        return supplyPoint;
    }
}
