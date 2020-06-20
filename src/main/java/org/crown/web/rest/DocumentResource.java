package org.crown.web.rest;

import io.github.jhipster.web.util.HeaderUtil;
import org.crown.repository.BlobStorageRepository;
import org.crown.web.rest.errors.BadRequestAlertException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

@RestController
@RequestMapping("/api")
public class DocumentResource {
    private static final String ENTITY_NAME = "documentResource";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private BlobStorageRepository blobStorageRepository;

    @Autowired
    public DocumentResource(BlobStorageRepository blobStorageRepository) {
        this.blobStorageRepository = blobStorageRepository;
    }

    @PostMapping("/document/upload")
    public ResponseEntity uploadDocument(@RequestParam("file") MultipartFile file) throws BadRequestAlertException, URISyntaxException {
        try {
            blobStorageRepository.createBlob(file.getName(), file.getInputStream(), file.getSize());
        } catch (IOException io) {
            throw new BadRequestAlertException("Error uploading file", ENTITY_NAME, "idnull");
        }

        return ResponseEntity.created(new URI("/api/documents")).
            headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, "")).
            build();
    }
}
