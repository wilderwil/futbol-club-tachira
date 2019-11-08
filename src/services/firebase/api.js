import { db } from './setup';
import firebase from "firebase"
/*
export async function createJugador(data) {
    const file=data.file;
    console.log("la data:", data);
    console.log("el file:",file);
    const urlFile = await handleUpLoad(data.file);
    console.log("La url de la foto: ",urlFile);
    const jugador = {

        nombre: `${data.nombre}`,
        apellido: `${data.apellido}`,
        año: `${data.año}`,
        posicion: `${data.posicion}`,
        photo: `${urlFile}`

    }
    console.log("jugador", jugador)
    return await db
        .collection('jugador')
        .doc()
        .set(jugador);
}*/
export async function  createJugador(data){
  console.log ("el jufgador a crear",data)
  
    const jugador = await upLoadTaskPromise(data);
    //console.log("jugador",jugador);
        return await db
        .collection('jugador')
        .doc()
        .set(jugador);

}

async function upLoadTaskPromise(data) {
  console.log("la data en uploadTaskPromise",data);
  const jugador = {

    nombre: `${data.nombre}`,
    apellido: `${data.apellido}`,
    año: `${data.año}`,
    posicion: `${data.posicion}`,
    photo: ``

};
const uuidv1 = require('uuid/v1');
var f = new Date();
var imageName=f.getDate() + "_" + (f.getMonth() +1) + "_" + f.getFullYear();
imageName=imageName+uuidv1();
    if (data.file){
   
    const url= await new Promise(function(resolve, reject) {
      const storageRef = firebase.storage().ref();
      const photoRef=storageRef.child(`fotos/${imageName}`);
      const task = photoRef.put(data.file);
      task.on('state_changed',
      function(snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is ' + progress + '% done')
      },
      function error(err) {
        console.log('error', err)
        reject()
      },
      function complete() {
        task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          resolve(downloadURL)
        })
      }
    )
  });
   jugador.photo=url;
}else{
jugador.photo=data.photo;
} 
   return jugador;
  }


export async function upLoadFile(data){
    const storageRef = firebase.storage().ref();
    const photoRef=storageRef.child('fotos/');
    const task = photoRef.put(data.file);
    const url=task.on("state_changed",  (snapshot) => {
        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log(percentage)
    }, error => { 
        console.log(error.message);
         },
        () => {
                task.snapshot.ref.getDownloadURL().then( function (downloadURL) {
                console.log('File available at', downloadURL);
                return downloadURL;   
            });
        });
        return url;

}

export async function deleteJugador(id) {
    return await db
        .collection('jugador')
        .doc(id)
        .delete();
}

export async function updateJugador(id, data) {
  console.log ("el jufgador a actualizar",data)
  const jugador = await upLoadTaskPromise(data);
    
    return await db
        .collection('jugador')
        .doc(id)
        .update(jugador);
}

export async  function handleUpLoad(file) {
    console.log("entro")
    const storageRef = firebase.storage().ref();
    const photoRef=storageRef.child('fotos/');
    console.log(photoRef);
    const url = ""
    const task = photoRef.put(file);
    return task.on("state_changed",  (snapshot) => {
        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log(percentage)
    }, error => { 
        console.log(error.message);
         return false },
        async () => {
             await task.snapshot.ref.getDownloadURL().then( function (downloadURL) {
                console.log('File available at', downloadURL);
                return downloadURL;
                
            });
        });
       // const urlFile=  task.snapshot.ref.getDownloadURL()
     //   console.log(urlFile)
   // return urlFile;


}