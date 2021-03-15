import classes from './style.module.css'
import cn from 'classnames'

interface Props {
  toggleOpen: (isOpen: boolean) => void
  isOpen: boolean
}

export const Navbar:React.FC<Props> = ({toggleOpen, isOpen}) => {
  const handleClick = () => {
    toggleOpen && toggleOpen(isOpen)
  }

  return (
    <nav className={classes.root}>
      <div className={classes.navWrapper}>
        <p className={classes.brand}>
          LOGO
        </p>
        <a 
          href="/#" 
          className={cn(classes.menuButton, {[classes.active]: isOpen})} 
          onClick={handleClick}
        >
          <span />
        </a>
      </div>
    </nav>
  )
}
