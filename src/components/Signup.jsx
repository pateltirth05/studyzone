import React from 'react'
import logo from "../assets/1.svg"
import logoes from "../assets/2.svg"
import  { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore"; // Import Firestore functions
import { auth,db } from "../firebase"; 
function Signup() {
    const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
    
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if (!values.name || !values.email || !values.pass ) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");
  
    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        const user = res.user;
  
        // Store user data in Firestore
        const userRef = collection(db, "users");
        await addDoc(userRef, {
          uid: user.uid,
          name: values.name,
          email: user.email,
          // Include phone value
          signUpTime: serverTimestamp(),
        });
  
        await updateProfile(user, {
          displayName: values.name,
        });
  
        navigate("/");
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
        <a type="button" class="btn btn-outline-primary me-2" href='/signin'>Login</a>
       
      </div>
    </header>
      <div class="d-flex align-items-center py-4 bg-body-tertiary text-center">
<main class="form-signin w-100 m-auto" style={{maxWidth:330}}>
  <form>
    <img class="mb-4" src={logo} alt="" width="200" height="100"/>
    <h1 class="h3 mb-3 fw-normal"> Sign up</h1>
     <div className='form-floating'>
     <input type="text" class="form-control" placeholder=" Name" id="floatingname" onChange={(event) =>
            setValues((prev) => ({ ...prev, name: event.target.value }))
          }
                    required />
                    <label for="floatingname">Name</label>
     </div>
    <div class="form-floating">
      <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"  onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          } required/>
      <label for="floatingInput">Email address</label>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control" id="floatingPassword" placeholder="Password" onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))} required/>
      <label for="floatingPassword">Password</label>
    </div>
    <b className="text-center">{errorMsg}</b>
    <a href='/signin' className='nav-link'>Already sign up?</a>
   
    <button class="btn btn-primary w-100 py-2 mt-4" type="submit" onClick={handleSubmission} disabled={submitButtonDisabled}>Sign Up</button>
   
   
  </form>
</main>


</div>
    </div>
  )
}

export default Signup
