import firebase from "firebase/app"; // Import firebase/app to avoid importing the entire Firebase SDK unnecessarily
import "firebase/firestore"; // Import only the specific Firebase services you need
import "firebase/storage";
import "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyC5_wK8DXACogHm26xIvQU6yBZ9dKtZnfk",
//   authDomain: "drive-yt-38425.firebaseapp.com",
//   projectId: "drive-yt-38425",
//   storageBucket: "drive-yt-38425.appspot.com",
//   messagingSenderId: "322809747915",
//   appId: "1:322809747915:web:84c6d3794f08a6af18be4e",
// };

const firebaseConfig = {
  apiKey: "AIzaSyAX2jb-V54WBusTbW8yHBPTX5NIcKn921k",
  authDomain: "drive-clone-1c274.firebaseapp.com",
  projectId: "drive-clone-1c274",
  storageBucket: "drive-clone-1c274.appspot.com",
  messagingSenderId: "632034759946",
  appId: "1:632034759946:web:177b6f4c474977388e16f3",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const storage = firebaseApp.storage(); // Corrected firebaseApp.storage()
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, storage, auth, provider };
