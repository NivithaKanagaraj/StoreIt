import firebase from "firebase";
import "firebase/storage";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyA4XdmI5_-vu8kVKFNwLRsx56d41xGJmw0",
    authDomain: "file-share-f85fc.firebaseapp.com",
    projectId: "file-share-f85fc",
    storageBucket: "file-share-f85fc.appspot.com",
    messagingSenderId: "667125898821",
    appId: "1:667125898821:web:cace26efd9cbcc4e174d2c"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();
export { auth, provider, storage };
export default db;