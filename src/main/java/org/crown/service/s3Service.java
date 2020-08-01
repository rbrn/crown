package org.crown.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface s3Service {
    public String uploadDocument(MultipartFile file) throws IOException;
    public byte[] downloadDocument(String bucketName, String keyName) throws IOException;
}
