import { Route, Routes } from "react-router-dom"
import Home from "./components/Home";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import FileList from "./components/FileList";
import Admin from "./components/Admin";
import User from "./components/User";
function App() {

  return (
    <>
      <div>
        
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/filelist" element={<FileList/>}/>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/user" element={<User/>}/>
        </Routes>
       
        
       </div>
    </>
  )
}

export default App
