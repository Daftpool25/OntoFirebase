import { collection, addDoc, getDocs, setDoc,deleteDoc,doc } from "firebase/firestore"; 
import { db,storage } from './index';
import { ref,uploadBytes,getDownloadURL } from "firebase/storage";

import {toast} from "react-hot-toast";


//TODO ADD USER PROFILE AND BACKEND

//! CREATE CONTROLLER
export async function addDataBase(post){
    try {
        const docRef = await addDoc(collection(db, "publications"), post);

    toast('Card created!', {
      className:'sucessToast',
      icon:"✔️"
    })
    } catch (e) {
        errorSuccess="Error adding document: "+ e;
        console.error(errorSuccess);

        toast(errorSuccess, {
         className:'sucessToast',
         icon:"❌"
    })
      }
}

//! READ CONTROLLER
export async function readDatabase() {
  const  querySnapshot = await getDocs(collection(db, "publications"));
    console.log("It´s QuerySnapShot: "+querySnapshot);
    console.log("It´s QuerySnapShot.docs: "+querySnapshot.docs);

  const posts=querySnapshot.docs.map(doc => {
    return {...doc.data(),id:doc.id}
    //retorna un objeto toda data existente mas un componente id: con valor id
  })
    return posts;
}


//! EDIT CONTROLLER
export async function editDataBase(id,data){
  await setDoc(doc(db, "publications", id),data );
  toast('Card modified', {
    className:'sucessToast',
    icon:"✔️"
  })
}


//! DELETE CONTROLLER
export async function deleteDataBase(id){
  console.log(id);
  await deleteDoc(doc(db, "publications", id));
  toast('Success', {
    className:'sucessToast',
    icon:"✔️"
  })
}



//! UPLOAD AND GET IMAGES FROM STORAGE

export async function uploadPhoto(path,file){
  const storageRef = ref(storage, path);

  
  return uploadBytes(storageRef, file).then((snapshot) => {
    console.log('Uploaded a blob or file!');
    return path;
  })
}

export  async function downloadPhoto(path){
    const storageRef = ref(storage, path);

    return getDownloadURL(storageRef)
    .then((url) => {
      console.log("url obtenido")
      console.log(url)

      return url;

    })
    .catch((error) => {

      switch (error.code) {
      case 'storage/object-not-found':
          toast.error('Storage error: objeto no encontrado')
          break;
      case 'storage/unauthorized':
          toast.error('Storage error: No autorizado')
          break;
      case 'storage/canceled':
          toast.error('Storage error: Subida cancelada')
          break;
      case 'storage/unknown':
          toast.error("Error desconocido")
          break;
  }
})
  
}





