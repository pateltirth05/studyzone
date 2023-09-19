import React from 'react'
import logo from "../assets/1.svg"
import logoes from "../assets/2.svg"

import  { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore"; // Import Firestore functions
import { auth, db } from "../firebase"; // Import the 'auth' and 'db' instances from your firebase.js
function Signin() {
    const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if (!values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);

        // Store user login data in Firestore
        const userRef = collection(db, "logins"); // "logins" is the collection name for login data
        await addDoc(userRef, {
          uid: res.user.uid,
          email: res.user.email,
          loginTime: serverTimestamp(),
        });

        if (values.email === 'studyzone@gmail.com' && values.pass === 'studyzone') {
            // Admin login
            navigate('/admin'); // Redirect to the admin dashboard
          } else {
            // User login
            navigate('/'); // Redirect to the user dashboard
          }
    
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };
  return (
    <div className='container'>
          <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
      <div class="col-md-3 mb-2 mb-md-0">
        <a href="/" class="d-inline-flex link-body-emphasis text-decoration-none">
<img src={logoes} width={80}/>
        </a>
      </div>

      <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li><a href="/" class="nav-link px-2 link-secondary">Home</a></li>
        
      </ul>

      <div class="col-md-3 text-end">
       
        <a type="button" class="btn btn-primary" href='/signup'>Sign-up</a>
      </div>
    </header>
      <div class="d-flex align-items-center py-4 bg-body-tertiary" >
    


    
<main class="form-signin w-100 m-auto text-center" style={{maxWidth:330}}>
  <form>
    <img class="mb-4" src={logo} alt="" width="200" height="100"/>
    <h1 class="h3 mb-3 fw-normal">Sign in</h1>

    <div class="form-floating">
      <input type="email" class="form-control" id="floatingInput" placeholder="name@gmail.com"  onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          } required/>
      <label for="floatingInput">Email address</label>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control" id="floatingPassword" placeholder="Password" onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          } required/>
      <label for="floatingPassword">Password</label>
    </div>
    <b className="text-center">{errorMsg}</b>
    <a class=" mb-3 text-body-secondary mt-3 nav-link" href='/'>Forgot Password ?</a>

   
    <button class="btn btn-primary w-100 py-2 " type="submit" disabled={submitButtonDisabled} onClick={handleSubmission}>Sign in</button>
   
  </form>
</main>

    

</div>
    </div>
  )
}

export default Signin
