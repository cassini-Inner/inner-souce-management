import React from "react";
import Routes from "./Routes/Routes";
import { BrowserRouter, Route } from "react-router-dom";
import { Switch } from "react-router";
import { AuthenticationProvider } from "../hooks/useAuthentication/provider";
import { AuthCompletionHandler } from "./Routes/Login/Auth";

const App = (props) => {
    return (
        <React.StrictMode>
            <BrowserRouter>
                <AuthenticationProvider>
                    <Switch>
                        <Route path="/auth/result" component={AuthCompletionHandler} />
                        <Routes />
                    </Switch>
                </AuthenticationProvider>
            </BrowserRouter>
        </React.StrictMode>
    );
};


export default App;
