import React, { useState } from 'react';
import { auth, storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL, updateMetadata } from 'firebase/storage'; // Import updateMetadata
import { collection, addDoc } from 'firebase/firestore'; // Import Firestore functions
import { db } from '../firebase'; // Import the 'db' instance from your firebase.js

function FileUploader() {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleUpload = async () => {
    if (!file || !description || !category) {
      alert('Please select a file, provide a description, and enter a category.');
      return;
    }

    // Check if the user is an admin (You need to implement this logic)
    const isAdmin = true; // Replace with your admin check logic

    if (!isAdmin) {
      alert('You are not authorized to upload files.');
      return;
    }

    const storageRef = ref(storage, `pdfs/${file.name}`);
    try {
      // Upload the file
      await uploadBytes(storageRef, file);

      // Set the description and category in the file's metadata
      await updateMetadata(storageRef, {
        customMetadata: {
          description: description,
          category: category, // Add category to metadata
        },
      });

      // Store file metadata in Firestore
      const fileRef = collection(db, 'files'); // 'files' is the collection name for file metadata
      await addDoc(fileRef, {
        name: file.name,
        description: description,
        category: category,
      });

      const downloadURL = await getDownloadURL(storageRef);
      alert('File uploaded successfully!');
      setFile(null);
      setDescription('');
      setCategory('');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className='text-center container' style={{maxWidth:370}}>
      <h2>Upload Study Material </h2>
      
      <div class="mb-3 mt-5">
  <input class="form-control" type="file" id="formFile" onChange={handleFileChange} required/>
</div>
<div class="mb-3 row">
    <label for="inputcat" class="col-sm-3 col-form-label">Category</label>
    <div class="col-sm-9">
      <input type="text" class="form-control" id="inputcat" onChange={handleCategoryChange} required/>
    </div>
  </div>
  <div class="mb-3 row">
    <label for="inputdes" class="col-sm-3 col-form-label">Description</label>
    <div class="col-sm-9">
      <input type="text" class="form-control" id="inputdes" onChange={handleDescriptionChange} required/>
    </div>
  </div>
  <button onClick={handleUpload} className='btn px-5' style={{backgroundColor:"#FFBA24"}}>Upload</button>
        
      
      
      
    </div>
  );
}

export default FileUploader;
