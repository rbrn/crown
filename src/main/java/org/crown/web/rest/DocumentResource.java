package org.crown.web.rest;

import io.github.jhipster.web.util.HeaderUtil;
import org.crown.service.dto.FileUploadResponse;
import org.crown.service.s3Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class DocumentResource {

    private final Logger logger = LoggerFactory.getLogger(DocumentResource.class);

    private final s3Service s3Client;

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    @Autowired
    public DocumentResource(s3Service s3Client) {
        this.s3Client = s3Client;
    }

    @PostMapping("file/upload")
    public FileUploadResponse uploadDocument(@RequestParam("file") MultipartFile file) {
        try {
            String[] fileData = s3Client.uploadDocument(UUID.randomUUID().toString(), file);
            String fileDownloadUri = ServletUriComponentsBuilder
                .fromCurrentContextPath()
                .path(file.getOriginalFilename() + "_" + fileData[0] + "_" + fileData[1])
                .toUriString();
            return new FileUploadResponse(file.getOriginalFilename(), fileData[1], fileData[0],
                fileDownloadUri, fileData[2]);
        } catch (IOException e) {
            logger.warn("Error uploading file {}. Error: {}", file.getOriginalFilename(), e.getMessage());
        }

        return new FileUploadResponse();

    }

    @PostMapping("files/upload")
    public List<FileUploadResponse> uploadDocuments(@RequestParam("files") MultipartFile[] files) {
        return Arrays.asList(files)
            .stream()
            .map(file -> uploadDocument(file))
            .collect(Collectors.toList());

    }

    @GetMapping("file/download/{filePath}/{fileName}")
    public ResponseEntity getDocuments(@PathVariable String filePath, @PathVariable String fileName, HttpServletRequest request) {

        try {
            String[] fileInfo = filePath.split("_");
            ByteArrayOutputStream downloadInputStream = s3Client.downloadDocument(fileInfo[2], fileInfo[1]);
            return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(fileName))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
                .body(downloadInputStream.toByteArray());
        } catch (Exception e) {
            logger.warn("Error downloading file {}. Error: {}", fileName, e.getMessage());
        }


        return ResponseEntity.ok()
            .contentType(MediaType.parseMediaType("crown/octet-stream"))
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
            .body(new byte[]{});

    }

    @DeleteMapping("/file/{id}")
    public ResponseEntity<Void> deleteObject(@PathVariable String id) {
        logger.debug("REST request to delete s3 document : {}", id);
        String[] fileInfo = id.split("_");
        s3Client.deleteDocument(fileInfo[2], fileInfo[1]);
        return ResponseEntity.noContent().headers(HeaderUtil.createAlert(applicationName, "Deleted file", id)).build();
    }

}
