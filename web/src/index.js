import "./services/sw";
import React from "react";
import ReactDom from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import loader from "./services/Loader";

import "./style.css";

const App = () => (
  <Router>
    <Switch>
      <Route path="/home" component={loader("Home")} />
      <Route path="/login" component={loader("Login")} />
      <Route path="/" exact>
        <Redirect to="/home" />
      </Route>
    </Switch>
  </Router>
);

ReactDom.render(<App />, document.getElementById("react-app"));
