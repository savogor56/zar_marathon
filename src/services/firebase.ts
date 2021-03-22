import firebase from "firebase/app"
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyAYpaEzGNbFmxh8zKsZ31eUDKKOKUcMwvQ",
    authDomain: "pokemon-game-93771.firebaseapp.com",
    databaseURL: "https://pokemon-game-93771-default-rtdb.firebaseio.com",
    projectId: "pokemon-game-93771",
    storageBucket: "pokemon-game-93771.appspot.com",
    messagingSenderId: "552506063362",
    appId: "1:552506063362:web:9ba191bcf0fdc5627e851b"
}

firebase.initializeApp(firebaseConfig)
export const fire = firebase
export const database = firebase.database()

export default database