import { withRouter, Redirect } from "react-router";
import { connect } from "react-redux";
import React, { Fragment, useEffect, useState } from "react";
import Axios from "axios";
import { SET_USER_DATA } from "../Store/actions";
import { useLazyQuery } from "@apollo/client";
import { GET_USER_PROFILE } from "../queries";
import LoadingIndicator from "../Components/Common/LoadingIndicator/LoadingIndicator";

const AuthProvider = ({ children, ...props }) => {

    const [loading, setLoading] = useState(true);
    const [getUser, { data, error }] = useLazyQuery(GET_USER_PROFILE, {
        onCompleted: (data) => {
            props.setUserData(data.User);
            console.log(props.user);
            setLoading(false);
        }
    });

    useEffect(
        () => {
            Axios.get("http://localhost:8080/read-cookie", { withCredentials: true },
            ).then((data) => {
                getUser({ variables: { userId: data.data.user_id } });
            }).catch((e) => {
                setLoading(false);
            });
            return (() => { });
        }, []);


    if (loading) {
        return <div>
            <LoadingIndicator />
        </div>;
    }
    return <div>{children}</div>;
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AuthProvider));