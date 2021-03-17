import classes from './style.module.css'
import React from 'react'
import { MenuHeader } from '../../components/MenuHeader'

interface Props {
  onChangePage: (page: string) => void
}

export const GamePage:React.FC<Props> = ({onChangePage}) => {
  const handleClick = () => {
    onChangePage('app')
  }
  return (
    <div>
      <MenuHeader bgActive={true} />
      <button onClick={handleClick} className={classes.btn}>
        End Game
      </button>
    </div>
  )
}
