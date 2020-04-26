import React from 'react';
import { withRouter, Redirect, Route } from "react-router";
import { useQuery } from '@apollo/client';
import { GET_USER_PROFILE } from "../../../queries";
import Cookies from 'js-cookie';
import { connect } from "react-redux";
import { SET_USER_DATA } from "../../../Store/actions";

// To allow routes only after user has logged in
const PrivateRoute = ({ children, ...rest }) => {
    let isLoggedIn = false;
    //Checks if the user is logged in and sets the user redux store with cookies if it is empty
    if(!(rest.user.id && rest.user.token)) {
        //Check if cookies are set then set the user redux store with respective values
        if(Cookies.get('token') != undefined && Cookies.get('id') != undefined ) {
            const { loading, error, data } = useQuery(GET_USER_PROFILE, { variables: { userId: Cookies.get('id') } });
            if (loading) return "Loading...";
            else if (error) {
                isLoggedIn = false;
                return (`get user profile error! ${error.message}`);

            }
            rest.setUserData({
                token: Cookies.get('token'),
                id: Cookies.get('id'),
                onboarded: data.User.onboarded ? data.User.onboarded : false,
                githubName: data.User.githubName ? data.User.githubName : "",
                name: data.User.name ? data.User.name : "",
                email: data.User.email ? data.User.email : "",
                photoUrl: data.User.photoUrl ? data.User.photoUrl : "",
                githubUrl: data.User.githubUrl ? data.User.githubUrl : "",
            });
            isLoggedIn = true;
        }
        //if the cookies are not set then the user is not logged in
        else {
            isLoggedIn = false;
        }
    }
    //If user  redux store has value and cookie doesn't exist means the cookie has expired
    //ToDo Implement refresh token 
    if(!(Cookies.get('token')&&Cookies.get('id')&&Cookies.get('githubName'))) {
        isLoggedIn = false;
    }
    else {
        isLoggedIn = true;
    }

    return (
      <Route
        {...rest}
        render={({ location }) =>
            isLoggedIn? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location, msg:"Please log in to proceed!" }
              }}
            />
          )
        }
      />
    );
}

const mapStateToProps = state => {
    return {
        user: state.user,
    }
}
const mapDispatchToProps = dispatch => {
    return {
      setUserData: (profile) => dispatch({ type: SET_USER_DATA, payload: {profile: profile}})
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(PrivateRoute));
