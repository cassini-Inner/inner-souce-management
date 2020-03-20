import React from "react";
import { Link } from "react-router-dom";
import StatusTags from "../Common/StatusTags/StatusTags";
import AuthorInfo from "../Common/AuthorInfo/AuthorInfo";

const OngoingJobCard = (props) => {

    return (
        <div className={"bg-white p-6 border border-nebula-grey-400 select-text cursor-pointer transition duration-300 shadow-none hover:shadow-lg  " + props.className} key={props.job.title}>
            <Link to="/jobDetails" >
                <div className="flex flex-col h-full  flex-1 justify-between">
                    <div className="">
                        <h2 className="text-base font-semibold mb-4">{props.job.title}</h2>
                        <StatusTags statusTag={["ongoing"]} />
                    </div>
                    <div className="flex">
                        <div className="w-1/2 mt-8">
                            <p className="text-nebula-grey-600 text-xs font-semibold pb-0 tracking-widest">JOB PROGRESS</p>
                            <h1 className="text-lg font-semibold">{(props.job.completedMilestones / props.job.noMilestones * 100) + "%"}</h1>
                            <p className="text-nebula-grey-600 text-sm ">{props.job.completedMilestones + " of " + props.job.noMilestones + " milestones"}</p>
                        </div>
                        <div className="w-1/2 mt-8">
                            <p className="text-nebula-grey-600 text-xs font-semibold pb-0 tracking-widest">POSTED BY</p>
                            <AuthorInfo />
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default OngoingJobCard;
