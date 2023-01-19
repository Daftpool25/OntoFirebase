import React, { useRef, useState } from 'react';
import { getAuth, signInWithPopup, signInWithEmailAndPassword, GoogleAuthProvider } from "firebase/auth";
import { Toaster, toast } from "react-hot-toast"
import { useLocation,  useNavigate } from 'react-router-dom';


function Login() {

  //!Hooks
  const location=useLocation()
  const history= useNavigate();

  const emailValue=useRef("");
  const passwordValue=useRef("");

  const [errors,setErrors]=useState({code:"",message:""});
  const errorContainer = document.getElementById("errorContainer");


  //!LOGIN function
  function loging() {
      const auth = getAuth();
      const email=emailValue.current.value;
      const password=passwordValue.current.value;

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;


          //TOAST and navigate to dashboard
          goTo("/");
          toast('Wellcome back!', {
            className:'sucessToast',
            icon:"✔️"
          });


          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;


          if (emailValue.current.value==="" && passwordValue.current.value ===""){
            setErrors({...errors,code:"Error: ",message:"Email and Password fields are empty"})

          }else if(emailValue.current.value==="" ){
            setErrors({...errors,code:"Error: ",message:"Email field is empty"})

          } else if (passwordValue.current.value ===""){
            setErrors({...errors,code:"Error: ",message:"Password field is empty"})

          } else{
          setErrors({...errors,code:errorCode,message:errorMessage});
          }
          errorContainer.style.visibility = "visible";

        });
  }

  //!GOOGLE login
  function googleLogin() {
    const provider = new GoogleAuthProvider();

    const auth = getAuth();
    signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;

          //TOAST and navigate to dashboard
          goTo("/");
          toast('Wellcome!', {
            className:'sucessToast',
          });

        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
          setErrors({...errors,code:errorCode,message:errorMessage});
          const errorContainer = document.getElementById("errorContainer");
          errorContainer.style.visibility = "visible";
   });
    
  }


  //! Password visbility javascript
  function passwordVisibility() {
    const passWordInput= document.getElementById("passwordLoginInput");
    const eyeBtn=document.getElementById("eyeBtn");

    if(passWordInput.classList.contains("hide")){
      passWordInput.classList.remove("hide");
      passWordInput.type="text";
      eyeBtn.innerText="visibility_off";
    }else{
      passWordInput.classList.add("hide");
      passWordInput.type="password";
      eyeBtn.innerText="visibility";

    }
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
       <h1>Login</h1> 
       <div className='inputsContainerLogin'>
          <input ref={emailValue} type="email" placeholder='yourEmail@email.com' id="emailLoginInput"/>
          <div className='passwordContainerLogin'>
              <input ref={passwordValue} type="password" className="hide" placeholder='password' id="passwordLoginInput"/>
              <span id="eyeBtn" class="material-symbols-rounded" onClick={passwordVisibility}>visibility</span>
          </div>
       </div>
      <div className="btnContainerLogin">
         <button className='loginBtn' onClick={loging}>Login</button>
         <button className='googleBtn' onClick={googleLogin}> 
              <img src='https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png'
               width="30px"></img>
              <p>Login with Google</p>
         </button>
      </div>
      <p className="register" onClick={() => goTo("/register")}>I don´t have a account, REGISTER . . . </p>
      {errors.code && <div className='errorContainer' id="errorContainer"><span onClick={errorSwitcher} className='error able'>{errors.message}.  X</span></div>}
    </div>
  )
}

export default Login