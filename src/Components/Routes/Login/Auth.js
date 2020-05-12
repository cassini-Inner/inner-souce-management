import React, { useContext } from "react";
import { Redirect } from "react-router";

import { AuthenticationContext } from "../../../hooks/useAuthentication/provider";

export const AuthCompletionHandler = () => {
    const { authenticated, finishAuth } = useContext(AuthenticationContext);

    const search = window.location.search;
    const params = new URLSearchParams(search);
    const code = params.get("code");

    if (code != null) {
        finishAuth(code);
    }

    if (authenticated) {
        return <Redirect to="/"></Redirect>;
    }

    return (
        <div className="App">
            Signing you in...
        </div>
    );
}