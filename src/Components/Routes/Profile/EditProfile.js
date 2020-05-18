import React, { useState, useContext } from "react";
import Navbar from "../../Navigation/Navbar/Navbar";
import Button from "../../Common/Button/Button";
import TextInput from "../../Common/InputFields/TextInput";
import TextAreaInput from "../../Common/InputFields/TextAreaInput";
import SearchTagsInput from "../../Common/InputFields/SearchTagsInput";
import { UPDATE_USER_PROFILE } from "../../../mutations";
import { GET_USER_PROFILE } from "../../../queries";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { Query } from "react-apollo";
import { useMutation } from "@apollo/client";
import { validateProfileUpdate } from "./ValidateForm";
import LoadingIndicator from "../../Common/LoadingIndicator/LoadingIndicator";
import { AuthenticationContext } from "../../../hooks/useAuthentication/provider";
import { useSkills } from "../../../hooks/useSkills/hook";
import { SkillsInput } from "../../Common/InputFields/SkillsInput";
const EditProfile = (props) => {
    const { user } = useContext(AuthenticationContext);
    return (
        <Query query={GET_USER_PROFILE} variables={{ userId: user.id }}>
            {({ loading, error, data }) => {
                if (loading) {
                    return <LoadingIndicator />;
                } else if (error) alert(`Error! ${error.message}`);
                return (
                    <EditProfileBody data={data} {...props} />
                );
            }}
        </Query>
    );
};

const EditProfileBody = (props) => {
    const userData = props.data["User"];
    const initialState = {
        id: userData.id,
        name: userData.name,
        position: userData.role,
        department: userData.department,
        bio: userData.bio,
        contact: userData.contact,
        email: userData.email,
        photoUrl: userData.photoUrl,
        errMsg: "",
    };

    const [updateUserMutation, { loading, error }] = useMutation(
        UPDATE_USER_PROFILE, {
            refetchQueries: [
                {
                    query: GET_USER_PROFILE,
                    variables: { userId: userData.id },
                },
            ],
        });

    const [state, setState] = useState(initialState);

    const { skills, addSkill, removeSkill } = useSkills(userData.skills ? userData.skills.map((skill) => skill.value) : []);

    console.log("skells", skills);
    const onInputChangeHandler = (event) => {
        const value = event.currentTarget.value;
        switch (event.currentTarget.id) {
        case "name":
            setState({
                ...state,
                name: value,
            });
            break;
        case "email":
            setState({
                ...state,
                email: value,
            });
            break;
        case "bio":
            setState({
                ...state,
                bio: value,
            });
            break;
        case "position":
            setState({
                ...state,
                position: value,
            });
            break;
        case "department":
            setState({
                ...state,
                department: value,
            });
            break;
        case "contact":
            setState({
                ...state,
                contact: value,
            });
            break;
        }
    };
    const updateProfile = () => {
        let isValid = validateProfileUpdate({ ...state, skills: skills });
        if (isValid) {
            updateUserMutation({
                variables: {
                    userInput: {
                        name: state.name,
                        email: state.email,
                        bio: state.bio,
                        role: state.position,
                        department: state.department,
                        contact: state.contact,
                        skills: skills,
                    },
                },
            },
            ).then(res => {
                props.history.push("/profile/" + parseInt(state.id));
            }, //Navigate to profile page on success
            err => {
                // console.log(err);
            },
            );
            setState({
                ...state,
                errMsg: "",
            });

        } else {
            setState({
                ...state,
                errMsg: "Please enter valid values in all fields!",
            });
        }
    };

    if (loading) return <LoadingIndicator />;
    if (error) return <p>Error! {error}</p>;

    return (
        <div className=" ">
            <div className="container mx-auto">
                <Navbar />
                <div
                    className="mx-auto max-w-screen-md flex flex-col justify-center">
                    <div className="flex flex-row">
                        <h1 className="text-2xl">Edit Profile</h1>
                    </div>

                    <div className="mx-auto w-full  min-h-screen ">
                        <div
                            className="flex flex-row items-center mt-16 mb-4 justify-center">
                            <img src={state.photoUrl}
                                className="flex-0 h-24 w-24 rounded-full" />
                        </div>
                        <div className="flex flex-col mt-8">
                            <TextInput
                                id="name"
                                label="Full Name"
                                placeholder="Full Name"
                                value={state.name}
                                onChange={onInputChangeHandler}
                            />
                            <TextInput
                                id="position"
                                label="Position"
                                placeholder="Position"
                                value={state.position}
                                onChange={onInputChangeHandler}
                            />
                            <TextInput
                                id="department"
                                label="Department"
                                placeholder="Department"
                                value={state.department}
                                onChange={onInputChangeHandler}
                            />
                            <TextInput
                                id="email"
                                label="Email"
                                placeholder="email"
                                value={state.email}
                                onChange={onInputChangeHandler}
                            />
                            <TextInput
                                id="contact"
                                label="Contact"
                                placeholder="Email, Slack ID..."
                                value={state.contact}
                                onChange={onInputChangeHandler}
                            />
                            <TextAreaInput
                                id="bio"
                                cols="10"
                                label="Bio"
                                placeholder="Bio"
                                value={state.bio}
                                onChange={onInputChangeHandler}
                            />
                            {/* <SearchTagsInput
                                id="skills"
                                label="Skills"
                                className="mt-8"
                                placeholder="Type and press Enter to add skills"
                                initialList={state.skills}
                                getTagList={getTagList}
                            /> */}
                            <SkillsInput skills={skills} addSkill={addSkill} removeSkill={removeSkill}></SkillsInput>
                            {
                                state.errMsg ?
                                    <div
                                        className="m-2 text-nebula-red">{state.errMsg}</div>
                                    : ""
                            }

                        </div>
                    </div>
                </div>
            </div>
            <div
                className="flex sticky bottom-0 flex-row flex-wrap bg-white py-4 border-t border-nebula-grey-400 ">
                <div className="max-w-screen-md w-full mx-auto">
                    <Button label="Save changes" type="primary"
                        className="mx-2" onClick={updateProfile} />
                    <Button label="Discard changes" type="secondary"
                        className="mx-2"
                        onClick={() => props.history.goBack()} />
                </div>
            </div>
        </div>
    );
};

export default (EditProfile);
