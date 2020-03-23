import React, { Component } from "react";
import Navbar from "../../Navigation/Navbar";
import Button from "../../Common/Button/Button";
import { profileData } from "../../../../assets/placeholder";
import TextInput from "../../Common/InputFields/TextInput";
import TextAreaInput from "../../Common/InputFields/TextAreaInput";
import SearchTagsInput from "../../Common/InputFields/SearchTagsInput";

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: profileData.name,
            position: profileData.position,
            bio: profileData.bio,
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePositionChange = this.handlePositionChange.bind(this);
        this.handleBioChange = this.handleBioChange.bind(this);
    }

    handleNameChange(event) {
        this.setState({
            name: event.target.value,
        });
    }

    handlePositionChange(event) {
        this.setState({
            position: event.target.value,
        });
    }

    handleBioChange(event) {
        this.setState({
            bio: event.target.value,
        });
    }
    


    render() {
        return ( 
            <div className="px-4 lg:px-10 container mx-auto">
                <Navbar />
                <div className="flex flex-row">
                    <h1 className="text-2xl">Edit Profile</h1>
                </div>
                <div className="mx-auto max-w-screen-md flex flex-col justify-center">
                
                    <div className="mx-auto w-full">
                        <div className="flex flex-row items-center mt-16 mb-4 justify-center">
                            <img src="../assets/images/profile.png" className="flex-0 h-24 w-24 rounded-full" />
                            <div className="flex flex-wrap">
                                <Button label="Upload New Photo" type="primary" className="mx-4 my-2"></Button>
                                <Button label="Delete Photo" type="error" className="mx-4 my-2"></Button>
                            </div>
                        </div>
                        <div className="flex flex-col mt-8">
                            <TextInput
                                label="Full Name"
                                placeholder="Full Name"
                                value={this.state.name}
                                onChange={this.handleNameChange}
                            />
                            <TextInput
                                label="Position"
                                placeholder="Position"
                                value={this.state.position}
                                onChange={this.handlePositionChange}
                            />
                            <TextAreaInput
                                cols="10"
                                label="Bio"
                                placeholder="Bio"
                                value={this.state.bio}
                                onChange = {this.handleBioChange}
                            />
                            <SearchTagsInput
                                label="Skills"
                                className="mt-8"
                                placeholder="Type and press Enter to add skills"
                                initialList={profileData.skills}
                            />
                            <hr className="mt-12 mb-4" />
                            <div className="flex flex-row flex-wrap mb-20">
                                <Button label="Save changes" type="primary" className="mx-2"/>
                                <Button label="Discard changes" type="secondary" className="mx-2"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default EditProfile;