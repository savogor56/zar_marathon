import {useSelector} from "react-redux"
import {selectUser} from "../../utils/selectors"
import {useAppDispatch} from "../../utils/hooks"
import {removeUser} from "../../store/user"
import {useHistory} from "react-router"

import classes from "./style.module.css"




export const UserPage = () => {
    const user = useSelector(selectUser)
    const dispatch = useAppDispatch()
    const history = useHistory()

    const handleClick = () => {
        localStorage.removeItem('idToken')
        dispatch(removeUser())
        history.push('/')
    }

    return (
        <div className={classes.root}>
            <h1>Profile</h1>
            email: {user?.email}
            <button onClick={handleClick}>
                Log Out
            </button>
        </div>

    )
}