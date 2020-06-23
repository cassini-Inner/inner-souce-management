import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home/Home";
import YourJobs from "./YourJobs/YourJobs";
import CreateJob from "./CreateJob/CreateJob";
import JobDetailsPage from "./JobDetails/JobDetailsPage";
import EditJob from "./EditJob/EditJob";
import ApplyToMilestones from "./JobDetails/ApplyToMilestones";
import Profile from "./Profile/Profile";
import ManageJobs from "./ManageJobs/ManageJobs";
import EditProfile from "./Profile/EditProfile";
import UploadJobsList from "./JobsBackup/UploadJobsList";
import { AuthenticationContext } from "../../hooks/useAuthentication/provider";
import Login from "./Login/Login";
import SearchResults from "../Routes/SearchResults/SearchResults";
import LoadingIndicator from "../Common/LoadingIndicator/LoadingIndicator";
import OnboardingPage from "./Onboarding/OnboardingPage";
import { JobsFeedProvider } from "../../hooks/JobFeedProvider/JobFeedProvider";
import Sidebar from "../Navigation/Sidebar/Sidebar";

const Routes = (props) => {

    const { authenticated, loading, user } = useContext(AuthenticationContext);

    if (loading) {
        return (
            <Route path="/" component={LoadingIndicator} />
        );
    }
    return (
        <Switch>
            {
                !authenticated &&
                <Route path="/" component={Login} />
            }
            {
                authenticated && !user.onboarded &&
                <Route path="/" component={OnboardingPage} />
            }
            {
                authenticated && user.onboarded &&
                <>
                    <JobsFeedProvider>
                        <div
                            className="bg-white flex flex-row w-full h-full antialiased"
                        >

                            <div
                                className="flex flex-col lg:flex-row justify-center container w-full mx-auto">

                                <div className="ticky top-0 border-r border-nebula-grey-400">
                                    <Sidebar />
                                </div>
                                <div
                                    className="bg-white lg:flex-row w-full">
                                    <Switch>
                                        <Route path="/jobDetails/:id" component={JobDetailsPage} />
                                        <Route path="/editJob/:id" component={EditJob} />
                                        <Route path="/yourJobs" component={YourJobs} />
                                        <Route path="/profile/:id/uploadJobs" component={UploadJobsList} />
                                        <Route path="/profile/edit" component={EditProfile} />
                                        <Route path="/profile/:id" component={Profile} />
                                        <Route path="/manageJobs" component={ManageJobs} />
                                        <Route path="/searchResults/:query" component={SearchResults} />
                                        <Route exact path="/applyToMilestones" component={ApplyToMilestones} />
                                        <Route exact path="/createJob" component={CreateJob} />
                                        <Route path="/" component={Home} />
                                    </Switch>
                                </div>
                            </div>
                        </div>
                    </JobsFeedProvider>

                </>
            }

        </Switch>
    );
};

export default Routes;
