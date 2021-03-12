import classes from './style.module.css'

interface Props {
  title: string
  descr: string
}

export const Header: React.FC<Props> = ({title, descr}) => {
  return (
    <header className={classes.root}>
      <div className={classes.forest}></div>
      <div className={classes.container}>
          <h1>{title}</h1>
          <p>{descr}</p>
      </div>
  </header>
  )
}
