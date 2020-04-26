import React from "react";
import { Redirect } from "react-router";
import { AUTHENTICATE } from "../../../mutations";
import { useMutation } from '@apollo/client';
import { withRouter } from "react-router";
import Cookies from 'js-cookie';

const Authenticate = (props) => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const code = params.get('code');
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
            console.log("Auth:",res.data);
            var cookieExpiry = new Date(new Date().getTime() +  15* 60 * 1000); //15 minutes
            if(res.data.authenticate.profile.id) {
                Cookies.set('id', res.data.authenticate.profile.id, { expires:cookieExpiry });
            }
            if(res.data.authenticate.token) {
                Cookies.set('token', res.data.authenticate.token, { expires:cookieExpiry });
            }
            if(res.data.authenticate.profile.githubName) {
                Cookies.set('githubName',res.data.authenticate.profile.githubName, { expires:cookieExpiry });
            }
            if(res.data.authenticate.profile.onboarded) {
                props.history.push('/');
            }
            else {
                props.history.push("/onboard");
            }
        },
        err => {
            console.log(err);
            //ToDo use mutation not working properly
            // props.history.push({
            //     pathname: "/login",
            //     search: "",
            //     state: { msg: "Authentication error!" }
            // });
        });
    }

    return <Redirect to={{
        pathname: "/login",
        search: "",
        state: { msg: "Please sign in with github to continue!" }
        }} />
}



export default withRouter(Authenticate);