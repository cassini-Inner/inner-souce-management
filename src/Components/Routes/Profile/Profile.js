import React from "react";
import Navbar from "../../Navigation/Navbar";
import Button from "../../Common/Button/Button";
import Card from "../../Common/Card/Card";
import { profileData } from "../../../../assets/placeholder";
import {GitHub} from "react-feather";
import LabelChipBuilder from "../../Common/Chips/LabelChipBuilder";
import InfoTag from "../../Common/InfoTag/InfoTag"; 
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { GET_USER_PROFILE } from "../../../queries";
import { connect } from "react-redux";

const Profile = (props) => {
    const { loading, error, data } = useQuery(GET_USER_PROFILE, { variables: { userId: props.user.id } });
    if (loading) return "Loading...";
    else if (error) alert(`Error! ${error.message}`);

    return (
        <div className="px-4 lg:px-10 container mx-auto">
            <Navbar />
            <div className="flex flex-row mt-8 mb-4 justify-between">
                <h1 className="text-2xl">Profile</h1>
                <Link to="/profile/edit" exact>
                    <Button type="primary" label="Edit Profile"/>
                </Link>
            </div>
            <Card key={data["User"].id}>
                <div className="flex p-4">
                    <img src = {data["User"].photoUrl} className="flex-0 h-24 w-24 rounded-full" />
                    <div className="flex flex-col mx-8 my-6  max-w-screen-md">
                        <h2 className="text-2xl font-semibold leading-tight">{data["User"].name}</h2>
                        <h2 className="text-lg text-nebula-grey-700 font-semibold leading-tight">{data["User"].role}</h2>
                        
                        <div className="mt-8 mb-4 flex">
                            <GitHub />
                            <p className="font-semibold ml-4"> 
                                {data["User"].photoUrl}
                            </p>
                        </div>
                        <hr className="my-4"/>
                        <div className="mt-2">
                            <p className="font-semibold ">Bio</p>
                            <p className="text-sm text-nebula-grey-700"> 
                                {data["User"].bio}
                            </p>
                        </div>
                        <div className="mt-2">
                            <p className="font-semibold ">Contact</p>
                            <p className="text-sm text-nebula-grey-700"> 
                                {data["User"].contact}
                            </p>
                        </div>
                        <div className="mt-4">
                            <p className="font-semibold mb-4 ">Skills</p>
                            <LabelChipBuilder labels={data["User"].skills.map((skill, index) => skill.value)}/>
                        </div>
                        
                        <div className="mt-4">
                            <p className="font-semibold mb-4 ">Job Stats</p>
                            <div className="flex flex-row">
                                <InfoTag className="mr-4" title="Jobs completed" data={profileData.jobStats.completed + " Jobs"}></InfoTag>
                                <InfoTag title="Ongoing Jobs" data={profileData.jobStats.ongoing + " Ongoing"}></InfoTag>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        user: state
    }
}

export default connect(mapStateToProps)(Profile);