package org.crown.config;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;

public class S3Config {

    @Value("${storage.accessKey}")
    private String accessKey;

    @Value("${storage.secretKey}")
    private String secretKey;

    @Bean
    public AmazonS3 s3client() {
        AWSCredentials credentials = new BasicAWSCredentials(this.accessKey, this.secretKey);
        AmazonS3 s3Client = AmazonS3ClientBuilder.standard()
            .withRegion(Regions.AP_EAST_1) // change this based on the selected region we are in
            .withCredentials(new AWSStaticCredentialsProvider(credentials))
            .build();
        return s3Client;
    }
}
