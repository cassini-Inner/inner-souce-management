import React from "react";
import { withRouter } from "react-router-dom";
import StatusTags from "../../Common/StatusTags/StatusTags";
import AuthorInfo from "../../Common/AuthorInfo/AuthorInfo";
import InfoTag from "../../Common/InfoTag/InfoTag";
import { getDuration } from "../../../HelperFunctions/DurationParser";

const JobInformation = ({ jobData }) => {
    //To get the duration of the job by summing the duration of milestones
    return (
        <React.Fragment>
            <div className="mt-8">
                <StatusTags statusTag={[jobData.status.toLowerCase()]}/>
            </div>
            <div className="mt-8">
                <h1 className="text-xl font-semibold leading-snug">
                    {jobData.title}
                </h1>
            </div>
            <div className="mt-2 mb-8">
                <p className="text-md text-nebula-grey-700 leading-relaxed">
                    {jobData.description}
                </p>
            </div>
            <div className="flex flex-wrap mb-4">
                <div className="mr-8 mb-4 ">
                    <InfoTag title="MILESTONES"
                        data={jobData["milestones"].totalCount +
                           " Milestones"}/>
                </div>
                <div className="mr-4 mb-4 ">
                    <InfoTag title="DIFFICULTY" data={jobData.difficulty}/>
                </div>
                <div className="mr-4 mb-4 ">
                    <InfoTag title="DURATION" data={getDuration(
                        jobData["milestones"]["milestones"])}/>
                </div>
                <div className="mr-4 mb-4 ">
                    <InfoTag title="CREATED ON" data={new Date(
                        jobData.timeCreated).toDateString()}/>
                </div>
                <div className="mr-4 mb-4 ">
                    <InfoTag title="WORKING"
                        data={jobData["applications"]["acceptedCount"] +
                           (jobData["applications"]["acceptedCount"] > 1
                               ? " users"
                               : " user")}/>
                </div>
                <div className="mr-4 mb-4 ">
                    <InfoTag title="SKILLS NEEDED"
                        data={jobData["skills"].map(
                            (skill, index) => skill.value + " ")}/>
                </div>
            </div>
            <AuthorInfo
                className="mt-4 pb-8"
                iconClass="w-12 h-12"
                redirectUrl={jobData.createdBy.id}
                department={jobData.createdBy.department}
                name={jobData.createdBy.name}
                img={jobData.createdBy.photoUrl}
            />
        </React.Fragment>
    );
};

export default withRouter(JobInformation);
