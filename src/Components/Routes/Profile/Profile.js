import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { GitHub } from "react-feather";

import { useQuery } from "@apollo/client";
import Button from "../../Common/Button/Button";
import Card from "../../Common/Card/Card";
import LabelChipBuilder from "../../Common/Chips/LabelChipBuilder";
import { GET_USER_PROFILE } from "../../../queries";
import LoadingIndicator from "../../Common/LoadingIndicator/LoadingIndicator";
import { AuthenticationContext } from "../../../hooks/useAuthentication/provider";
import JobsBackup from "../JobsBackup/JobsBackup";
import Navbar from "../../Navigation/Navbar/Navbar";
import { JobReview } from "../../Ratings/job_review";
import NoReviewsPlaceholder from "../../../assets/images/reviews.svg";
import Placeholder from "../../Placeholders/placeholder";
import { RatingDisplay } from "../../Ratings/RatingDisplay";

const Profile = (props) => {
    //To get the user id from url
    const { id } = useParams();
    const userId = id;

    const { user } = useContext(AuthenticationContext);
    const { loading, error, data } = useQuery(GET_USER_PROFILE, {
        variables: { userId: userId },
        onCompleted: (data) => {
        },
    });
    if (loading) {
        return <LoadingIndicator/>;
    } else if (error) alert(`Error! ${error.message}`);

    const userSkills = data["User"].skills ? data.User.skills.map(
        (skill) => skill.value) : [];
    return (
        <div className="px-4 lg:px-10 container mx-auto">
            <Navbar/>
            <div className="flex flex-row mt-8 mb-4 justify-between">
                <h1 className="text-2xl">Profile</h1>
                {
                    userId == user.id
                        ?
                        <Link to="/profile/edit">
                            <Button type="primary" label="Edit Profile"/>
                        </Link>
                        :
                        ""
                }
            </div>
            <Card key={data["User"].id}>
                <div className="flex flex-col md:flex-row p-4">
                    <img src={data["User"].photoUrl}
                        className="flex-0 h-24 w-24 rounded-full"/>
                    <div className="flex flex-col mx-8 my-6  max-w-screen-md">
                        <h2
                            className="text-2xl font-semibold leading-tight">{data["User"].name}</h2>
                        <h2
                            className="text-lg text-nebula-grey-700 font-semibold leading-tight">{data["User"].role}</h2>

                        <div className="mt-8 mb-4 flex">
                            <GitHub/>
                            <a href={data["User"].githubUrl} target="_blank"
                                className="font-semibold ml-4 whitespace-normal w-full">
                                {data["User"].githubUrl}
                            </a>
                        </div>
                        <hr className="my-4"/>
                        <div className="mt-2">
                            <p className="font-semibold ">Bio</p>
                            <p className="text-sm text-nebula-grey-700 break-all">
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
                            <LabelChipBuilder labels={userSkills}/>
                        </div>
                        {/*<div className="mt-4">*/}
                        {/*    <p className="font-semibold mb-4 ">Job Stats</p>*/}
                        {/*    /!*TODO: Implement*!/*/}
                        {/*    /!*<div className="flex flex-row">*!/*/}
                        {/*    /!*    <InfoTag className="mr-4" title="Jobs completed"*!/*/}
                        {/*    /!*        data={profileData.jobStats.completed +*!/*/}
                        {/*    /!*           " Jobs"}*!/*/}
                        {/*    /!*    />*!/*/}
                        {/*    /!*    <InfoTag title="Ongoing Jobs"*!/*/}
                        {/*    /!*        data={profileData.jobStats.ongoing +*!/*/}
                        {/*    /!*           " Ongoing"}*!/*/}
                        {/*    /!*    />*!/*/}
                        {/*    /!*</div>*!/*/}
                        {/*</div>*/}
                        {
                            userId === user.id
                                ?
                                <div className="mt-8">
                                    <JobsBackup/>
                                </div>
                                : ""
                        }
                    </div>
                </div>
            </Card>
            {
                <UserReviews reviews={data.User.reviews}
                    overallRating={data.User.overallRating}/>
            }
        </div>
    );
};

export const UserReviews = ({ reviews, overallRating }) => {
    return (
        <div>
            <h2
                className="pt-12 pb-4 text-2xl text-nebula-grey-800"
            >
                Reviews
            </h2>
            {(reviews == null || reviews.length === 0) &&
          <Placeholder
              image={NoReviewsPlaceholder}
              heading="User doesn't have any reviews"
              body="Performance review from the jobs user has worked on will appear here."
          />
            }
            {(overallRating != null && reviews != null || reviews.length !== 0) &&
              <div className="grid grid-cols-12 gap-4">
                  <div className="flex flex-col space-y-2 col-span-3 border border-nebula-grey-400 rounded-lg mb-auto mt-2 p-6">
                      <p className="text-base font-semibold text-nebula-grey-700">Overall Rating</p>
                      <RatingDisplay rating={overallRating} expanded={false} condensed={false}/>
                  </div>
                  <div className="col-span-9">
                      {
                          reviews.map((review, key) => {
                              return <JobReview key={key} review={review}/>;
                          })
                      }
                  </div>
              </div>
            }
        </div>
    );
};

export default (Profile);
