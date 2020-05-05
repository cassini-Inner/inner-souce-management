import React from "react";
import Routes from "./Routes/Routes";
import Sidebar from "./Navigation/Sidebar/Sidebar";
import { BrowserRouter, Route } from "react-router-dom";
import LoginPage from "./Routes/Login/Login";
import Authenticate from "./Routes/Login/Auth";
import { Switch } from "react-router";
import OnboardingPage from "./Routes/Onboarding/OnboardingPage";
import PrivateRoute from "./Routes/PrivateRoute/PrivateRoute";
import { JobsFeedProvider } from "../reducers/JobFeedProvider/JobFeedProvider";
import AuthProvider from "../reducers/AuthProvider";

const App = (props) => {
    return (
        <React.StrictMode>
            <BrowserRouter>
                <AuthProvider>

                    <Switch>
                        <Route path="/login" exact={true}
                            component={(props) => { return (<LoginPage />); }} />
                        <Route path="/auth/result" exact={true}
                            component={(props) => (<Authenticate />)} />

                        {/* User redux store is passed for checking if the user is logged in */}
                        <PrivateRoute>
                            <Switch>
                                <Route
                                    path="/onboard"
                                    exact={true}
                                    component={(props) => {
                                        return (<OnboardingPage />);
                                    }}
                                />
                                <Route path="/" component={(props) => {
                                    return (
                                        <JobsFeedProvider>
                                            <div
                                                className=" bg-white w-full h-full antialiased"
                                            >
                                                <div
                                                    className="flex flex-col lg:flex-row justify-center w-full mx-auto">
                                                    <div className="ticky top-0 border-r border-nebula-grey-400">
                                                        <Sidebar />

                                                    </div>
                                                    <div
                                                        className="bg-white lg:flex-row lg:max-w-screen-lg w-full">
                                                        <Routes />
                                                    </div>
                                                </div>
                                            </div>
                                        </JobsFeedProvider>
                                    );
                                }} />
                            </Switch>
                        </PrivateRoute>
                    </Switch>

                </AuthProvider>
            </BrowserRouter>
        </React.StrictMode>
    );
};

export default App;
