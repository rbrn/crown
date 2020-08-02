package org.crown.service.impl;

import com.amazonaws.AmazonClientException;
import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.PutObjectResult;
import com.amazonaws.services.s3.model.S3Object;
import org.crown.service.s3Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;

@Service
public class s3ServiceImpl implements s3Service {

    @Autowired
    private AmazonS3 s3client;

    @Value("${awsS3Properties.bucketName}")
    private String bucketName;

    private Logger logger = LoggerFactory.getLogger(s3ServiceImpl.class);

    @Override
    public String[] uploadDocument(String keyName, MultipartFile multiPartFile) throws IOException {
        logger.debug("Storing file {} to s3", multiPartFile.getOriginalFilename());
        try {
            File file = convertMultiPartFileToFile(multiPartFile);
            PutObjectResult result = uploadFile(keyName, file);
            String[] fileData = new String[]{keyName, bucketName, result.getETag()};
            file.delete();
            return fileData;
        } catch (AmazonServiceException ase) {
            logger.warn("GET request failed. Error message: {}", ase.getErrorMessage());

        } catch (AmazonClientException ace) {
            logger.warn("Can't store file in s3. Error message: {}", ace.getMessage());
        }
        return null;
    }

    @Override
    public ByteArrayOutputStream downloadDocument(String bucketName, String keyName) {
        logger.debug("reading file from s3");
        try {
            S3Object s3Object = s3client.getObject(new GetObjectRequest(bucketName, keyName));
            InputStream is = s3Object.getObjectContent();
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            int len;
            byte[] buffer = new byte[4096];
            while ((len = is.read(buffer, 0, buffer.length)) != -1) {
                baos.write(buffer, 0, len);
            }
            return baos;
        } catch (AmazonServiceException ase) {
            logger.warn("GET request failed. Error message: {}", ase.getErrorMessage());

        } catch (AmazonClientException ace) {
            logger.warn("Can't store file in s3. Error message: {}", ace.getMessage());
        } catch (IOException e) {
            logger.warn("Error uploading file  " + "\n Error Message: {}", e.getMessage());
        }
        return null;
    }

    @Override
    public void deleteDocument(String bucketName, String keyName) {
        s3client.deleteObject(bucketName, keyName);
    }

    public File convertMultiPartFileToFile(MultipartFile file) throws IOException {
        File newFile = new File(file.getOriginalFilename());
        FileOutputStream dataStream = new FileOutputStream(newFile);
        dataStream.write(file.getBytes());
        dataStream.close();
        return newFile;
    }

    public PutObjectResult uploadFile(String keyName, File file) {
        return s3client.putObject(bucketName, keyName, file);
    }
}
