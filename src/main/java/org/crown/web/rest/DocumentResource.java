package org.crown.web.rest;

import io.github.jhipster.web.util.HeaderUtil;
import org.crown.service.dto.FileUploadResponse;
import org.crown.service.s3Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
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
        String[] fileData = new String[]{};
        String fileDownloadUri = "";
        try{
            fileData = s3Client.uploadDocument(UUID.randomUUID().toString(), file);
            fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/file/download/")
                .path(fileData[1] + "&")
                .path(fileData[0])
                .toUriString();

        } catch (IOException e) {
            logger.warn("Error uploading file {}. Error: {}", file.getOriginalFilename(), e.getMessage());
        }
        if(fileData.length == 0){
            return new FileUploadResponse();
        }

        return new FileUploadResponse(fileData[0], fileDownloadUri, fileData[2]);
    }

    @PostMapping("files/upload")
    public List<FileUploadResponse> uploadDocuments(@RequestParam("files") MultipartFile[] files) {
        List<FileUploadResponse> out = Arrays.asList(files)
            .stream()
            .map(file -> uploadDocument(file))
            .collect(Collectors.toList());
        return out;

    }

    @GetMapping("file/download/{filePath}")
    public ResponseEntity getDocuments(@PathVariable String filePath, HttpServletRequest request) {
        /*
        Not implemented yet. FE has no current use case for this.
         */
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, "file", filePath))
            .build();
        /*
        String[] fileInfo = filePath.split("_");
        try {
            ByteArrayOutputStream downloadInputStream = s3Client.downloadDocument(fileInfo[2], fileInfo[1]);
            return new FileDownloadResponse(fileInfo[0], downloadInputStream.toByteArray());
        } catch (Exception e) {
            logger.warn("Error downloading file {}. Error: {}", fileInfo[0], e.getMessage());
        }


        return new FileDownloadResponse();

        */

    }

    @DeleteMapping("/file/{id}")
    public ResponseEntity<Void> deleteObject(@PathVariable String id) {
        logger.debug("REST request to delete s3 document : {}", id);
        String[] fileInfo = id.split("&");
        s3Client.deleteDocument(fileInfo[0], fileInfo[1]);
        return ResponseEntity.noContent().headers(HeaderUtil.createAlert(applicationName, "Deleted file", id)).build();
    }

}
