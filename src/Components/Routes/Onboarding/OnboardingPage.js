import React, { useState } from "react";
import SplitContainerWithImage from "../../Containers/SplitContainerWithImage";
import TextInput from "../../Common/InputFields/TextInput";
import SearchTagsInput from "../../Common/InputFields/SearchTagsInput";
import Button from "../../Common/Button/Button";
import { withRouter, Redirect } from "react-router";
import { connect } from "react-redux";
import { validateOnboarding } from "./ValidateForm";
import { useMutation } from "@apollo/client";
import { UPDATE_USER_PROFILE } from "../../../mutations";
import LoadingIndicator from "../../Common/LoadingIndicator/LoadingIndicator";
import Cookies from "js-cookie";


const OnboardingPage = (props) => {
    //To verify if the user has already onboarded
    if(props.user.onboarded) {
        return <Redirect to="/"/>;
    }

    const form = {
        name: props.user.name ? props.user.name : "",
        position: "",
        bio: "",
        department: "",
        contact: "",
        email: props.user.email ? props.user.email : "",
        skills: [],
        errMsg: "",
    };
    const [ state, setState ] = useState(form);

    // For update user mutation 
    const [updateUserMutation, {loading, error}] = useMutation(UPDATE_USER_PROFILE);
    if(loading) return<LoadingIndicator/>;
    if(error) return <p>Error! {error}</p>;

    const onInputChangeHandler = (event) => {
        const value = event.currentTarget.value;
        switch(event.currentTarget.id) {
        case "name": setState({...state, name:value});break;
        case "bio": setState({...state, bio:value});break;
        case "email": setState({...state, email:value});break;
        case "position":  setState({...state, position:value});break;
        case "department":  setState({...state, department:value});break;
        case "contact":  setState({...state, contact:value});break;
        }
    };

    const getTagList = (skillList) => {   
        setState({
            ...state,
            skills: skillList
        }
        );
    };

    const validateAndSubmitForm = () => {
        let isValid = validateOnboarding(state);
        if(isValid) {
            updateUserMutation({ 
                variables: { 
                    userInput: {
                        name: state.name,
                        email: state.email,
                        role: state.position,
                        bio: state.bio,
                        department: state.department,
                        contact: state.contact,
                        skills: state.skills,
                    }
                }
            }
            ).then(res => 
                props.history.push("/"), //Navigate to home page on success
            err => console.log(err));
            setState({
                ...state,
                errMsg: ""
            });
        }
        else {
            setState({
                ...state,
                errMsg: "Please fill valid values in all fields!"
            });
        }
    };
    
    const body = (
        <div className="flex flex-col w-full px-4 font-semibold ">
            <p className="text-lg text-nebula-grey-600 mb-4">Hello,</p>
            <p className="text-3xl">{Cookies.get("githubName")}</p>
            <p className="text-lg text-nebula-grey-600 mt-2">Before we get
              started, we’d like get to know you a little better.</p>
            <label className="mt-10">Your Full Name</label>
            <TextInput id="name" placeholder="Full Name" onChange={onInputChangeHandler} value={state.name} />
            <label className="mt-10">Your position in company</label>
            <TextInput id="position" placeholder="Position" onChange={onInputChangeHandler} value={state.position} />
            <label className="mt-10">Your department</label>
            <TextInput id="department" placeholder="Department" onChange={onInputChangeHandler} value={state.department} />
            <label className="mt-10">Email</label>
            <TextInput id="email" placeholder="Email" onChange={onInputChangeHandler} value={state.email}/>
            <label className="mt-10">Contact</label>
            <TextInput id="contact" placeholder="Slack ID, Microsoft Teams..." onChange={onInputChangeHandler} value={state.contact} />
            <label className="mt-10">Bio</label>
            <TextInput id="bio" placeholder="Bio" onChange={onInputChangeHandler} value={state.bio} />
            <label className="mt-10">Skills & areas of interest</label>
            <SearchTagsInput id="skills" getTagList = {getTagList} placeholder="Type and press enter to add skills"/>
            {
                state.errMsg ? 
                    <div className = "mt-6 text-nebula-red" >{state.errMsg}</div>
                    : ""
            }
            <Button label="Let's go!" type="primary" className="px-8 mt-24" onClick={validateAndSubmitForm}/>
        </div>
    );

    return (
        <SplitContainerWithImage body={body}/>
    );
};

const mapStateToProps = state => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps)(withRouter(OnboardingPage));