import React, { useEffect, useState } from 'react';
import { storage } from '../firebase';
import { listAll, getDownloadURL, ref, deleteObject } from 'firebase/storage';


function Files() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      const storageRef = ref(storage, 'pdfs'); // Change the reference to the 'pdfs' folder

      try {
        const fileRefs = await listAll(storageRef);

        const fileList = await Promise.all(
          fileRefs.items.map(async (fileRef) => {
            const downloadURL = await getDownloadURL(fileRef);
            return { name: fileRef.name, url: downloadURL };
          })
        );

        setFiles(fileList);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchFiles();
  }, []);

  const handleDelete = async (fileName) => {
    const storageRef = ref(storage, `pdfs/${fileName}`);

    try {
      // Delete the file from Firebase Storage
      await deleteObject(storageRef);

      // Remove the deleted file from the local files state
      setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));

      // You can also delete the file reference from Firestore here if needed
      // Example: firestore.collection('files').doc(fileName).delete();

      console.log('File deleted successfully');
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  return (
    <div className='container mt-5 text-center' style={{maxWidth:600}}>
     
      <h2 className='mb-3'>Uploaded File List</h2>
      <table className="table table-bordered border-secondary">
  <thead>
    <tr>
      <th>File Name</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {files.map((file) => (
      <tr key={file.name}>
        <td>
          <a href={file.url} target="_blank" rel="noopener noreferrer">
            {file.name}
          </a>
        </td>
     
        <td>
          <button
            onClick={() => handleDelete(file.name)}
            className="btn px-5"
            style={{ backgroundColor: "#FFBA24" }}
          >
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

      
     
    </div>
  );
}

export default Files;
