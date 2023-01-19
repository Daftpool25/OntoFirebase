import React, { useEffect, useState } from 'react';
import { addDataBase,readDatabase,editDataBase,deleteDataBase } from '../../firebase/postController';
import Card from '../Pure/Card';
import {Toaster,toast} from "react-hot-toast";


function Main() {

  //TODO revisar el acceso y la seguridad de la base de datos
  //TODO Agregar transicion en desplazamientos y cambios de color 
  //TODO el crud debemos hacerlo a través de un backend, no desde el frontend
  //TODO los archivos en carpeta Firebase son controllers
  // TODO ACTUALIZAR SOBRE LA TARJETA DIRECTAMENTE Y SIN NECESIDAD DE ACTUALIZAR TODA LA CARD (ver doc)
  //TODO Boton para salir del modo edit 

  //!CONST
  const today=new Date();
  const [post, setPost]=useState({Tittle:"",Description:"",Img:"", Date: today.toLocaleDateString('en-US'),User:""})
  const [posts, setPosts] = useState([]);
  const [mode, setMode] = useState("Add Character");
  const [errors, setErrors] = useState("");
  const errorAdvice= document.getElementById("errorContainer2");


  //!CREATE
  async function createPost() {
      if(post.Tittle.length>0 && post.Description.length>0 && post.Img.length>0){
        await addDataBase(post);
        setMode("Add Character");
        setPost({Tittle:"",Description:"",Img:"", Date: today.toLocaleDateString('en-US'),User:""});
        readPosts();
      }else{
        setErrors("Please complete the fields!");
        errorAdvice.style.visibility="visible";
      }

  }

  //!READ
  function readPosts() {
    readDatabase()
      .then(t => setPosts([...t]))
      .catch(e => 

          toast(e, {
          className:'sucessToast',
          icon:"❌"
          })
        )
      //Ejecuto la funcion, si se da exitosamente, con el then obtengo lo que retorna
  }


  //!EDIT
  function getPostInfo(postID) {
    const postInfo= posts.find( (t) => t.id === postID);
    setPost(postInfo);
    setMode("Edit")
    console.log(postInfo);
  }

  async function updatePost() {
    await editDataBase(post.id,post);
    readPosts();
    setMode("Add Character")
    setPost({Tittle:"",Description:"",Img:"", Date: today.toLocaleDateString('en-US'),User:""});
  }

  //!DELETE
  function deletePost(id) {
    deleteDataBase(id);
    readPosts();
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
              <input value={post.Img} onChange={e => setPost({...post,Img:e.target.value})} type="text" placeholder='Imagen'/>
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
