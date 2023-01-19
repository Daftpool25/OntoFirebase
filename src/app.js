import React, { useEffect, useState } from 'react';
import {Link, Route, Routes, BrowserRouter, Navigate} from "react-router-dom";
import { getAuth, onAuthStateChanged,signOut  } from "firebase/auth";
import "./Styles/styles.scss";
import { app, messaging } from './firebase';
import Main from './components/Containers/Main';
import Login from './components/Pages/Login';
import Register from './components/Pages/Register';
//?TOAST
import { onMessage } from "firebase/messaging";
import {Toaster,toast} from "react-hot-toast";
import User from './components/Pages/User';

 
function App() {

  //!CONSTs
  const auth = getAuth();
  const [state, setState] = useState(false);


  //!USEEFFECT to get the LOGGED USER 
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setState(true);
        // ...
      } else {
        setState(false);
      }
  })
  }, [])



  //!LOGOUT FUNCTION
  function logOut() {
      signOut(auth).then(() => {
        // Sign-out successful.
        console.log("Sign-out successful");

      }).catch((error) => {
          console.log(error);
      });
  }


    //!TOAST NOTIFICATION (Es el lisstener al evento recibir notificacion)
  onMessage(messaging,payload => {
    console.log(payload);
    toast.success(payload.notification.body)
  })

  //!TOAST you are already logged
  function alreadyLogged(){
    toast('You are already logged', {
      className:'sucessToast',
      icon:"❌"});
    return  <Navigate replace to="/"/>
  }


  return (
    <BrowserRouter>
        <aside className='Header'>
            <Link to="/" className='title'>Wonto</Link>
            {!state && <Link to="/login">{<button>Login</button>}</Link>}
            {state && <button onClick={logOut}>Logout</button>}
            
        </aside>
          <Toaster></Toaster>
        <main>
            <Routes>

                <Route exact path='/' element={

                    state? 
                    <Main/>: <Navigate replace to="/login"/>

                }></Route>
                <Route path='/login' element={
                    state? 
                    alreadyLogged():<Login/>}
                />
                <Route path='/register' element={
                    state?
                    alreadyLogged():<Register/>}
                />
                <Route path="/user" element={
                  state?
                  <User/>:<Login/>
                }></Route>

            </Routes>
        </main>
    </BrowserRouter>
  )
}

export default App