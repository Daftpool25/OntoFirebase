import React, { useState } from 'react'
import { getAuth, updateProfile, deleteUser  } from "firebase/auth";
import { Toaster, toast } from "react-hot-toast"


function User() {

    const auth = getAuth();
    const user = auth.currentUser;

    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
    const phoneNumber = user.phoneNumber;

    const [userData, setUserData] = useState({email:"",userName:"",photo:"",phone:""})
    const [state, setState] = useState({edit:false, editPassword:false, editEmail:false})


    //TODO 
    
    
    //! UPDATE USER PHONE PHOTO AND NAME
    function updateUser() {
        updateProfile(auth.currentUser, {
            displayName: userData.userName, photoURL: userData.photo, phoneNumber:userData.phone
            }).then(() => {
                toast('Profile updated', {
                    className:'sucessToast',
                    icon:"✔️"
                })
            }).catch((error) => {
                toast(error, {
                    className:'sucessToast',
                    icon:"❌"
            })
            });
    }


    //!DELETE USER
    function removeUser() {
        deleteUser(user).then(() => {
                toast('User deleted', {
                    className:'sucessToast',
                    icon:"✔️"
                })
          }).catch((error) => {
                toast(error, {
                    className:'sucessToast',
                    icon:"❌"
            })
          });
    }

        

  return (
    <div className="userContainer">
        <Toaster></Toaster>
        <img src={photoURL? photoURL:"https://icons.veryicon.com/png/o/business/multi-color-financial-and-business-icons/user-139.png"} alt="profilePhoto" />
        <h1>{displayName !== null? displayName:"User"}</h1>
        <div>
            <p>Email: {email}</p>
            <p>Phone: {phoneNumber? phoneNumber: "Add you phone number"}</p>
        </div>

        <h1>Edit your profile</h1>

        <input placeholder={displayName? displayName:"UserName"} type="text"  onChange={e => setUserData({...userData,userName:e.target.value})} value={userData.userName}/>
        <input placeholder={photoURL? photoURL:"Add the url of your profile photo"} type="text"  onChange={e => setUserData({...userData,photo:e.target.value})} value={userData.photo}/>
        <input placeholder={phoneNumber? phoneNumber:"Add your phone number"} type="number"  onChange={e => setUserData({...userData,phone:e.target.value})} value={userData.phone}/>


        <div className="btnUserContainer">
            <button onClick={() =>console.log(user)}>Get Data</button>
            <button onClick={updateUser}>Update profile</button>
            <button >Change password</button>
            <button className="" onClick={removeUser}>Delete User</button>
        </div>
    </div>
  )
}

export default User