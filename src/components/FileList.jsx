import React, { useEffect, useState } from 'react';
import { storage } from '../firebase';
import { listAll, getDownloadURL, ref } from 'firebase/storage';
import Header from './Header';
import Footer from './Footer';
import { collection, query, where, getDocs } from 'firebase/firestore'; // Import Firestore functions
import { db } from '../firebase'; // Import the 'db' instance from your firebase.js

function FileList() {
  const [files, setFiles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchFiles = async () => {
      const storageRef = ref(storage, 'pdfs'); // Change the reference to the 'pdfs' folder

      try {
        const fileRefs = await listAll(storageRef);

        const fileList = await Promise.all(
          fileRefs.items.map(async (fileRef) => {
            const downloadURL = await getDownloadURL(fileRef);
            const fileName = fileRef.name;

            // Fetch additional details (category and description) from Firestore
            const q = query(collection(db, 'files'), where('name', '==', fileName));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.docs.length > 0) {
              const fileData = querySnapshot.docs[0].data();
              return {
                name: fileName,
                url: downloadURL,
                category: fileData.category,
                description: fileData.description,
              };
            } else {
              // Handle the case where the document does not exist in Firestore
              return {
                name: fileName,
                url: downloadURL,
                category: 'No category available',
                description: 'No description available',
              };
            }
          })
        );

        setFiles(fileList);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchFiles();
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className='container'>
      <Header />
      <div className='container text-center' style={{maxWidth:900}}>
      <h2>Study Material</h2>
      <p>you can filter by subjects</p>
      
      <select value={selectedCategory} onChange={handleCategoryChange} class="form-select form-select-lg mb-3">
        <option value="">All Subjects</option>
        <option value="IML">IML</option>
        <option value="COA">COA</option>
        <option value="MAD">MAD</option>
        <option value="WBJP">WBJP</option>
      </select>
      <table className="table table-bordered border-secondary">
  <thead>
    <tr>
      <th>Name</th>
      <th>Category</th>
      <th>Description</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {files
      .filter((file) => selectedCategory === '' || file.category === selectedCategory)
      .map((file) => (
        <tr key={file.name}>
          <td>{file.name}</td>
          <td>{file.category}</td>
          <td>{file.description}</td>
          <td>
            <a href={file.url} target="_blank" rel="noopener noreferrer">
              View File
            </a>
          </td>
        </tr>
      ))}
  </tbody>
</table>

      </div>
      <Footer />
    </div>
  );
}

export default FileList;
