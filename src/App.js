import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Connect from "./components/Connect";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Chat from "./components/Chat";
import Store from "./store/Context";

const App = () => {
  return (
    <Store>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/connect" component={Connect} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/chat" component={Chat} />
        </Switch>
      </BrowserRouter>
    </Store>
  );
};

export default App;
