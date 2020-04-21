import React from "react";
import { Link } from "react-router-dom";
import StatusTags from "../Common/StatusTags/StatusTags";
import AuthorInfo from "../Common/AuthorInfo/AuthorInfo";

const OngoingJobCard = (props) => {
    return (
        <div className={"bg-white rounded-lg p-6 border border-nebula-grey-400 select-text cursor-pointer transition duration-300 shadow-none hover:shadow-lg  " + props.className} key={props.job.title}>
            <Link to="/jobDetails" >
                <div className="flex flex-col h-full  flex-1 justify-between">
                    <div className="">
                        <h2 className="text-sm font-semibold font-normal mb-4">{props.job.job.title}</h2>
                        <StatusTags statusTag={["ongoing"]} />
                    </div>
                    <div className="flex">
                        <div className="w-1/2 mt-4">
                            <p className="text-nebula-grey-600 text-xs font-semibold pb-0 tracking-widest">JOB PROGRESS</p>
                            <h1 className="text-lg font-semibold">{"33" + "%"}</h1> 
                            {/* (props.job.job.completedMilestones / props.job.job.noMilestones * 100) */}
                            <p className="text-nebula-grey-600 text-sm ">{"1" + " of " + props.job.job.milestones.totalCount + " milestones"}</p>
                        </div>
                        <div className="w-1/2 mt-4">
                            <p className="text-nebula-grey-600 text-xs font-semibold pb-0 tracking-widest">POSTED BY</p>
                            <AuthorInfo 
                                className="mt-8" 
                                iconClass="w-12 h-12" 
                                department = { props.job.job.createdBy.department} 
                                name = { props.job.job.createdBy.name} 
                                img = { props.job.job.createdBy.photoUrl}
                            />
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default OngoingJobCard;
