import classes from './style.module.css'
import cn from 'classnames'

interface Props {
  isOpen: boolean
}

export const Menu:React.FC<Props> = ({isOpen}) => {
  return (
    <div className={cn(classes.menuContainer, {[classes.active]: isOpen, [classes.deactive]: !isOpen})}>
      <div className={classes.overlay} />
      <div className={classes.menuItems}>
        <ul>
          <li>
            <a href="#welcome">
              HOME
            </a>
          </li>
          <li>
            <a href="#game">
              GAME
            </a>
          </li>
          <li>
            <a href="#about">
              ABOUT
            </a>
          </li>
          <li>
            <a href="#contact">
              CONTACT
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
