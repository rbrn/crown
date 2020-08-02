package org.crown.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;

@Configuration
public class s3configuration {
  @Value("${awsS3Properties.ACCESS_KEY}")
  private String accessKey;

  @Value("${awsS3Properties.SECRET_KEY}")
  private String secretKey;

  @Value("${awsS3Properties.REGION}")
  private String region;

  @Bean
  public AmazonS3 s3client() {

    BasicAWSCredentials awsCredentials = new BasicAWSCredentials(accessKey, secretKey);
    AmazonS3 s3Client = AmazonS3ClientBuilder.standard()
                .withRegion(Regions.fromName(region))
                            .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                            .build();

    return s3Client;
  }
}
