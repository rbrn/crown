package org.crown.repository.azure;

import com.azure.storage.blob.BlobClient;
import com.azure.storage.blob.BlobContainerClient;
import com.azure.storage.blob.BlobServiceClient;
import com.azure.storage.blob.BlobServiceClientBuilder;
import com.azure.storage.blob.models.BlobErrorCode;
import com.azure.storage.blob.models.BlobStorageException;
import org.crown.repository.BlobStorageRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import java.io.InputStream;

@Repository
public class AzureBlobStorageRepository implements BlobStorageRepository {
    @Value("${azure.endpoint}")
    private String endpoint;
    @Value("${azure.sasToken}")
    private String sasToken;

    public void createBlob(String name, InputStream data, long length) {
        /* Create a new BlobServiceClient with a SAS Token */
        BlobServiceClient blobServiceClient = new BlobServiceClientBuilder()
            .endpoint(endpoint)
            .sasToken(sasToken)
            .buildClient();

        /* Create a new container client */
        BlobContainerClient containerClient = null;
        try {
            containerClient = blobServiceClient.createBlobContainer("my-container-name");
        } catch (BlobStorageException ex) {
            // The container may already exist, so don't throw an error
            if (!ex.getErrorCode().equals(BlobErrorCode.CONTAINER_ALREADY_EXISTS)) {
                throw ex;
            }
        }

        /* Upload the file to the container */
        BlobClient blobClient = containerClient.getBlobClient(name);
        blobClient.upload(data, length);
    }
}
