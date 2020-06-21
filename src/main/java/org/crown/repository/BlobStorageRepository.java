package org.crown.repository;

import java.io.InputStream;

public interface BlobStorageRepository {
    void createBlob(String name, InputStream data, long length);
}
