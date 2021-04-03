import {Route, Switch, useRouteMatch} from "react-router"

import {StartPage} from "./Start"
import {BoardPage} from "./Board"
import {FinishPage} from "./Finish"


export const GamePage = () => {
    const match = useRouteMatch()

    return (
            <Switch>
                <Route path={`${match.path}/`} exact>
                    <StartPage />
                </Route>
                <Route path={`${match.path}/board`}>
                    <BoardPage />
                </Route>
                <Route path={`${match.path}/finish`}>
                    <FinishPage />
                </Route>
            </Switch>
    )
}