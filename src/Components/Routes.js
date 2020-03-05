import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from "./Home/Home";

const Routes = (props) => {
    const parentProps = props; 
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={(props) => {  return <Home setModalState = {parentProps.setModalState}/>}} />
                {/* <Route exact path="/" component={(props) => <Home />} /> */}
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;