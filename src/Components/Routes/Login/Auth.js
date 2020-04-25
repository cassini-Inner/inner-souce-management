import React from "react";
import { Redirect } from "react-router";
import { AUTHENTICATE } from "../../../mutations";
import { useMutation } from '@apollo/client';
import { withRouter } from "react-router";
import { useCookies } from 'react-cookie';

const Authenticate = (props) => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const code = params.get('code');
    const [cookies, setCookie, removeCookie] = useCookies(['token', 'githubName', 'id']);
    const cookieExpiry = 2000;
    const [login, {loading, error}] = useMutation(AUTHENTICATE);
    if(loading) return <p>Authenticating...</p>;
    if(error) return <p>Authentication Error! {error}</p>;

    if(code) {
        login({
            variables: {
                githubCode: code
            }
        }).then(res => {
            // To set the cookie after authentication
            console.log("   ",res.data);
            if(res.data.authenticate.profile.id)
                setCookie('id', res.data.authenticate.profile.id, { path: '/', maxAge:cookieExpiry });
            if(res.data.authenticate.token)
                setCookie('token', res.data.authenticate.token, { path: '/', maxAge:cookieExpiry });
            if(res.data.authenticate.profile.githubName)
                setCookie('githubName',res.data.authenticate.profile.githubName, { path: '/', maxAge:cookieExpiry });
            if(res.data.authenticate.profile.onboarded) {
                props.history.push('/');
            }
            else {
                props.history.push({
                    pathname: "/onboard",
                    search: "",
                    state: { onboarded: res.data.authenticate.profile.onboarded }
                });
            }
        },
        err => {
            console.log(err);
            props.history.push({
                pathname: "/login",
                search: "",
                state: { msg: "Authentication error!" }
            });
        });
    }

    return <Redirect to={{
        pathname: "/login",
        search: "",
        state: { msg: "Please sign in with github to continue!" }
        }} />
}


export default withRouter(Authenticate);