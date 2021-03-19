import classes from './style.module.css'
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { Pokemon } from '../../utils/types'
import { PokemonCard } from '../../components/PokemonCard'

interface Props {
  pokemons: Array<Pokemon>
}

export const GamePage:React.FC<Props> = ({pokemons}) => {
  const [cards, setCards] = useState(pokemons)
  const history = useHistory()
  
  const handleClick = () => {
    history.push('/')
  }

  const handleActive = (id: number, isActive: boolean) => {
      setCards((prevState: Pokemon[]) => (
        [...prevState.map(item => {
          if (item.id === id) {
            return {
              ...item,
              isActive: !isActive
            }            
          }
          return item
        })
        ]
      ))      
  }

  return (
    <div>      
      <div className={classes.flex}>
        {
          cards.map(item => (
            <PokemonCard
                key={item.id} 
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
