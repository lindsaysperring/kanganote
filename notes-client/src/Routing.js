import React, { useState } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/LoginPage";
import Signup from "./pages/LandingPage";

export const userContext = React.createContext({
  userData: { isLoggedIn: false, user: null },
  setUserData: () => {},
});

const Routing = () => {
  const [userData, setUserData] = useState({ isLoggedIn: false, user: null });
  const value = { userData, setUserData };

  return (
    <userContext.Provider value={value}>
      <Router>
        <Switch>
          <Route exact path="/" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/home" component={Home} />
        </Switch>
      </Router>
    </userContext.Provider>
  );
};

export default Routing;
