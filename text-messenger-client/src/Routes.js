import React from "react";
import {Route, Switch} from "react-router-dom";
import Home from "./Containers/Home/Home.js";
import Login from "./Containers/Login/Login.js";
import p404 from "./Containers/404/404";

export default () =>
    <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        { /* catch all unmatched routes */ }
        <Route component={p404} />
    </Switch>;
