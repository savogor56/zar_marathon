import { Redirect, Route, Switch, useRouteMatch, useLocation } from "react-router"
import cn from 'classnames'

import { MenuHeader } from "./components/MenuHeader"
import { GamePage } from "./routes/Game"
import { HomePage } from "./routes/Home"
import { Footer } from "./components/Footer"
import { AboutPage } from "./routes/About"
import { ContactPage } from "./routes/Contact"
import { NotFound } from "./routes/NotFound"

import classes from './style.module.css'
import {FireBaseContext} from "./context/firabaseContext";
import Firebase from "./services/firebase";

const App = () => {
  const location = useLocation()
  const isPadding = location.pathname === '/' || location.pathname === '/game/board'
  
  return (
      <FireBaseContext.Provider value={Firebase}>
        <Switch>
          <Route path="/404">
            <NotFound />
          </Route>
          <Route>
            <>
            <MenuHeader bgActive={!isPadding} />
              <div className={cn(classes.wrap,
                {[classes.isHomePage]: isPadding}
                )}>
                <Switch>
                  <Route exact path="/">
                    <HomePage />
                  </Route>
                  <Route path="/game">
                    <GamePage />
                  </Route>
                  <Route path="/about">
                    <AboutPage />
                  </Route>
                  <Route path="/contact">
                    <ContactPage />
                  </Route>
                  <Route>
                    <Redirect to="/404" />
                  </Route>
                </Switch>
              </div>
              <Footer />
            </>
          </Route>
        </Switch>
      </FireBaseContext.Provider>
  )
}

export default App