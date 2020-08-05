package org.crown.service.dto;

public class FileUploadResponse {

    private String filename;
    private String bucketName;
    private String keyName;
    private String fileDownloadUri;
    private String hashKey;

    public FileUploadResponse() {
    }

    public FileUploadResponse(String filename, String bucketName, String keyName, String fileDownloadUri, String hashKey) {
        this.filename = filename;
        this.bucketName = bucketName;
        this.keyName = keyName;
        this.fileDownloadUri = fileDownloadUri;
        this.hashKey = hashKey;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public String getBucketName() {
        return bucketName;
    }

    public void setBucketName(String bucketName) {
        this.bucketName = bucketName;
    }

    public String getKeyName() {
        return keyName;
    }

    public void setKeyName(String keyName) {
        this.keyName = keyName;
    }

    public String getFileDownloadUri() {
        return fileDownloadUri;
    }

    public void setFileDownloadUri(String fileDownloadUri) {
        this.fileDownloadUri = fileDownloadUri;
    }

    public String getHashKey() {
        return hashKey;
    }

    public void setHashKey(String hashKey) {
        this.hashKey = hashKey;
    }
}
