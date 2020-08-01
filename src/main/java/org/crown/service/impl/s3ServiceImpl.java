package org.crown.service.impl;

import com.amazonaws.AmazonClientException;
import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.S3Object;
import org.apache.commons.io.IOUtils;
import org.crown.service.s3Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.UUID;

public class s3ServiceImpl implements s3Service {

    @Autowired
    private AmazonS3 s3client;

    @Value("${storage.bucketName}")
    private String bucketName;

    private Logger logger = LoggerFactory.getLogger(s3ServiceImpl.class);

    @Override
    public String uploadDocument(MultipartFile multiPartFile) throws IOException {
        logger.debug("Storing file {} to s3", multiPartFile.getOriginalFilename());
        String keyName = "";
        try {
            File file = convertMultiPartFileToFile(multiPartFile);
            keyName = multiPartFile.getOriginalFilename() + "-" + UUID.randomUUID().toString() + "-" + bucketName;
            uploadFile(keyName, file);
            file.delete();
        } catch (AmazonServiceException ase) {
            logger.warn("GET request failed. Error message: {}", ase.getErrorMessage());

        } catch (AmazonClientException ace) {
            logger.warn("Can't store file in s3. Error message: {}", ace.getMessage());
        }
        return keyName;
    }

    @Override
    public byte[] downloadDocument(String bucketName, String keyName) {
        logger.debug("reading file from s3");
        byte [] bytes = new byte[]{};
        try {
            S3Object s3Object = s3client.getObject(bucketName, keyName);
            bytes = IOUtils.toByteArray(s3Object.getObjectContent());
        } catch (AmazonServiceException ase) {
            logger.warn("GET request failed. Error message: {}", ase.getErrorMessage());

        } catch (AmazonClientException ace) {
            logger.warn("Can't store file in s3. Error message: {}", ace.getMessage());
        } catch (IOException e) {
            logger.warn("Error uploading file  " + "\n Error Message: {}", e.getMessage());
        }
        return bytes;
    }

    public File convertMultiPartFileToFile(MultipartFile file) throws IOException {
        File newFile = new File(file.getOriginalFilename());
        FileOutputStream dataStream = new FileOutputStream(newFile);
        dataStream.write(file.getBytes());
        dataStream.close();
        return newFile;
    }

    public void uploadFile(String keyName, File file) {
        s3client.putObject(bucketName, keyName, file);
    }
}
