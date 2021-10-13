import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Signup from './pages/LandingPage'
import Login from './pages/LoginPage'


const Routing = () => {
  return (
    <Router>
          <Switch>
            <Route exact path="/" component={Signup} />
            <Route path="/login" component={Login} />
          </Switch>
    </Router>
  )
}

export default Routing
