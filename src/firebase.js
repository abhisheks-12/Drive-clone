import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDzGl-I-0VrC_ywg7IgaLLqU_VstrqQCj0",
  authDomain: "drive-clone-d2363.firebaseapp.com",
  projectId: "drive-clone-d2363",
  storageBucket: "drive-clone-d2363.appspot.com",
  messagingSenderId: "162369131710",
  appId: "1:162369131710:web:a307dbefb9d02ddf783aef",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, storage, auth, provider };
