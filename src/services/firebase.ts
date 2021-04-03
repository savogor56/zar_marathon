import firebase from "firebase/app"
import 'firebase/database'
import {Pokemon} from "../utils/types";

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

class Firebase {
    fire: typeof firebase
    database: firebase.database.Database

    constructor() {
        this.fire = firebase
        this.database = firebase.database()
    }

    getPokemonsSocket = (cb: (pokemons: [string, Pokemon][]) => void) => {
        this.database.ref('pokemons').on('value', snapshot => {
            const data: [string, Pokemon][] = Object.entries(snapshot.val())
            cb(data)
        })
    }

    offPokemonsSocket = () => {
        this.database.ref('pokemons').off()
    }

    getPokemonsOnce = async () => {
        return await this.database.ref('pokemons').once('value').then(snapshot => {
            const data: [string, Pokemon][] = Object.entries(snapshot.val())
            return data
        })
    }

    postPokemon = (key: string, pokemon: Pokemon) => {
       return this.database.ref(`pokemons/${key}`).set(pokemon)
    }

    addPokemon = (data: Pokemon) => {
        const newKey = this.database.ref().child('pokemons').push().key
        this.database.ref(`pokemons/${newKey}`).set(data)
    }
}

export default new Firebase()