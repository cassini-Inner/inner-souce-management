import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { withRouter } from "react-router";
import Axios from "axios";

import { connect } from "react-redux";
import { SET_USER_DATA } from "../../../Store/actions";
import { useLazyQuery } from "@apollo/client";
import { GET_USER_PROFILE } from "../../../queries";

const Authenticate = (props) => {

    const search = window.location.search;
    const params = new URLSearchParams(search);
    const code = params.get("code");

    const [loading, setLoading] = useState(true);

    const [getUser, { data, error }] = useLazyQuery(GET_USER_PROFILE, {
        onCompleted: (data) => {
            props.setUserData(data.User);
            console.log("auth provider saved user", data);
            setLoading(false);
        }
    });

    useEffect(
        () => {
            if (code != "") {
                Axios.post("http://localhost:8080/authenticate", { "code": code }, {
                    withCredentials: true,
                }).then(() => {
                    Axios.get("http://localhost:8080/read-cookie", { withCredentials: true },
                    ).then((data) => {
                        console.log(data);
                        getUser({ variables: { userId: data.data.user_id } }).then((data) => {
                            props.setUserData(data);
                            setLoading(false);
                        });
                        console.log("got cookie");
                    }).catch((e) => {
                        console.log(e);
                    });
                });
            }
            return (() => { });
        }, []);

    if (props.user.id && !loading) {
        return <Redirect to="/" />;
    } else {
        return <p>Authenticating...</p>;
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