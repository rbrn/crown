import React, { useState } from 'react';
import axios from 'axios';

const API_BASE = "http://localhost:8080"

function submitForm(contentType, data, setResponse) {
  axios({
    url: `${API_BASE}/upload`,
    method: 'POST',
    data() { },
    headers: {
      'Content-Type': contentType
    }
  }).then((response) => {
    setResponse(response.data);
  }).catch((error) => {
    setResponse("error");
  })
}

function UploadDocuments() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");

  function uploadWithFormData() {

  }

  return (
    <div className="App">
      <h4>Upload Form</h4>
      <form style={{ marginBottom: '10px' }}>

        <label>
          File
          <input type="file" name="file" onChange={(e) => setFile(e.target.files[0])} />
        </label>

        <input type="button" value="Upload" onClick={uploadWithFormData} />
      </form>
    </div>
  );
}

export default UploadDocuments;
