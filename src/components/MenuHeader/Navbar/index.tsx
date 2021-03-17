import classes from './style.module.css'
import cn from 'classnames'

interface Props {
  toggleOpen: () => void
  isOpen: boolean | null
  bgActive?: boolean
}

export const Navbar:React.FC<Props> = ({toggleOpen, isOpen, bgActive}) => {
  const handleClick = () => {
    toggleOpen()
  }

  return (
    <nav className={cn(classes.root, classes.navbar,
      {[classes.bgActive]: bgActive}
    )}>
      <div className={classes.navWrapper}>
        <p className={classes.brand}>
          LOGO
        </p>
         {/*eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
        <div
          className={cn(classes.menuButton, {[classes.active]: isOpen})} 
          onClick={handleClick}
        >
          <span />
        </div>
      </div>
    </nav>
  )
}
