import React from "react";
import { exploreJobs } from "../../../../assets/placeholder";
import StatusTags from "../../Common/StatusTags/StatusTags";
import AuthorInfo from "../../Common/AuthorInfo/AuthorInfo";
import { useQuery } from "@apollo/react-hooks";
import { GET_JOB_DETAILS } from "../../../queries";
import  { getDuration } from "../../Common/DurationParser/DurationParser";

const JobInformation = (props) => {

    const { loading, error, data } = useQuery(GET_JOB_DETAILS, { variables: { jobId: "2" } });
    if (loading) return 'Loading...';
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
                    <div>
                        <p className="leading-tight tracking-widest text-xs text-nebula-grey-600 font-semibold">
                            MILESTONES
                        </p>
                    </div>
                    <div>
                        <p className="leading-tight font-semibold text-sm mt-1">
                            {data["Job"]["milestones"].totalCount + " Milestones"}
                        </p>
                    </div>
                </div>
                <div className="mr-4 mb-4 ">
                    <div>
                        <p className="leading-tight tracking-widest text-xs text-nebula-grey-600 font-semibold">DIFFICULTY</p>
                    </div>
                    <div>
                        <p className="leading-tight font-semibold text-sm mt-1">
                            {data["Job"].difficulty}
                        </p>
                    </div>
                </div>
                <div className="mr-4 mb-4 ">
                    <div>
                        <p className="leading-tight tracking-widest text-xs text-nebula-grey-600 font-semibold">
                            DURATION
                        </p>
                    </div>
                    <div>
                        <p className="leading-tight font-semibold text-sm mt-1">
                            { getDuration(data["Job"]["milestones"]["milestones"]) }
                        </p>
                    </div>
                </div>
                <div className="mr-4 mb-4 ">
                    <div>
                        <p className="leading-tight tracking-widest text-xs text-nebula-grey-600 font-semibold">
                            SKILLS NEEDED
                        </p>
                    </div>
                    <div>
                        <p className="leading-tight font-semibold text-sm mt-1">
                            {exploreJobs[0].skills}
                        </p>
                    </div>
                </div>
                <AuthorInfo 
                    className="mt-8" 
                    iconClass="w-12 h-12" 
                    date={data["Job"].timeCreated} 
                    department = {data["Job"].createdBy.department} 
                    name = {data["Job"].createdBy.name} 
                    img = {data["Job"].createdBy.photoUrl}
                />
            </div>
        </React.Fragment>
    );
};

export default JobInformation;
