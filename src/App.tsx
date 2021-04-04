import { Redirect, Route, Switch, useLocation } from "react-router"
// @ts-ignore
import { NotificationContainer } from "react-notifications"
import cn from "classnames"

import { MenuHeader } from "./components/MenuHeader"
import { GamePage } from "./routes/Game"
import { HomePage } from "./routes/Home"
import { Footer } from "./components/Footer"
import { AboutPage } from "./routes/About"
import { ContactPage } from "./routes/Contact"
import { NotFound } from "./routes/NotFound"

import classes from "./style.module.css"
import "react-notifications/lib/notifications.css"
import PrivateRoute from "./components/PrivateRoute"

const App = () => {
  const location = useLocation()
  const isPadding = location.pathname === '/' || location.pathname === '/game/board'
  
  return (
      <>
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
                  <Route exact path="/" >
                    <HomePage />
                  </Route>
                  <PrivateRoute path="/game">
                    <GamePage />
                  </PrivateRoute>
                  <PrivateRoute path="/about" >
                    <AboutPage />
                  </PrivateRoute>
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
        <NotificationContainer />
      </>
  )
}

export default App