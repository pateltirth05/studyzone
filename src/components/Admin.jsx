import React from 'react'
import FileUploader from './FileUploader'
import Head from './Head'
import Files from './Files'


function Admin() {
  return (
    <div>
        <Head/>
      <FileUploader/>
      <Files/>
    </div>
  )
}

export default Admin
