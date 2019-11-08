import { auth, db } from "./setup";

export function watchUserChanges(callBack) {
  const unsub = auth.onAuthStateChanged(user => {
    if (user && !user.isAnonymous) {
      console.log("Logeado");
      callBack({
        id: user.uid,
        email: user.email,
        name: user.displayName
      });
    } else {
      console.log("No Logeado");
      callBack(null);
    }
  });
  return unsub;
}

export function watchJugador(callBack) {
  const unsub = db.collection("jugador").onSnapshot(snapshot => {
    const docs = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      docs.push({
        ...data,
        id: doc.id
      });
    });
    callBack(docs);
  });
  return unsub;
}


export function watchEquipo(callBack) {
  const unsub = db.collection("equipo").onSnapshot(snapshot => {
    const docs = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      docs.push({
        ...data,
        id: doc.id
      });
    });
    callBack(docs);
  });
  return unsub;
}
