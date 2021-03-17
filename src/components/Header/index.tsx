import classes from './style.module.css'

interface Props {
  title: string
  descr: string
  onStartGame?: (page:string) => void
}

export const Header: React.FC<Props> = ({title, descr, onStartGame}) => {
  const handleClick = () => {
    onStartGame && onStartGame('game')
  }
  return (
    <header className={classes.root}>
      <div className={classes.forest}></div>
      <div className={classes.container}>
        <h1>{title}</h1>
        <p>{descr}</p>
        <button onClick={handleClick} className={classes.btn}>
          Start Game
        </button>
      </div>
      
  </header>
  )
}
