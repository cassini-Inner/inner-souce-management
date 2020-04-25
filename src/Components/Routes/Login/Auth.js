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
                setCookie('id', res.data.authenticate.profile.id, { path: '/', maxAge:36000 });
            if(res.data.authenticate.token)
                setCookie('token', res.data.authenticate.token, { path: '/', maxAge:36000 });
            if(res.data.authenticate.profile.githubName)
                setCookie('githubName',res.data.authenticate.profile.githubName, { path: '/', maxAge:36000 });
            console.log("cookies",cookies.id,cookies.token,cookies.githubName)
            if(res.data.authenticate.profile.onboarded) {
                props.history.push('/');
            }
            else {
                props.history.push('/onboard');
            }
        },
        err => {
            console.log(err);
        });
    }

    // if(cookies.token&&cookies.id&&cookies.githubName) {
    //     console.log("hiii")
    //     return <Redirect to="/" />
    // }

    return <Redirect to={{
        pathname: "/login",
        search: "",
        state: { errMsg: "Please sign in with github to continue!" }
        }} />
}


export default withRouter(Authenticate);