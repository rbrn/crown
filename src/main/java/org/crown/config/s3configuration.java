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
  @Value("${awsS3Properties.access_key_id}")
  private String awsId;
 
  @Value("${awsS3Properties.secret_access_key}")
  private String awsKey;
  
  @Value("${awsS3Properties.region}")
  private String region;
 
  @Bean
  public AmazonS3 s3client() {
    
    BasicAWSCredentials awsCreds = new BasicAWSCredentials(awsId, awsKey);
    AmazonS3 s3Client = AmazonS3ClientBuilder.standard()
                .withRegion(Regions.fromName(region))
                            .withCredentials(new AWSStaticCredentialsProvider(awsCreds))
                            .build();
    
    return s3Client;
  }
}
