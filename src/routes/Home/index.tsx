import { useState } from 'react'

import { Footer } from '../../components/Footer'
import { Header } from '../../components/Header'
import { Layout } from '../../components/Layout'
import { PokemonCard } from '../../components/PokemonCard'

import { Pokemon } from '../../utils/types'

import classes from './style.module.css'
import bgImage from '../../assets/bg1.jpg'

interface Props {
  pokemons: Array<Pokemon>
}

export const HomePage: React.FC<Props> = ({ pokemons }) => {
  const [cards, setCards] = useState(pokemons)
 
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
    <>
      <Header title="This is title" descr="This is Description!" />
      <Layout title="Rules" urlBg={bgImage}>
        <p>
          In the game two players face off against one another, one side playing as "blue", the other as "red" on a 3x3 grid.
        </p>
        <p>Each player has five cards in a hand and the aim is to capture the opponent's cards by turning them into the player's own color of red or blue.</p>
      </Layout>
      <Layout title="Cards" urlBg={bgImage}>
        <div className={classes.flex}>
          {
            cards.map((item: Pokemon ) => (
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
      </Layout>
      <Layout title="Full Rules" colorBg="red">
        <p>
          To win, a majority of the total ten cards played (including the one card that is not placed on the board) must be of the player's card color.
        </p>
        <p>
          To do this, the player must capture cards by placing a card adjacent to an opponent's card whereupon the 'ranks' of the sides where the two cards touch will be compared.
        </p>
        <p>
          If the rank of the opponent's card is higher than the player's card, the player's card will be captured and turned into the opponent's color. 
        </p>
        <p>
          If the player's rank is higher, the opponent's card will be captured and changed into the player's color instead.  
        </p>
      </Layout>      
      <Footer />
    </>
  )
}