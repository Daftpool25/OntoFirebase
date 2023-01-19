import React, { useEffect, useState } from 'react';
import { addDataBase,readDatabase,editDataBase,deleteDataBase, uploadPhoto, downloadPhoto } from '../../Controllers/firebase/postController';
import Card from '../Pure/Card';
import {Toaster,toast} from "react-hot-toast";


function Main({userData}) {


  //!CONST
  //newposts
  const today=new Date();
  const [post, setPost]=useState({Tittle:"",Description:"",Img:"", Date: today.toLocaleDateString('en-US'),User:userData.email})
  const [imgReference, setImgReference]=useState("")
  const inputImg=document.getElementById("imgInput")

  //Posts and edition mode
  const [posts, setPosts] = useState([]);
  const [mode, setMode] = useState("Add Character");

  //Error manager
  const [errors, setErrors] = useState("");
  const errorAdvice= document.getElementById("errorContainer2");


  //!CREATE
   function createPost() {
      if(post.Tittle.length>0 && post.Description.length>0 && imgReference!==""){
        
        let imgPath=`/${post.Tittle}-${post.User}`

        uploadPhoto(imgPath,imgReference).then(
          item =>{
            downloadPhoto(item).
                then( url => {
                     setPost({...post,Img:url});
          }
        )   
      })

      }else{
        setErrors("Please complete the fields!");
        errorAdvice.style.visibility="visible";
      }
  }

  useEffect(() => {
      if(post.Img!=="" && mode !== "Edit"){
        addDataBase(post);
        readPosts()
        setPost({Tittle:"",Description:"",Img:"", Date: today.toLocaleDateString('en-US'),User:"Usuario"});
        setImgReference("");
        imgInput.value=""
      }
  }, [post.Img])
  

  //!READ
  function readPosts() {
    readDatabase()
      .then(t => setPosts([...t]))
      .catch(e => 

          toast(e, {
          className:'sucessToast'
          })
        )
  }


  //!EDIT
  function getPostInfo(postID) {
    const postInfo= posts.find( (t) => t.id === postID);
    setPost(postInfo);
    setMode("Edit")
  }

  async function updatePost() {
    await editDataBase(post.id,post);
    readPosts();
    setMode("Add Character")
    setPost({Tittle:"",Description:"",Img:"", Date: today.toLocaleDateString('en-US'),User:""});
  }

  //!DELETE
  async function deletePost(id) {
    await deleteDataBase(id);
    await readPosts();
  }


  //!USEEFFECT
  useEffect(() => {
    readPosts()
  }, [])
  


  function errorSwitcher() {
    errorAdvice.style.visibility = "hidden";
  }


  return (
    <div className='dataContainer'>
        <Toaster></Toaster>

        <div className='addDataContainer'>
              <input maxLength="10" value={post.Tittle} onChange={e => setPost({...post,Tittle:e.target.value})} type="text" placeholder='Tittle'/>
              {post.Tittle.length===10 && <p>You can´t write more!</p>}

              <input maxLength="15" value={post.Description} onChange={e => setPost({...post,Description:e.target.value})} type="text" placeholder='Description'/>      
              {post.Description.length===15 && <p>You can´t write more!</p>}

              {mode==="Edit"? <span/>: <input  onChange={e => setImgReference(e.target.files[0])} type="file" placeholder='Upload Imagen' id="imgInput"/>}
              
              <button onClick={mode==="Add Character"? createPost:updatePost} className="addDataButton">{mode}</button>
              {errors && <div className='errorContainer' id="errorContainer2"><span onClick={errorSwitcher} className='error able'>{errors}.  X</span></div>}
        </div>
        <div className="cardsContainer">
             {posts.map(item => 
              
              
                <Card onClose={() => deletePost(item.id)} onEdit={() => getPostInfo(item.id)} id={item.id} tittle={item.Tittle} srce={item.Img} desc={item.Description} date={item.Date} ></Card>
            
              
              )}
        </div>
    </div>
  )
}

export default Main
