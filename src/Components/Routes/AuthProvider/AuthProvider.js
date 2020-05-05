import React, { useEffect, useState } from "react";
import { withRouter, Route } from "react-router";
import { useQuery } from "@apollo/client";
import { GET_USER_PROFILE } from "../../../queries";
import { connect } from "react-redux";
import { SET_USER_DATA } from "../../../Store/actions";
import { getCookieUrl } from "../../../Configuration";
import LoadingIndicator from "../../Common/LoadingIndicator/LoadingIndicator";
import axios from "axios";

// To allow routes only after user has logged in
const AuthProvider = ({ children, ...props }) => {
    const initialState = 0
    const [state, setState] = useState(initialState);
    console.log("state:",state)
    useEffect(() => {
        if(!props.user.id) { 
            //Check if cookies are set then set the user redux store with respective values
            axios.get(getCookieUrl, {
                withCredentials: true
            }).then(
                res => {
                    console.log(res);
                    props.setUserData({
                        id: res.data.user_id
                    })
                    console.log("hello")
                },
                err => console.log(err)
            );
        }    
    },[props.user.id]);
    //Checks if the user is logged in and sets the user redux store with cookies if it is empty
    
    if(props.user.id) {
        const { loading, error, data } = useQuery(GET_USER_PROFILE, { variables: { userId: props.user.id.toString() } });
        if (loading) return <LoadingIndicator/>;
        else if (error) {
            alert(`User profile fetch error! Try logging in again${error.message}`);
            return props.history.push("/login");
        }
        props.setUserData({
            onboarded: data.User.onboarded ? data.User.onboarded : false,
            githubName: data.User.githubName ? data.User.githubName : "",
            name: data.User.name ? data.User.name : "",
            email: data.User.email ? data.User.email : "",
            photoUrl: data.User.photoUrl ? data.User.photoUrl : "",
            githubUrl: data.User.githubUrl ? data.User.githubUrl : "",
        });
    }
            
    return (
        <Route
            {...props}
            render={({ location }) =>
                (
                    children
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
        setUserData: (profile) => dispatch({ type: SET_USER_DATA, payload: {profile: profile}})
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(AuthProvider));