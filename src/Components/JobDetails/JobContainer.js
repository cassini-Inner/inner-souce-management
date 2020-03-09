import React, { Fragment } from "react";
import { BackIcon } from "../Icons";
import { StatusTag, AuthorInfo } from "../CommonComponents";
import { exploreJobs, milestones } from "../../../assets/placeholder";
import { Button } from "../CommonComponents";
import MilestoneCard from "./MilestoneCard";

const JobDetails = (props) => {
    const goBack = props => {
        //go to previous page
    }
    return (
        <div className="bg-white lg:flex-row lg:max-w-screen-xl mx-auto ">
            <div className="md:flex">
                <div
                    className="bg-white flex-col flex md:sticky md:top-0 md:overflow-y-scroll  md:w-1/2 md:h-screen lg:h-screen lg:w-1/2 ">
                    <div className="px-5 py-5 flex-1 lg:px-10 lg:py-12">
                        <div className="cursor-default hover:text-nebula-blue" onClick={goBack}>
                            <div className="flex">
                                <BackIcon />
                                <p className="text-base pl-2 leading-snug">Back</p>
                            </div>
                        </div>
                        <div className="mt-8">
                            <StatusTag statusTag={exploreJobs[0].status} />
                        </div>
                        <div className="mt-8">
                            <h1 className="text-2xl leading-snug">
                                {exploreJobs[0].title}
                            </h1>
                        </div>
                        <div className="mt-4 mb-8">
                            <p className="text-normal opacity-75 leading-snug">
                                {exploreJobs[0].description}
                            </p>
                        </div>
                        <div className="flex flex-wrap">
                            <div className="mr-8 mb-4 ">
                                <div>
                                    <p className="leading-tight tracking-widest text-xs">
                                        MILESTONES
                                        </p>
                                </div>
                                <div>
                                    <p className="leading-tight font-semibold text-s mt-1">
                                        {exploreJobs[0].noMilestones + " Milestones"}
                                    </p>
                                </div>
                            </div>
                            <div className="mr-4 mb-4 ">
                                <div>
                                    <p className="leading-tight tracking-widest text-xs">
                                        DIFFICULTY
                                        </p>
                                </div>
                                <div>
                                    <p className="leading-tight font-semibold text-s mt-1">
                                        {exploreJobs[0].difficulty}
                                    </p>
                                </div>
                            </div>
                            <div className="mr-4 mb-4 ">
                                <div>
                                    <p className="leading-tight tracking-widest text-xs">
                                        DURATION
                                        </p>
                                </div>
                                <div>
                                    <p className="leading-tight font-semibold text-s mt-1">
                                        {exploreJobs[0].duration}
                                    </p>
                                </div>
                            </div>
                            <div className="mr-4 mb-4 ">
                                <div>
                                    <p className="leading-tight tracking-widest text-xs">
                                        SKILLS NEEDED
                                        </p>
                                </div>
                                <div>
                                    <p className="leading-tight font-semibold text-s mt-1">
                                        {exploreJobs[0].skills}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <AuthorInfo className="mt-8 mb-6" iconClass="w-12 h-12" date={exploreJobs[0].date} />
                    </div>
                    <div className="sticky bottom-0 bg-nebula-grey-100 px-6 py-6 flex justify-end">
                        <hr />
                        <Button type="secondary" label="Apply to Milestone" />
                        <div className="mx-2" />
                        <Button type="primary" label="Apply to Job" />
                    </div>
                </div>
                <div className="w-full lg:h-screen md:w-1/2 md:overflow-y-scroll bg-gray-200 lg:w-2/3 px-10 py-12">
                    <h2 className="text-2xl">Milestones</h2>
                    {
                        milestones.map(
                            (milestone, index) => {
                                return (
                                    <MilestoneCard milestone={milestone} isEditMode={isEditMode} index={index} />
                                );
                            }
                        )
                    }
                </div>
            </div>
        </div>
    );
}
export default JobDetails;