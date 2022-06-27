import firebase from "firebase/compat";

const firebaseConfig = {
    apiKey: "AIzaSyAtns3woxlMUdKlC045qMo3IQQOm6QsFVM",
    authDomain: "signal-clone-baf38.firebaseapp.com",
    projectId: "signal-clone-baf38",
    storageBucket: "signal-clone-baf38.appspot.com",
    messagingSenderId: "197291359888",
    appId: "1:197291359888:web:282c7733faaa3b0432e215"
  };

  let app;

  if(firebase.apps.length === 0){
    app =  firebase.initializeApp(firebaseConfig)
  } else {
    app = firebase.app
  }

  const db = firebase.firestore()
  const auth = firebase.auth()

  export {db, auth}