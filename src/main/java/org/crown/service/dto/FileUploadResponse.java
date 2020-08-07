package org.crown.service.dto;

public class FileUploadResponse {

    private String filename;
    private String fileDownloadUri;
    private String hashKey;

    public FileUploadResponse() {
    }

    public FileUploadResponse(String filename, String fileDownloadUri, String hashKey) {
        this.filename = filename;
        this.fileDownloadUri = fileDownloadUri;
        this.hashKey = hashKey;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
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
