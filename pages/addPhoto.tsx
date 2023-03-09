import React, { useState } from 'react';
import axios from 'axios';

const S3Uploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e:any) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    axios.post('http://66.241.124.243:80/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(() => {
      console.log('File uploaded successfully');
    }).catch((error) => {
      console.error(error);
    });
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default S3Uploader;
