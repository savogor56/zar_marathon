import React from "react"
import {Redirect, Route} from "react-router"

const PrivateRoute: React.FC<any> = ({children, ...rest}) => {
    return (
        <Route {...rest} >
            {
                localStorage.getItem('idToken') ?
                    children :
                    <Redirect to="/" />
            }
        </Route>
    )
}

export default PrivateRoute