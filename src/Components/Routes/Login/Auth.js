import React from "react";
import { Redirect } from "react-router";
import { AUTHENTICATE } from "../../../mutations";
import { useMutation } from '@apollo/client';
import { withRouter } from "react-router";
import { getCookie } from "../../../HelperFunctions/Cookies";

const Authenticate = (props) => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const code = params.get('code');

    if(code) {
        const [login, {loading, error}] = useMutation(AUTHENTICATE);
        if(loading) return <p>Authenticating...</p>;
        if(error) return <p>Authentication Error! {error}</p>;
        login({
            variables: {
                githubCode: code
            }
        }).then(res => {
            // To set the cookie after authentication
            console.log(res)
            let cookieStr = "token=" + res.data.authenticate.token.toString(); //Token has to be the first key
            cookieStr += "; id="+ res.data.authenticate.profile.id.toString();
            cookieStr += "; name="+ res.data.authenticate.profile.githubName.toString();
            //ToDo add expires=  expiry time
            document.cookie = cookieStr;
            if(res.data.authenticate.profile.onboarded) {
                props.history.push({
                    pathname: '/',
                    search: '',
                    state: res.data.authenticate,
                });
            }
            else {
                props.history.push({
                    pathname: '/onboard',
                    search: '',
                    state: res.data.authenticate,
                });
            }
        },
        err => {
            console.log(err);
        });
    }

    if(getCookie('token')&&getCookie('id')&&getCookie('name')) {
        console.log("hiii")
        return <Redirect to={{
            pathname: "/",
            search: "",
            state: { userId: getCookie('id')}
          }} />
    }

    return <Redirect to={{
        pathname: "/login",
        search: "",
        state: { errMsg: "Please sign in with github to continue!" }
        }} />
}


export default withRouter(Authenticate);