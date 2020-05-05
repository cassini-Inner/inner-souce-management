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
    // if(props.user.onboarded) {
    //     return <Redirect to="/"/>;
    // }

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
    const [state, setState] = useState(form);

    // For update user mutation 
    const [updateUserMutation, { loading, error }] = useMutation(UPDATE_USER_PROFILE);
    if (loading) return <LoadingIndicator />;
    if (error) return <p>Error! {error}</p>;

    const onInputChangeHandler = (event) => {
        const value = event.currentTarget.value;
        const field = event.currentTarget.id;
        setState({
            ...state,
            [field]: value,
            errorMessages: {
                ...state.errorMessages,
                [field + "Err"]: ""
            }
        });
    };

    const getTagList = (skillList) => {
        setState({
            ...state,
            skills: skillList,
            errorMessages: {
                ...state.errorMessages,
                skillsErr: ""
            }
        }
        );
    };

    const validateAndSubmitForm = () => {
        const [isValid, errorMessages] = validateOnboarding(state);
        if (isValid) {
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
        <div className=" w-full px-4 py-8  font-semibold ">
            <div className="flex flex-col">
                <div>
                    <p className="text-lg text-nebula-grey-600 mb-4">Hello,</p>
                    <p className="text-3xl">{Cookies.get("githubName")}</p>
                    <p className="text-lg text-nebula-grey-600 mt-2">Before we get
              started, we’d like get to know you a little better.</p>
                </div>
                <div>
                    <TextInput id="name" label="Your Full Name" placeholder="Full Name" onChange={onInputChangeHandler} value={state.name} />
                    {state.errorMessages.nameErr ? <div className="mt-2 text-nebula-red" >{state.errorMessages.nameErr}</div> : ""}

                </div>

                <TextInput id="position" label="Your position in company" placeholder="Position" onChange={onInputChangeHandler} value={state.position} />
                {state.errorMessages.positionErr ? <div className="mt-2 text-nebula-red" >{state.errorMessages.positionErr}</div> : ""}

                <TextInput id="department" label="Your department" placeholder="Department" onChange={onInputChangeHandler} value={state.department} />
                {state.errorMessages.departmentErr ? <div className="mt-2 text-nebula-red" >{state.errorMessages.departmentErr}</div> : ""}

                <TextInput id="email" label="Email" placeholder="Email" onChange={onInputChangeHandler} value={state.email} />
                {state.errorMessages.emailErr ? <div className="mt-2 text-nebula-red" >{state.errorMessages.emailErr}</div> : ""}

                <TextInput id="contact" label="Contact" placeholder="Slack ID, Microsoft Teams..." onChange={onInputChangeHandler} value={state.contact} />
                {state.errorMessages.contactErr ? <div className="mt-2 text-nebula-red" >{state.errorMessages.contactErr}</div> : ""}

                <TextInput id="bio" label="Bio" placeholder="Bio" onChange={onInputChangeHandler} value={state.bio} />
                {state.errorMessages.bioErr ? <div className="mt-2 text-nebula-red" >{state.errorMessages.bioErr}</div> : ""}

                <label className="mt-8 text-sm">Skills & areas of interest</label>
                <SearchTagsInput id="skills" getTagList={getTagList} placeholder="Type and press enter to add skills" />
                {state.errorMessages.skillsErr ? <div className="mt-2 text-nebula-red" >{state.errorMessages.skillsErr}</div> : ""}
                <div className="mt-8" />
                <div className="sticky bottom-0 w-full bg-white py-4 border-t border-nebula-grey-400">
                    <Button label="Let's go!" type="primary" className="" onClick={validateAndSubmitForm} />
                </div>
            </div>
        </div>
    );

    return (
        <SplitContainerWithImage body={body} />
    );
};

const mapStateToProps = state => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps)(withRouter(OnboardingPage));