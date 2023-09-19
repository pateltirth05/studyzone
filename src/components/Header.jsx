import React from 'react'
import logo from "../assets/2.svg"
import { auth } from "../firebase";
import { useState,useEffect } from 'react';
function Header() {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const handleLogout = async () => {
    try {
      await auth.signOut(); // Sign out the user
      console.log('User logged out successfully');
      
      // Navigate to the desired route
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        setUser(user);
        if (user) {
          setUserName(user.displayName);
        } else {
          setUserName("");
        }
      });
  
      return () => unsubscribe();
    }, []);
  return (
    <div className='container h5'>
      <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
      <div class="col-md-3 mb-2 mb-md-0">
        <a href="/" class="d-inline-flex link-body-emphasis text-decoration-none">
<img src={logo} width={80}/>
        </a>
      </div>

      <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li><a href="/" class="nav-link px-2 link-secondary">Home</a></li>
        <li><a href="/filelist" class="nav-link px-2 link-secondary">Material</a></li>
      </ul>
  {user?(
     <>
     <div class="dropdown text-end">
          <a href="#" class="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="https://www.pngitem.com/pimgs/m/146-1468843_profile-icon-orange-png-transparent-png.png" alt="mdo" width="32" height="32" class="rounded-circle"/>
          </a>
          <ul class="dropdown-menu text-small" >
            <li class="dropdown-item" >{user.displayName || user.email}</li>
            <li class="dropdown-item">{user.email}</li>
            <li><hr class="dropdown-divider"/></li>
            <li><a class="dropdown-item" href="#"  onClick={handleLogout}>Sign out</a></li>
          </ul>
        </div>
    </>          
    ):(
<div class="col-md-3 text-end">
        <a type="button" class="btn btn-outline-primary me-2" href='/signin'>Login</a>
        <a type="button" class="btn btn-primary" href='/signup'>Sign-up</a>
      </div>
    )
  }
      
    </header>
    </div>
  )
}

export default Header
