import React from "react";
import { exploreJobs } from "../../../../assets/placeholder";
import StatusTags from "../../Common/StatusTags/StatusTags";
import AuthorInfo from "../../Common/AuthorInfo/AuthorInfo";
import { useQuery } from "@apollo/react-hooks";
import InfoTag from "../../Common/InfoTag/InfoTag";
import { GET_JOB_DETAILS } from "../../../queries";
import  { getDuration } from "../../Common/DurationParser/DurationParser";

const JobInformation = (props) => {

    const { loading, error, data } = useQuery(GET_JOB_DETAILS, { variables: { jobId: "2" } });
    if (loading) return "Loading...";
    else if (error) alert(`Error! ${error.message}`);

    //To get the duration of the job by summing the duration of milestones
    

    return (
        <React.Fragment>
            <div className="mt-8">
                <StatusTags statusTag={[data["Job"].status.toLowerCase()]} />
            </div>
            <div className="mt-8">
                <h1 className="text-xl leading-snug">
                    {data["Job"].title}
                </h1>
            </div>
            <div className="mt-6 mb-8">
                <p className="text-sm text-nebula-grey-700 leading-relaxed">
                    {data["Job"].description}
                </p>
            </div>
            <div className="flex flex-wrap mb-8">
                <div className="mr-8 mb-4 ">
                    <InfoTag title="MILESTONES" data={data["Job"]["milestones"].totalCount + " Milestones"}/>
                </div>
                <div className="mr-4 mb-4 ">
                    <InfoTag title="DIFFICULTY" data={data["Job"].difficulty}/>
                </div>
                <div className="mr-4 mb-4 ">
                    <InfoTag title="DURATION" data={getDuration(data["Job"]["milestones"]["milestones"])} />  
                </div>
                <div className="mr-4 mb-4 ">
                    <InfoTag title="SKILLS NEEDED" data={data["Job"]["skills"].map((skill, index) => skill.value + " ")} /> 
                </div>
                <div className="mr-4 mb-4 ">
                    <InfoTag title="CREATED ON" data={data["Job"].timeCreated.split("T")[0]} /> 
                </div>
                <AuthorInfo 
                    className="mt-8" 
                    iconClass="w-12 h-12" 
                    department = {data["Job"].createdBy.department} 
                    name = {data["Job"].createdBy.name} 
                    img = {data["Job"].createdBy.photoUrl}
                />
            </div>
        </React.Fragment>
    );
};

export default JobInformation;
