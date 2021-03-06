import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router";

import { AuthenticationContext } from "../../../hooks/useAuthentication/provider";
import { InitialLoadingPage } from "../../Common/LoadingIndicator/InitialLoadingPage";

export const AuthCompletionHandler = () => {
    const { authenticated, finishAuth, loading } = useContext(AuthenticationContext);

    const search = window.location.search;
    const params = new URLSearchParams(search);
    const code = params.get("code");

    useEffect(
        () => {
            finishAuth(code);
            return (() => { });
        }, [code]
    );

    if (authenticated && !loading) {
        return <Redirect to="/" />;
    }

    return (
        <InitialLoadingPage secondaryText="Signing you in"/>
    );
};
