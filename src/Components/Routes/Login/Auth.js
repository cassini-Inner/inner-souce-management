import React, { useEffect } from "react";
import { Redirect } from "react-router";
import { withRouter } from "react-router";
import Axios from "axios";

import { connect } from "react-redux";
import { SET_USER_DATA } from "../../../Store/actions";

const Authenticate = (props) => {

    const search = window.location.search;
    const params = new URLSearchParams(search);
    const code = params.get("code");

    useEffect(
        () => {
            if (code != "") {
                Axios.post("http://localhost:8080/authenticate", { "code": code }, {
                    withCredentials: true,
                }).then(() => {
                    Axios.get("http://localhost:8080/read-cookie", { withCredentials: true },
                    ).then((data) => {
                        console.log(data);
                        props.setUserData({ id: data.data.user_id });
                        console.log("got cookie");
                    }).catch((e) => {
                        console.log(e);
                    });
                });
            }
            return (() => { });
        }, []);

    if (props.user.id) {
        return <Redirect to="/" />;
    } else {
        return <p>not signed in</p>;
    }
};



const mapStateToProps = state => {
    return {
        user: state.user,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        setUserData: (profile) => dispatch({ type: SET_USER_DATA, payload: { profile: profile } })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Authenticate));