import firebase from "firebase";
import * as firebaseui from "firebaseui";

const firebaseConfig = {
  apiKey: "AIzaSyALPFea_x2gH19f-uK28Nxav7_2PPzsnIg",
  authDomain: "futbol-club-tachira.firebaseapp.com",
  databaseURL: "https://futbol-club-tachira.firebaseio.com",
  projectId: "futbol-club-tachira",
  storageBucket: "futbol-club-tachira.appspot.com",
  messagingSenderId: "716114341427",
  appId: "1:716114341427:web:ed6777db2074986a"
};

const uiConfig = {
  signInOptions: [
    // List of OAuth providers supported.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  signInSuccessUrl: "/"
  // Other config options...
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();
db.settings({
  //timestampsInSnapshots: true
});

export const startUi = elementId => {
  const ui = new firebaseui.auth.AuthUI(auth);
  ui.start(elementId, uiConfig);
};
