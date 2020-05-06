import React from "react";
import { withRouter, Redirect, Route } from "react-router";
import { connect } from "react-redux";
import { SET_USER_DATA } from "../../../Store/actions";
import LoginPage from "../Login/Login";
import OnboardingPage from "../Onboarding/OnboardingPage";
// To allow routes only after user has logged in
const PrivateRoute = (props) => {
    let isLoggedIn = false;

    if (props.user.id) {
        isLoggedIn = true;
    }
    else {
        isLoggedIn = false;
    }

    console.log("private route");
    console.log(props.user.id)
    console.log(props.user.onboarded);

    const onboarded = props.user.onboarded;

    if (!isLoggedIn) {
        return <LoginPage />;
    }

    if (isLoggedIn && onboarded === false) {
        return <OnboardingPage />;
    }

    return (
        <Route
            {...props}
            render={({ location }) =>
                props.children
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
