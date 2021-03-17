import classes from './style.module.css'
import cn from 'classnames'

interface Props {
  isOpen: boolean | null
}

const MENU = [
  {
    title: 'HOME',
    path: '#welcome'
  },
  {
    title: 'GAME',
    path: '#game'
  },
  {
    title: 'ABOUT',
    path: '#about'
  },
  {
    title: 'CONTACT',
    path: '#contact'
  },
]

export const Menu:React.FC<Props> = ({isOpen}) => {
  return (
    <div className={cn(classes.menuContainer, 
    {[classes.active]: isOpen === true, 
    [classes.deactive]: isOpen === false})}>
      <div className={classes.overlay} />
      <div className={classes.menuItems}>
        <ul>
          {
            MENU.map(item => (
              <li>
                <a href={item.path}>
                  {item.title}
                </a>
              </li>
            ))
          }          
        </ul>
      </div>
    </div>
  )
}
