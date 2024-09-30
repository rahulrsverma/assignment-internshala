Frontend------------------------------------------------------>
import React, { useState } from 'react';

function FileUploadPage() {
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      const fileType = uploadedFile.type.split('/')[0];
      setFile(uploadedFile);
      setFileType(fileType);

      // Create a URL to preview the file
      const url = URL.createObjectURL(uploadedFile);
      setPreviewUrl(url);
    }
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    // Send the file to the backend API
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    console.log(result);
  };

  return (
    <div>
      <h1>File Upload with Preview</h1>
      <input type="file" onChange={handleFileChange} />

      {previewUrl && fileType === 'image' && (
        <img src={previewUrl} alt="Preview" width="300" />
      )}
      {previewUrl && fileType === 'audio' && (
        <audio controls>
          <source src={previewUrl} type={file.type} />
        </audio>
      )}
      {previewUrl && fileType === 'video' && (
        <video controls width="300">
          <source src={previewUrl} type={file.type} />
        </video>
      )}
      {previewUrl && fileType === 'application' && (
        <iframe src={previewUrl} title="PDF Preview" width="300" height="400"></iframe>
      )}

      {file && (
        <button onClick={handleFileUpload}>Upload File</button>
      )}
    </div>
  );
}

export default FileUploadPage;
