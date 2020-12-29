import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCWITDBqlWNHajkbzQYvTKnaoeXo4tpM7o",
  authDomain: "whatsapp-clone-840ac.firebaseapp.com",
  projectId: "whatsapp-clone-840ac",
  storageBucket: "whatsapp-clone-840ac.appspot.com",
  messagingSenderId: "217993161224",
  appId: "1:217993161224:web:6d5deab2d11939795d7fbd",
};

const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
