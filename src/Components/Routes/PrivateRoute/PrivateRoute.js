import React from "react";
import { withRouter, Redirect, Route } from "react-router";
import { connect } from "react-redux";
import { SET_USER_DATA } from "../../../Store/actions";

// To allow routes only after user has logged in
const PrivateRoute = ({ children, ...props }) => {
    let isLoggedIn = false;
    if (props.user.id) {
        isLoggedIn = true;
    }
    else {
        isLoggedIn = false;
    }
    return (
        <Route
            {...props}
            render={({ location }) =>
                isLoggedIn ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location, msg: "Please log in to proceed!" }
                        }}
                    />
                )
            }
        />
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PrivateRoute));
