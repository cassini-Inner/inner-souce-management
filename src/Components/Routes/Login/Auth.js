import React from "react";
import { Redirect } from "react-router";
import { AUTHENTICATE } from "../../../mutations";
import { useMutation } from '@apollo/react-hooks';
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { SET_USER_DATA } from "../../../Store/actions";

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
            props.setUserData(res.data.profile);
            document.cookie = "token=" + res.data.authenticate.token.toString();
            props.history.push("/onboard");
        },
        err => {

        });

    }
    else {
        return <Redirect to = "/login" />
    }
}

const mapDispatchToProps = dispatch => {
    return {
      setUserData: (profile) => dispatch({ type:  'sadasd', payload: {profile: profile}})
    }
  }

export default connect(null,mapDispatchToProps)(withRouter(Authenticate));