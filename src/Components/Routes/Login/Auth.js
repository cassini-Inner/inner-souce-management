import React from "react";
import { Redirect } from "react-router";
import { AUTHENTICATE } from "../../../mutations";
import { useMutation } from '@apollo/react-hooks';
import { withRouter } from "react-router";

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
                console.log("authResult:",res);
                document.cookie = "token=" + res.data.authenticate.token.toString();
                props.history.push({
                    pathname: '/onboard',
                    search: '',
                    state: res.data.authenticate,
                });
            },
            err => {
                // console.log(err);
            });
    }
    else {
        return <Redirect to = "/login" />
    }
}

export default withRouter(Authenticate);