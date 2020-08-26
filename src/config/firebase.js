import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAlCZfq6cpkAcaljfkQk-oIMtQkjLfa9e0",
    authDomain: "whats-app-4add4.firebaseapp.com",
    databaseURL: "https://whats-app-4add4.firebaseio.com",
    projectId: "whats-app-4add4",
    storageBucket: "whats-app-4add4.appspot.com",
    messagingSenderId: "182714807535",
    appId: "1:182714807535:web:ea94dd16573e4750a4571a",
    measurementId: "G-R1TW0HCH96"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebaseApp.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }
export default db;

