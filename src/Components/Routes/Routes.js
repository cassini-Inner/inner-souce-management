import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home/Home";
import YourJobs from "./YourJobs/YourJobs";
import CreateJob from "./CreateJob/CreateJob";
import JobDetailsPage from "./JobDetails/JobDetailsPage";
import ApplyToMilestones from "./JobDetails/ApplyToMilestones";
import Profile from "./Profile/Profile";
import ManageJobs from "./ManageJobs/ManageJobs";
import EditProfile from "./Profile/EditProfile";

const Routes = (props) => {
    const parentProps = props;
    return (
        <Switch>
            <Route path="/jobDetails/:id"
                component={(props) => { return <JobDetailsPage/>; }}/>
            <Route path="/yourJobs"
                component={(props) => { return <YourJobs/>; }}/>
            <Route path="/profile/edit"
                component={(props) => { return <EditProfile/>; }}/>
            <Route path="/profile" component={(props) => { return <Profile/>; }}/>
            <Route path="/manageJobs"
                component={(props) => { return <ManageJobs/>; }}/>
            <Route exact path="/applyToMilestones"
                component={(props) => { return <ApplyToMilestones/>; }}/>
            <Route exact path="/createJob" component={(props) => { return <CreateJob />; }} />
            <Route exact path="/" component={(props) => { return <Home />; }} />
        </Switch>
    );
};

export default Routes;
