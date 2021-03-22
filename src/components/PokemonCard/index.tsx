import classes from './style.module.css'
import { PokemonValues } from './../../utils/types'
import cardBackSide from './assets/card-back-side.jpg'
import cn from 'classnames'

interface Props {
  id: number
  values: PokemonValues
  type: string
  img: string
  name: string
  isActive: boolean
  changeActive: (id: number, isActive: boolean) => void
}

export const PokemonCard: React.FC<Props> = ({name, img, id, type, values, isActive, changeActive }) => {
  
  const handleClick = () => {
    changeActive(id, isActive)
  }

  return (
    <div className={classes.root} onClick={handleClick}>
      <div className={cn(classes.pokemonCard, {[classes.active]: isActive })}>
        <div className={classes.cardFront}>
            <div className={cn(classes.wrap, classes.front)}>
                <div className={cn(classes.pokemon, classes[type])}>
                    <div className={classes.values}>
                        <div className={cn(classes.count, classes.top)}>
                          {values.top}
                        </div>
                        <div className={cn(classes.count, classes.right)}>
                          {values.right}
                        </div>
                        <div className={cn(classes.count, classes.bottom)}>
                          {values.bottom}
                        </div>
                        <div className={cn(classes.count, classes.left)}>
                          {values.left}
                        </div>
                    </div>
                    <div className={classes.imgContainer}>
                        <img src={img} alt={name} />
                    </div>
                    <div className={classes.info}>
                        <span className={classes.number}>#{id}</span>
                        <h3 className={classes.name}>{name}</h3>
                        <small className={classes.type}>
                          Type: <span>{type}</span>
                        </small>
                    </div>
                </div>
            </div>
        </div>

        <div className={classes.cardBack}>
            <div className={cn(classes.wrap, classes.back)}>
                <img src={cardBackSide} alt="Сard Backed" />
            </div>
        </div>
    </div>
</div>
  )
}
