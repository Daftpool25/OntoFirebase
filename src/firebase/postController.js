import { collection, addDoc, getDocs, setDoc,deleteDoc,doc } from "firebase/firestore"; 
import { db } from './index';
import {toast} from "react-hot-toast";


//TODO Agregar imagenes al CREATE, agregar el username
//TODO agregar un popup si falla y si culmina con éxito
//TODO Agregar el edit y eliminar
//TODO Darle una temática, hacer un crud rapido con bootstrap sin user
//Hacerlo mediante un backend

//? "backend" del Create
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

//? "backend" del Read
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


//? "backend" del Edit
export async function editDataBase(id,data){
  await setDoc(doc(db, "publications", id),data );
  toast('Success', {
    className:'sucessToast',
    icon:"✔️"
  })
}


//? "backend" del Delete
export async function deleteDataBase(id){
  console.log(id);
  await deleteDoc(doc(db, "publications", id));
  toast('Success', {
    className:'sucessToast',
    icon:"✔️"
  })
}








//diferencias entre setDoc adDoc y doc, son equivalentes en resultado,
//agregar data, setdoc necesita especificar un id del doc a crear
//addDoc crea el mismo, para editar un campo espcifico uso updateDoc()
