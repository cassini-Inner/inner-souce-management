import React from "react";
import { Redirect } from "react-router";
import { AUTHENTICATE } from "../../../mutations";
import { useMutation } from "@apollo/react-hooks"


const Authenticate = (props) => {

    const search = window.location.search;
    const params = new URLSearchParams(search);
    const code = params.get('code');
    console.log(code);

    // const [login, {data}] = useMutation(AUTHENTICATE);
    return<div>Hiii</div>
    // if(code) {
    //     login(
    //         {
    //             variables: {githubCode: code},
    //         },
    //     );
    //     return <Redirect to = "/onboard" />
    // }
    // else {
    //     return <Redirect to = "/login" />
    // }
}

export default Authenticate;