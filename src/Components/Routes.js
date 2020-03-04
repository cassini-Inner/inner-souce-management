import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from "./Home/Home";

const Routes = (props) => {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={(props) => <Home />} />
                {/* <Route exact path="/" component={(props) => <Home />} /> */}
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;