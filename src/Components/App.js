import React from "react";
import Routes from "./Routes/Routes";
import Sidebar from "./Navigation/Sidebar";
import { BrowserRouter, Route } from "react-router-dom";
import LoginPage from "./Routes/Login/Login";
import Authenticate from "./Routes/Login/Auth";
import { Switch } from "react-router";
import OnboardingPage from "./Routes/Onboarding/OnboardingPage";
import PrivateRoute from "./Routes/PrivateRoute/PrivateRoute";

const App = (props) => {
    return (
        <React.StrictMode>
            <BrowserRouter>
                <Switch>
                    <Route path="/login" exact={true}
                        component={(props) => { return (<LoginPage/>); }}/>
                    <Route path="/auth/result" exact={true}
                        component={(props) => { return (<Authenticate/>); }}/>
                    
                    {/* User redux store is passed for checking if the user is logged in */}
                    <PrivateRoute>
                        <Switch>
                            <Route path="/onboard" exact={true} component={(props) => {
                                return (<OnboardingPage/>);
                            }}/>
                            <Route path="/" component={(props) => {
                                return (<div
                                    className=" bg-nebula-grey-100 w-full h-full antialiased">
                                    <div
                                        className="flex flex-col lg:flex-row justify-center">
                                        <Sidebar/>
                                        <div
                                            className="bg-white w-full lg:flex-row lg:max-w-screen-xl">
                                            <Routes/>
                                        </div>
                                    </div>
                                </div>);
                            }}/>
                        </Switch>
                    </PrivateRoute>

                </Switch>
            </BrowserRouter>
        </React.StrictMode>
    );
};


export default App;
