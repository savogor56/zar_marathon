import cn from 'classnames'
import {ReactComponent as LoginSvg} from "../../../assets/login.svg"
import {ReactComponent as UserSvg} from "../../../assets/user.svg"
import {useSelector} from "react-redux"
import {selectLocalID, selectUserLoading} from "../../../utils/selectors"
import {Link} from "react-router-dom"

import classes from './style.module.css'

interface Props {
  toggleOpen: () => void
  onClickLogin: () => void
  isOpen: boolean | null
  bgActive?: boolean
}

export const Navbar:React.FC<Props> = ({toggleOpen, isOpen, bgActive, onClickLogin}) => {
  const isLoading = useSelector(selectUserLoading)
  const localId = useSelector(selectLocalID)

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
          {(!isLoading && !localId) &&
            <div
                className={classes.loginWrap}
                onClick={onClickLogin}
            >
              <LoginSvg/>
            </div>
          }
          {(!isLoading && localId) &&
            <Link
                className={classes.loginWrap}
                to="/user"
            >
              <UserSvg/>
            </Link>
          }
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
