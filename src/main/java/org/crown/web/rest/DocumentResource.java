package org.crown.web.rest;

import com.azure.core.annotation.QueryParam;
import io.github.jhipster.web.util.HeaderUtil;
import org.crown.domain.User;
import org.crown.repository.BlobStorageRepository;
import org.crown.service.UserService;
import org.crown.web.rest.errors.BadRequestAlertException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.constraints.NotEmpty;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

@RestController
@RequestMapping("/api")
public class DocumentResource {
    private static final String ENTITY_NAME = "document";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private BlobStorageRepository blobStorageRepository;

    private final UserService userService;

    @Autowired
    public DocumentResource(BlobStorageRepository blobStorageRepository, UserService userService) {
        this.blobStorageRepository = blobStorageRepository;
        this.userService = userService;
    }

    @PostMapping("/document/upload")
    public ResponseEntity uploadDocument(@NotEmpty @RequestParam("entityType") String entityType,
                                         @NotEmpty @RequestParam("fieldType") String fieldType,
                                         @RequestParam("file") MultipartFile file) throws BadRequestAlertException, URISyntaxException {
        try {
            User user = userService.getUserWithAuthorities().orElseThrow(() -> new RuntimeException("User could not be found"));
            String fileName = user.getLogin() + "/" + file.getOriginalFilename();
            String containerName = entityType + "-" + fieldType;
            blobStorageRepository.createBlob(containerName, fileName, file.getInputStream(), file.getSize());
        } catch (IOException io) {
            throw new BadRequestAlertException("Error uploading file", entityType + "-" + ENTITY_NAME, "idnull");
        }

        return ResponseEntity.created(new URI("/api/documents")).
            headers(HeaderUtil.createEntityCreationAlert(applicationName, true, entityType + "-" + ENTITY_NAME, "")).
            build();
    }

    @GetMapping("documents/{entityType}/{fieldType}")
    public ResponseEntity getDocuments(@PathVariable String entityType,
                                       @PathVariable String fieldType,
                                       @QueryParam("fileName") String fileName,
                                       HttpServletRequest request) {
        try {
            User user = userService.getUserWithAuthorities().orElseThrow(() -> new RuntimeException("User could not be found"));
            String updatedFileName = user.getLogin() + "/" + fileName;
            String containerName = entityType + "-" + fieldType;
            ByteArrayOutputStream blob = blobStorageRepository.getBlob(containerName, updatedFileName);
            String contentType = request.getServletContext().getMimeType(updatedFileName);
            return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
                .body(blob.toByteArray());
        } catch (IOException e) {
            throw new BadRequestAlertException("Error downloading file", entityType + " - " + ENTITY_NAME + ":" + fileName, "idnull");
        }
    }
}
