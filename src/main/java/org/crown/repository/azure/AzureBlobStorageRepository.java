package org.crown.repository.azure;

import com.azure.storage.blob.BlobClient;
import com.azure.storage.blob.BlobContainerClient;
import com.azure.storage.blob.BlobServiceClient;
import com.azure.storage.blob.BlobServiceClientBuilder;
import com.azure.storage.blob.models.BlobStorageException;
import com.azure.storage.common.StorageSharedKeyCredential;
import org.crown.repository.BlobStorageRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

@Repository
public class AzureBlobStorageRepository implements BlobStorageRepository {
    @Value("${azure.endpoint}")
    private String endpoint;
    @Value("${azure.accountName}")
    private String accountName;
    @Value("${azure.accountKey}")
    private String accountKey;

    public void createBlob(String containerName, String name, InputStream data, long length) {
        BlobServiceClient blobServiceClient = createBlobServiceClient();

        /* Create a new container client */
        try {
            BlobContainerClient containerClient = blobServiceClient.getBlobContainerClient(containerName);
            /* Upload the file to the container */
            BlobClient blobClient = containerClient.getBlobClient(name);
            blobClient.upload(data, length);
        } catch (BlobStorageException ex) {
            throw ex;
        }
    }

    @Override
    public ByteArrayOutputStream getBlob(String containerName, String name) throws IOException {
        BlobServiceClient blobServiceClient = createBlobServiceClient();

        BlobContainerClient containerClient = blobServiceClient.getBlobContainerClient(containerName);

        BlobClient blobClient = containerClient.getBlobClient(name);
        try(ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            blobClient.download(outputStream);
            return outputStream;
        }
    }

    private BlobServiceClient createBlobServiceClient() {
        StorageSharedKeyCredential credential = new StorageSharedKeyCredential(accountName, accountKey);

        /* Create a new BlobServiceClient with a SAS Token */
        BlobServiceClient blobServiceClient = new BlobServiceClientBuilder()
            .endpoint(endpoint)
            .credential(credential)
            .buildClient();
        return blobServiceClient;
    }
}
