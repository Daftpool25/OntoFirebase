import React, { useRef,useState } from 'react'
import { useLocation,  useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Toaster, toast } from "react-hot-toast"



function Register() { 

 
  //! Hooks
    const emailValue=useRef("");
    const passwordValue=useRef("");

    const location=useLocation()
    const history= useNavigate();

    const [errors,setErrors]=useState({code:"", message:""})
    const [passwords,setPasswords]=useState({password1:"",password2:""});

    const errorContainer = document.getElementById("errorContainer");




  //!Create USER Email && password
  function registerUserPassword() {

    const email=emailValue.current.value;
    const password=passwordValue.current.value;
    const auth = getAuth();

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;

          goTo("/");
          toast('Wellcome new user!', {
            className:'sucessToast',
            icon:"✔️"
          });
          
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          if(email==="" && password===""){
            setErrors({...errors, code: "Error: ", message: "Email and Passwords fields are empty"})

          }else if(email==="" ){
            setErrors({...errors,code:"Error: ",message:"Email field is empty"})

          } else if (passwordValue.current.value ===""){
            setErrors({...errors,code:"Error: ",message:"Password field is empty"})

          } else{
          setErrors({...errors,code:errorCode,message:errorMessage});

          }
          errorContainer.style.visibility = "visible";

        });
  }



  //!Redirection to home
   function goTo(path) {
    history(path);
    console.log("We are on: "+location.pathname)
  }
  

  function errorSwitcher() {
    errorContainer.style.visibility = "hidden";
  }







  return (
    <div className="login">
       <Toaster></Toaster>

       <h1>Register</h1>

       <div className='inputsContainerLogin'>
          <input ref={emailValue}type="email" placeholder='yourEmail@email.com' id="emailRegisterInput" name='email'/>
          <input ref={passwordValue} onChange={e => setPasswords({...passwords,password1:e.target.value})} type="text"  placeholder='Password' id="passwordRegisterInput" name='password'/>
          <input onChange={e => setPasswords({...passwords,password2:e.target.value})} type="text"  placeholder='Repeat password' id="repeatRegisterInput" name='repeatPassword'/>
          {passwords.password1!==passwords.password2 &&<p>Passwords aren´t same</p>}

       </div>

      <div className="btnContainerLogin">
        {passwords.password1!==passwords.password2?  <button className='registerBtn' disabled>Register</button>:<button className='registerBtn' onClick={registerUserPassword} >Register</button>}  
      </div>
      <p onClick={() => goTo("/login")}>I already have a profile... </p>
      {errors.code && <div className='errorContainer' id="errorContainer"><span onClick={errorSwitcher} className='error able'>{errors.message}</span></div>}

    </div>
  )
}

export default Register