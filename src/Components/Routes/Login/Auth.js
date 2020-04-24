import React from "react";
import { Redirect } from "react-router";
import { AUTHENTICATE } from "../../../mutations";
import { useMutation } from '@apollo/react-hooks';


const Authenticate = (props) => {

    const search = window.location.search;
    const params = new URLSearchParams(search);
    const code = params.get('code');

    const [login, {data, loading, error}] = useMutation(AUTHENTICATE, {
        onCompleted(data ) {
            console.log(data,"Inside login");
            return <Redirect to = "/" />
        }
    });

    if(code) {
        console.log("inside")
        login({variables: {githubCode: code}});
        if(loading) return <p>Loading...</p>;
        if(error) return <p>Error!</p>;
    }
    else {
        return <Redirect to = "/login" />
    }
}

export default Authenticate;