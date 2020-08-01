package org.crown.web.rest;

import org.crown.service.dto.FileUploadResponse;
import org.crown.service.impl.s3ServiceImpl;
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
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class DocumentResource {

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final Logger logger = LoggerFactory.getLogger(DocumentResource.class);

    private s3ServiceImpl s3Client;

    @Autowired
    public DocumentResource(s3ServiceImpl s3Client) {
        this.s3Client = s3Client;
    }

    @PostMapping("/uploadFile")
    public FileUploadResponse uploadDocument(@RequestParam("file") MultipartFile file) {
        String[] fileInfo = new String[]{};
        String fileName = "";
        try {
            fileName = s3Client.uploadDocument(file);
            fileInfo = fileName.split("-");
        } catch (IOException e) {
            logger.warn("Error uploading file {}. Error: {}", file.getOriginalFilename(), e.getMessage());
        }

        String fileDownloadUri = ServletUriComponentsBuilder
                                 .fromCurrentContextPath()
                                 .path("/api/file/v1/downloadFile/")
                                 .path(fileName.replace("-", "/"))
                                 .toUriString();
        if(fileInfo.length > 0){
            return new FileUploadResponse(fileInfo[0], fileInfo[2], fileInfo[1], fileDownloadUri);
        }
        return new FileUploadResponse();

    }

    @PostMapping("/uploadFiles")
    public List<FileUploadResponse> uploadDocuments(@RequestParam("files") MultipartFile[] files) {
        return Arrays.asList(files)
            .stream()
            .map(file -> uploadDocument(file))
            .collect(Collectors.toList());

    }

    @GetMapping("documents/{filePath}")
    public ResponseEntity getDocuments(@PathVariable String filePath, HttpServletRequest request) {
        String[] fileInfo = filePath.split("/");
        String contentType = null;
        byte[] byteArray = new byte[]{};

        try {
            byteArray = s3Client.downloadDocument(fileInfo[2], fileInfo[1]);
            contentType = request.getServletContext().getMimeType(filePath);
        } catch (Exception e) {
            logger.warn("Error downloading file {}. Error: {}", filePath, e.getMessage());
        }

        if(contentType == null) {
            contentType = "crown/octet-stream";
        }

        return ResponseEntity.ok()
            .contentType(MediaType.parseMediaType(contentType))
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileInfo[0] + "\"")
            .body(byteArray);

    }
}
