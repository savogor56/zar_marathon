import classes from './style.module.css'
import cn from 'classnames'
import {ReactComponent as LoginSvg} from "../../../assets/login.svg"

interface Props {
  toggleOpen: () => void
  onClickLogin: () => void
  isOpen: boolean | null
  bgActive?: boolean
}

export const Navbar:React.FC<Props> = ({toggleOpen, isOpen, bgActive, onClickLogin}) => {
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
        <div className={classes.loginAndMenu}>
          <div
            className={classes.loginWrap}
            onClick={onClickLogin}
          >
            <LoginSvg />
          </div>
          <div
              className={cn(classes.menuButton, {[classes.active]: isOpen})}
              onClick={handleClick}
          >
            <span />
          </div>
        </div>
      </div>
    </nav>
  )
}
