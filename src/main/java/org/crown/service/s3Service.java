package org.crown.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

public interface s3Service {
    public String[] uploadDocument(String keyName, MultipartFile file) throws IOException;
    public ByteArrayOutputStream downloadDocument(String bucketName, String keyName) throws IOException;
    public void deleteDocument(String bucketName, String keyName);
}
