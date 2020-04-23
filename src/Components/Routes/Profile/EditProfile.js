import React, { useState } from "react";
import Navbar from "../../Navigation/Navbar";
import Button from "../../Common/Button/Button";
import TextInput from "../../Common/InputFields/TextInput";
import TextAreaInput from "../../Common/InputFields/TextAreaInput";
import SearchTagsInput from "../../Common/InputFields/SearchTagsInput";
import { GET_USER_PROFILE } from "../../../queries";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { Query } from 'react-apollo';


const EditProfile = (props) => {
    return(
        <Query query={GET_USER_PROFILE} variables= {{userId: props.user.id}}>
            {({ loading, error, data }) => {
                if (loading) return "Loading...";
                else if (error) alert(`Error! ${error.message}`);
                return (
                <EditProfileBody data = {data} {...props} />
                )
            }}
        </Query>
    );
}

const EditProfileBody = (props) => {

    const initialState = {
        name: props.data["User"].name,
        id: props.data["User"].id,
        position: props.data["User"].role,
        bio: props.data["User"].bio,
        contact: props.data["User"].contact,
        email: props.data["User"].email,
        photoUrl: props.data["User"].photoUrl,
        skills: props.data["User"].skills.map((skill, key) => skill.value),
    };

    const [ state, setState ] = useState(initialState);
    // handleNameChange = handleNameChange.bind(;
    // handlePositionChange = handlePositionChange.bind(;
    // handleBioChange = handleBioChange.bind(;

    const handleNameChange = (event) => {
        setState({
            ...state,
            name: event.target.value,
        });
    }

    const handlePositionChange = (event) => {
        setState({
            ...state,
            position: event.target.value,
        });
    }

    const handleBioChange = (event) => {
        setState({
            ...state,
            bio: event.target.value,
        });
    }

    const handleContactChange = (event) => {
        setState({
            ...state,
            contact: event.target.value,
        });
    }


    return (
            <div className="px-4 lg:px-10 container mx-auto">
                <Navbar />
                <div className="flex flex-row">
                    <h1 className="text-2xl">Edit Profile</h1>
                </div>
                <div className="mx-auto max-w-screen-md flex flex-col justify-center">
                
                    <div className="mx-auto w-full">
                        <div className="flex flex-row items-center mt-16 mb-4 justify-center">
                            <img src={state.photoUrl} className="flex-0 h-24 w-24 rounded-full" />
                        </div>
                        <div className="flex flex-col mt-8">
                            <TextInput
                                label="Full Name"
                                placeholder="Full Name"
                                value={state.name}
                                onChange={handleNameChange}
                            />
                            <TextInput
                                label="Position"
                                placeholder="Position"
                                value={state.position}
                                onChange={handlePositionChange}
                            />
                            <TextInput
                                label="Contact"
                                placeholder="Email, Slack ID..."
                                value={state.contact}
                                onChange={handleContactChange}
                            />
                            <TextAreaInput
                                cols="10"
                                label="Bio"
                                placeholder="Bio"
                                value={state.bio}
                                onChange = {handleBioChange}
                            />
                            <SearchTagsInput
                                label="Skills"
                                className="mt-8"
                                placeholder="Type and press Enter to add skills"
                                initialList={ state.skills }
                            />
                            <hr className="mt-12 mb-4" />
                            <div className="flex flex-row flex-wrap mb-20">
                                <Button label="Save changes" type="primary" className="mx-2"/>
                                <Button label="Discard changes" type="secondary" className="mx-2" onClick={() =>props.history.goBack()}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(withRouter(EditProfile));