import classes from './style.module.css'
import cn from 'classnames'
import { Link } from 'react-router-dom'

interface Props {
  isOpen: boolean | null
  toggleOpen: () => void
}

const MENU = [
  {
    title: 'HOME',
    to: '/'
  },
  {
    title: 'GAME',
    to: '/game'
  },
  {
    title: 'ABOUT',
    to: '/about'
  },
  {
    title: 'CONTACT',
    to: '/contact'
  },
]

export const Menu:React.FC<Props> = ({isOpen, toggleOpen}) => {
  return (
    <div className={cn(classes.menuContainer, 
    {[classes.active]: isOpen === true, 
    [classes.deactive]: isOpen === false})}>
      <div className={classes.overlay} />
      <div className={classes.menuItems}>
        <ul>
          {
            MENU.map(item => (
              <li key={item.title} onClick={toggleOpen}>
                <Link to={item.to}>
                  {item.title}
                </Link>
              </li>
            ))
          }          
        </ul>
      </div>
    </div>
  )
}
