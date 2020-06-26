import React, { useState, useContext } from "react";
import SplitContainerWithImage from "../../Containers/SplitContainerWithImage";
import TextInput from "../../Common/InputFields/TextInput";
import Button from "../../Common/Button/Button";
import { withRouter } from "react-router";
import { validateOnboarding } from "./ValidateForm";
import { useSkills } from "../../../hooks/useSkills/hook";
import { useMutation } from "@apollo/client";
import { UPDATE_USER_PROFILE } from "../../../mutations";
import { SkillsInput } from "../../Common/InputFields/SkillsInput";
import LoadingIndicator from "../../Common/LoadingIndicator/LoadingIndicator";
import { AuthenticationContext } from "../../../hooks/useAuthentication/provider";

const OnboardingPage = (props) => {

    //TODO : Use useAuthentication hook to prefil the user information
    const { user, refetchProfile } = useContext(AuthenticationContext);
    const { skills, addSkill, removeSkill } = useSkills([]);
    const form = {
        name: user.name ? user.name : "",
        position: "",
        bio: "",
        department: "",
        contact: "",
        email: user.email ? user.email : "",
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
    const [updateUserMutation, { loading, error }] = useMutation(UPDATE_USER_PROFILE, {
        onCompleted: (res) => {
            refetchProfile();
        }
    });
    if (loading) return <LoadingIndicator />;
    if (error) return <div>Error occured</div>;

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

    const validateAndSubmitForm = () => {
        const [isValid, errorMessages] = validateOnboarding(state, skills);
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
                        skills: skills,
                    }
                },
            }
            );
        }
        else {
            setState({
                ...state,
                errorMessages: errorMessages
            });
        }
    };

    const body = (
        <div className=" w-full h-full max-w-screen-md  pt-12 px-10 font-semibold">
            <div className="flex h-full flex-col">
                <div className="flex-1">
                    <div>
                        <p className="text-lg text-nebula-grey-600 mb-4">Hello,</p>
                        <p className="text-3xl">{user.githubName}</p>
                        <p className="text-lg text-nebula-grey-600 mt-2 mb-8">Before we get
            started, we&apos;d like get to know you a little better.</p>
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
                    <SkillsInput
                        skills={skills}
                        addSkill={addSkill}
                        removeSkill={removeSkill}
                        label="Skills & areas of interest"
                        placeholder="Type and press enter to add skills"
                    />
                    {state.errorMessages.skillsErr ? <div className="mt-2 text-nebula-red" >{state.errorMessages.skillsErr}</div> : ""}
                    <div className="mt-8" />
                </div>
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


export default (withRouter(OnboardingPage));
