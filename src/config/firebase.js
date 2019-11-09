import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyB-Sm14kIsU56yaNScWLG575bZ30h6-sFU",
    authDomain: "ldsnortimoveis.firebaseapp.com",
    databaseURL: "https://ldsnortimoveis.firebaseio.com",
    projectId: "ldsnortimoveis",
    storageBucket: "ldsnortimoveis.appspot.com",
    messagingSenderId: "42685063178",
    appId: "1:42685063178:web:0a2587d9c2643e1b09fff3",
    measurementId: "G-X98VMK7CKP"
  };

  export default firebase.initializeApp(firebaseConfig);