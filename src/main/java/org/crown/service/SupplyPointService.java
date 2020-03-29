package org.crown.service;

import org.crown.domain.SupplyPoint;
import org.crown.repository.SupplyPointRepository;
import org.crown.repository.search.SupplyPointSearchRepository;
import org.crown.service.dto.SupplyPointDTO;
import org.crown.service.mapper.SupplyPointMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing {@link SupplyPoint}.
 */
@Service
public class SupplyPointService {

    private final Logger log = LoggerFactory.getLogger(SupplyPointService.class);

    private final SupplyPointRepository supplyPointRepository;

    private final SupplyPointMapper supplyPointMapper;

    private final SupplyPointSearchRepository supplyPointSearchRepository;

    public SupplyPointService(SupplyPointRepository supplyPointRepository, SupplyPointMapper supplyPointMapper, SupplyPointSearchRepository supplyPointSearchRepository) {
        this.supplyPointRepository = supplyPointRepository;
        this.supplyPointMapper = supplyPointMapper;
        this.supplyPointSearchRepository = supplyPointSearchRepository;
    }

    /**
     * Save a supplyPoint.
     *
     * @param supplyPointDTO the entity to save.
     * @return the persisted entity.
     */
    public SupplyPointDTO save(SupplyPointDTO supplyPointDTO) {
        log.debug("Request to save SupplyPoint : {}", supplyPointDTO);
        SupplyPoint supplyPoint = supplyPointMapper.toEntity(supplyPointDTO);
        supplyPoint = supplyPointRepository.save(supplyPoint);
        SupplyPointDTO result = supplyPointMapper.toDto(supplyPoint);
        supplyPointSearchRepository.save(supplyPoint);
        return result;
    }

    /**
     * Get all the supplyPoints.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    public Page<SupplyPointDTO> findAll(Pageable pageable) {
        log.debug("Request to get all SupplyPoints");
        return supplyPointRepository.findAll(pageable)
            .map(supplyPointMapper::toDto);
    }

    /**
     * Get one supplyPoint by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    public Optional<SupplyPointDTO> findOne(String id) {
        log.debug("Request to get SupplyPoint : {}", id);
        return supplyPointRepository.findById(id)
            .map(supplyPointMapper::toDto);
    }

    /**
     * Delete the supplyPoint by id.
     *
     * @param id the id of the entity.
     */
    public void delete(String id) {
        log.debug("Request to delete SupplyPoint : {}", id);
        supplyPointRepository.deleteById(id);
        supplyPointSearchRepository.deleteById(id);
    }

    /**
     * Search for the supplyPoint corresponding to the query.
     *
     * @param query the query of the search.
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    public Page<SupplyPointDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of SupplyPoints for query {}", query);
        return supplyPointSearchRepository.search(queryStringQuery(query), pageable)
            .map(supplyPointMapper::toDto);
    }
}
