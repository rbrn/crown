package org.crown.web.rest;

import com.azure.core.annotation.Get;
import com.azure.core.annotation.QueryParam;
import io.github.jhipster.web.util.HeaderUtil;
import org.apache.commons.io.IOUtils;
import org.crown.repository.BlobStorageRepository;
import org.crown.web.rest.errors.BadRequestAlertException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.validation.constraints.NotEmpty;
import javax.websocket.server.PathParam;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URI;
import java.net.URISyntaxException;

@RestController
@RequestMapping("/api")
public class DocumentResource {
    private static final String ENTITY_NAME = "document";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private BlobStorageRepository blobStorageRepository;

    @Autowired
    public DocumentResource(BlobStorageRepository blobStorageRepository) {
        this.blobStorageRepository = blobStorageRepository;
    }

    @PostMapping("/document/upload")
    public ResponseEntity uploadDocument(@NotEmpty @RequestParam("entityType") String entity,
                                         @RequestParam("file") MultipartFile file) throws BadRequestAlertException, URISyntaxException {
        try {
            blobStorageRepository.createBlob(entity, file.getName(), file.getInputStream(), file.getSize());
        } catch (IOException io) {
            throw new BadRequestAlertException("Error uploading file", entity + "-" + ENTITY_NAME, "idnull");
        }

        return ResponseEntity.created(new URI("/api/documents")).
            headers(HeaderUtil.createEntityCreationAlert(applicationName, true, entity + "-" + ENTITY_NAME, "")).
            build();
    }

    @GetMapping("documents/{entityType}")
    public ResponseEntity getDocuments(@PathVariable String entityType, @QueryParam("filename") String filename,
                                       HttpServletRequest request) {
        try {
            ByteArrayOutputStream blob = blobStorageRepository.getBlob(entityType, filename);
            String contentType = request.getServletContext().getMimeType(filename);
            return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
                .body(blob.toByteArray());
        } catch (IOException e) {
            throw new BadRequestAlertException("Error downloading file", entityType + " - " + ENTITY_NAME + ":" + filename, "idnull");
        }
    }
}
