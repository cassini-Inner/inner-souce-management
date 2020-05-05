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
        errorMessages: {
            nameErr: "",
            positionErr: "",
            bioErr: "",
            departmentErr: "",
            contactErr: "",
            emailErr: "",
            skillsErr: "",
        }
    };
    const [ state, setState ] = useState(form);

    // For update user mutation 
    const [updateUserMutation, {loading, error}] = useMutation(UPDATE_USER_PROFILE);
    if(loading) return<LoadingIndicator/>;
    if(error) return <p>Error! {error}</p>;

    const onInputChangeHandler = (event) => {
        const value = event.currentTarget.value;
        const field = event.currentTarget.id;
        setState({ 
            ...state, 
            [field]: value,
            errorMessages: {
                ...state.errorMessages, 
                [field + "Err"]:""
            }
        });
    };

    const getTagList = (skillList) => {   
        setState({
            ...state,
            skills: skillList,
            errorMessages: {
                ...state.errorMessages, 
                skillsErr:""
            } 
        }
        );
    };

    const validateAndSubmitForm = () => {
        const [isValid,errorMessages] = validateOnboarding(state);
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
                errorMessages: errorMessages
            });
        }
    };
    
    const body = (
        <div className="flex flex-col w-full px-4 font-semibold ">
            <p className="text-lg text-nebula-grey-600 mb-4">Hello,</p>
            <p className="text-3xl">{props.user.githubName}</p>
            <p className="text-lg text-nebula-grey-600 mt-2">Before we get
              started, we’d like get to know you a little better.</p>

            <label className="mt-10">Your Full Name</label>
            <TextInput id="name" placeholder="Full Name" onChange={onInputChangeHandler} value={state.name} />
            {state.errorMessages.nameErr ? <div className = "mt-2 text-nebula-red" >{state.errorMessages.nameErr}</div> : ""}

            <label className="mt-10">Your position in company</label>
            <TextInput id="position" placeholder="Position" onChange={onInputChangeHandler} value={state.position} />
            {state.errorMessages.positionErr ? <div className = "mt-2 text-nebula-red" >{state.errorMessages.positionErr}</div> : ""}

            <label className="mt-10">Your department</label>
            <TextInput id="department" placeholder="Department" onChange={onInputChangeHandler} value={state.department} />
            {state.errorMessages.departmentErr ? <div className = "mt-2 text-nebula-red" >{state.errorMessages.departmentErr}</div> : ""}

            <label className="mt-10">Email</label>
            <TextInput id="email" placeholder="Email" onChange={onInputChangeHandler} value={state.email}/>
            {state.errorMessages.emailErr ? <div className = "mt-2 text-nebula-red" >{state.errorMessages.emailErr}</div> : ""}

            <label className="mt-10">Contact</label>
            <TextInput id="contact" placeholder="Slack ID, Microsoft Teams..." onChange={onInputChangeHandler} value={state.contact} />
            {state.errorMessages.contactErr ? <div className = "mt-2 text-nebula-red" >{state.errorMessages.contactErr}</div> : ""}

            <label className="mt-10">Bio</label>
            <TextInput id="bio" placeholder="Bio" onChange={onInputChangeHandler} value={state.bio} />
            {state.errorMessages.bioErr ? <div className = "mt-2 text-nebula-red" >{state.errorMessages.bioErr}</div> : ""}

            <label className="mt-10">Skills & areas of interest</label>
            <SearchTagsInput id="skills" getTagList = {getTagList} placeholder="Type and press enter to add skills"/>
            {state.errorMessages.skillsErr ? <div className = "mt-2 text-nebula-red" >{state.errorMessages.skillsErr}</div> : ""}

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