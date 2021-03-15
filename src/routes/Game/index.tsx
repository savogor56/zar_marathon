import classes from './style.module.css'
import React from 'react'

interface Props {
  onChangePage: (page: string) => void
}

export const GamePage:React.FC<Props> = ({onChangePage}) => {
  const handleClick = () => {
    onChangePage('app')
  }
  return (
    <>
      <button onClick={handleClick} className={classes.btn}>
        End Game
      </button>
    </>
  )
}
