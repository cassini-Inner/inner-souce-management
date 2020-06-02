import React, { useContext } from "react";
import Navbar from "../../Navigation/Navbar/Navbar";
import Button from "../../Common/Button/Button";
import Card from "../../Common/Card/Card";
import { profileData } from "../../../assets/placeholder";
import { GitHub } from "react-feather";
import LabelChipBuilder from "../../Common/Chips/LabelChipBuilder";
import InfoTag from "../../Common/InfoTag/InfoTag";
import { Link, useParams, Redirect } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_USER_PROFILE } from "../../../queries";
import LoadingIndicator from "../../Common/LoadingIndicator/LoadingIndicator";
import { AuthenticationContext } from "../../../hooks/useAuthentication/provider";
import { useSkills } from "../../../hooks/useSkills/hook";
import JobsBackup from "../JobsBackup/JobsBackup";

const Profile = (props) => {
    //To get the user id from url
    const { id } = useParams();
    const userId = id;

    const { user } = useContext(AuthenticationContext);
    const { loading, error, data } = useQuery(GET_USER_PROFILE, {
        variables: { userId: userId }, onCompleted: (data) => {
        }
    });
    if (loading) return <LoadingIndicator />;
    else if (error) alert(`Error! ${error.message}`);

    const userSkills = data["User"].skills ? data.User.skills.map((skill) => skill.value) : [];
    return (
        <div className="px-4 lg:px-10 container mx-auto">
            <Navbar />
            <div className="flex flex-row mt-8 mb-4 justify-between">
                <h1 className="text-2xl">Profile</h1>
                {
                    userId == user.id
                        ?
                        <Link to="/profile/edit">
                            <Button type="primary" label="Edit Profile" />
                        </Link>
                        :
                        ""
                }
            </div>
            <Card key={data["User"].id}>
                <div className="flex p-4">
                    <img src={data["User"].photoUrl} className="flex-0 h-24 w-24 rounded-full" />
                    <div className="flex flex-col mx-8 my-6  max-w-screen-md">
                        <h2 className="text-2xl font-semibold leading-tight">{data["User"].name}</h2>
                        <h2 className="text-lg text-nebula-grey-700 font-semibold leading-tight">{data["User"].role}</h2>

                        <div className="mt-8 mb-4 flex">
                            <GitHub />
                            <p className="font-semibold ml-4">
                                {data["User"].githubUrl}
                            </p>
                        </div>
                        <hr className="my-4" />
                        <div className="mt-2">
                            <p className="font-semibold ">Bio</p>
                            <p className="text-sm text-nebula-grey-700">
                                {data["User"].bio}
                            </p>
                        </div>
                        <div className="mt-2">
                            <p className="font-semibold ">Department</p>
                            <p className="text-sm text-nebula-grey-700">
                                {data["User"].department}
                            </p>
                        </div>
                        <div className="mt-2">
                            <p className="font-semibold ">Email</p>
                            <p className="text-sm text-nebula-grey-700">
                                {data["User"].email}
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
                            <LabelChipBuilder labels={userSkills} />
                        </div>
                        <div className="mt-4">
                            <p className="font-semibold mb-4 ">Job Stats</p>
                            <div className="flex flex-row">
                                <InfoTag className="mr-4" title="Jobs completed" data={profileData.jobStats.completed + " Jobs"}></InfoTag>
                                <InfoTag title="Ongoing Jobs" data={profileData.jobStats.ongoing + " Ongoing"}></InfoTag>
                            </div>
                        </div>
                        { 
                            userId == user.id 
                            ?
                            <div className="mt-8">
                                <JobsBackup />
                            </div>
                            : ""
                        }
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default (Profile);
