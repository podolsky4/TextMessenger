import React from "react";
import {Route, Switch} from "react-router-dom";
import Home from "./Containers/Home/Home.js";
import Login from "./Components/Login/Login2.js";

export default () =>
    <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
    </Switch>;
