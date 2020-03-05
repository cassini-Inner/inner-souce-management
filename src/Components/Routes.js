import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home/Home';
import YourJobs from "./YourJobs/YourJobs";

const Routes = (props) => {
    const parentProps = props;
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/jobDetails" component={(props) => { return <JobDetailsPage setModalState={parentProps.setModalState} /> }} />
                <Route exact path="/" component={(props) => { return <Home setModalState={parentProps.setModalState} /> }} />
                <Route exact path="/yourJobs" component={(props) => { return <YourJobs setModalState={parentProps.setModalState} /> }} />
                {/* <Route exact path="/" component={(props) => <Home />} /> */}
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;