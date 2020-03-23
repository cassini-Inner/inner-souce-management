import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./Home/Home";
import YourJobs from "./YourJobs/YourJobs";
import CreateJob from "./CreateJob/CreateJob";
import JobDetailsPage from "./JobDetails/JobDetailsPage";
import ApplyToMilestones from "./JobDetails/ApplyToMilestones";
import Profile from "./Profile/Profile";

const Routes = (props) => {
    const parentProps = props;
    return (
        <Switch>
            <Route exact path="/jobDetails" component={(props) => { return <JobDetailsPage />; }} />
            <Route path="/yourJobs" component={(props) => { return <YourJobs />; }} />
            <Route path="/profile" component={(props) => { return <Profile />; }} />
            <Route exact path="/manageJobs" component={(props) => { return <YourJobs />; }} />
            <Route exact path="/applyToMilestones" component={(props) => { return <ApplyToMilestones />; }} />
            <Route exact path="/createJob" component={(props) => { return <CreateJob />; }} />
            <Route exact path="/" component={(props) => { return <Home />; }} />
        </Switch>
    );
};

export default Routes;
