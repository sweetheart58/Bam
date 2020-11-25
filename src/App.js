import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Connect from "./components/Connect";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/connect" component={Connect} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
