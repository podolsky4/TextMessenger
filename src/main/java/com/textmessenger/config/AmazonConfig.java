package com.textmessenger.config;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

@PropertySource("config.properties")
@Component
public class AmazonConfig {

  @Value("${Access_key}")
  private String accessKey;

  @Value("${Secret_key}")
  private String secretKey;

  public static final String BUCKET_NAME = "my-text-messages";

  public AmazonS3 getConnection() {
    return AmazonS3ClientBuilder.standard()
            .withCredentials(new AWSStaticCredentialsProvider(
                    new BasicAWSCredentials(
                            accessKey,    // put your key from aws console
                            secretKey))) // put your key from aws console
            .withRegion(Regions.US_EAST_2).build(); // put your region from aws Region
  }
}
