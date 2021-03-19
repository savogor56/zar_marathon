import React, {useEffect, useState} from 'react'
import { useHistory } from 'react-router'
import { Pokemon } from '../../utils/types'
import { PokemonCard } from '../../components/PokemonCard'

import database from '../../services/firebase'
import classes from './style.module.css'

interface Props {
  pokemons: Array<Pokemon>
}

const NEW_POKEMON = {
    "abilities": [
        "keen-eye",
        "tangled-feet",
        "big-pecks"
    ],
    "stats": {
        "hp": 63,
        "attack": 60,
        "defense": 55,
        "special-attack": 50,
        "special-defense": 50,
        "speed": 71
    },
    "type": "flying",
    "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/17.png",
    "name": "pidgeotto",
    "base_experience": 122,
    "height": 11,
    "id": 17,
    "values": {
        "top": "A",
        "right": 2,
        "bottom": 7,
        "left": 5
    }
}

const getPokemons = (setCards: React.Dispatch<React.SetStateAction<[string, Pokemon][] | null>>) => {
    database.ref('pokemons').once('value', (snapshot) => {
        setCards(Object.entries(snapshot.val()))
    })
}

export const GamePage:React.FC<Props> = ({pokemons}) => {
  const [cards, setCards] = useState<[string, Pokemon][] | null>(null)
  const [changedPok, setChangedPok] = useState<[string, Pokemon] | null>(null)
  const [newPokemon, setNewPokemon] = useState<Pokemon | null>(null)
  const history = useHistory()
  
  const handleClick = () => {
    history.push('/')
  }

  useEffect(() => {
      getPokemons(setCards)
  }, [])

  useEffect(() => {
      if (changedPok) {
          const [key, item] = changedPok
          database.ref(`pokemons/${key}`).set(item)
      }
      return () => {
          setChangedPok(null)
      }
  }, [changedPok])

   useEffect(() => {
       if (newPokemon) {
           const newKey = database.ref().child('pokemons').push().key
           database.ref('pokemons/' + newKey).set(newPokemon)
           getPokemons(setCards)
       }
       return () => {
           setNewPokemon(null)
       }
   }, [newPokemon])

  const handleActive = (id: number, isActive: boolean) => {
    setCards((prevState: [string, Pokemon][] | null ) => {
        if (prevState) {
            return ( [...prevState.map(item => {
                    const [key, pokemon] = item
                    if (pokemon.id === id) {
                        const newPokemon = {
                            ...pokemon,
                            isActive: !isActive
                        }
                        const newItem: [string, Pokemon] = [key, newPokemon]
                        setChangedPok(newItem)
                        return newItem
                    }
                    return item
                })]
            )
        }
        return prevState
    })
  }

  const handleAddPokemon = () => {
    setNewPokemon({
        ...NEW_POKEMON,
        id: Math.floor(Math.random() * 1000)
    })
  }

  return (
    <div>
        <button className={classes.btn} onClick={handleAddPokemon}>
            Add New Pokemon
        </button>
      <div className={classes.flex}>
        {
          cards && cards.map(([key,item]) => (
            <PokemonCard
                key={key}
                name={item.name}
                img={item.img}
                id={item.id}
                type={item.type}
                values={item.values}
                isActive={item.isActive === true}
                changeActive={handleActive}
              />
          ))
        }
      </div>
      <button className={classes.btn} onClick={handleClick}>
        End Game
      </button>
    </div>
  )
}
