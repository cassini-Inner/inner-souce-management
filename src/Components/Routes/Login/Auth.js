import React from "react";
import { Redirect } from "react-router";
import { AUTHENTICATE } from "../../../mutations";
import { useApolloClient, useMutation } from '@apollo/react-hooks';


const Authenticate = (props) => {

    const search = window.location.search;
    const params = new URLSearchParams(search);
    const code = params.get('code');
    // const [login,{ loading, error }] = useMutation(AUTHENTICATE, {
    //     onCompleted({ login }) {
    //         console.log(data);
    //     }
    // })
    

    // const client = useApolloClient();
    // const [login, { data, loading, error }] = useMutation(AUTHENTICATE, {
    //     onCompleted({ login }) {
    //         console.log(data);
    //         localStorage.setItem("token", login);
    //         client.writeData({ data: { isLoggedIn: true } });
    //         console.log(localStorage.getItem('token') );
    //     }
    // });
    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>{error}</p>

    // if(code) {
    //     login({variables: {githubCode: code}});
    // }
    return <Redirect to = "/" />
}

export default Authenticate;