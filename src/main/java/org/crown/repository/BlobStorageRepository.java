package org.crown.repository;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

public interface BlobStorageRepository {
    void createBlob(String entity, String name, InputStream data, long length);
    ByteArrayOutputStream getBlob(String entity, String name) throws IOException;
}
