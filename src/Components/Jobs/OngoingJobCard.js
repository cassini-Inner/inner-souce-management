import React from "react";
import { Link } from "react-router-dom";
import StatusTags from "../Common/StatusTags/StatusTags";
import AuthorInfo from "../Common/AuthorInfo/AuthorInfo";

const OngoingJobCard = (props) => {
    const job = props.job;
    //ToDo change logic with allowing milestones to be applied 
    const completedMilestones = job.milestones.milestones.filter((milestone) => milestone.status.toUpperCase() === "COMPLETED").length;
    const totalMilestones = job.milestones.milestones.length;
    return (
        <div className={"bg-white rounded-lg p-6 border border-nebula-grey-400 select-text cursor-pointer transition duration-300 shadow-none hover:shadow-lg  " + props.className} key={job.id}>
            <Link to={"/jobDetails/" + job.id} >
                <div className="flex flex-col h-full  flex-1 justify-between">
                    <div className="">
                        <h2 className="text-base font-semibold font-normal mb-4">{job.title}</h2>
                        <StatusTags statusTag={["ongoing"]} />
                    </div>
                    <div className="grid grid-cols-2 mt-4">
                        <div className="col-span-1">

                            <p className="text-nebula-grey-600 text-xs font-semibold pb-0 tracking-widest">JOB PROGRESS</p>
                            <h1 className="text-lg font-semibold">{+(completedMilestones / totalMilestones * 100).toFixed(2) + " %"}</h1>
                            <h1 className="text-sm font-semibold text-nebula-grey-700">{completedMilestones + " of " + totalMilestones + " milestones"}</h1>
                        </div>
                        <div className="col-span-1">
                            <p className="text-nebula-grey-600 text-xs font-semibold pb-0 tracking-widest">POSTED BY</p>
                            <AuthorInfo
                                className=""
                                iconClass="w-8 h-8"
                                department={job.createdBy.department}
                                name={job.createdBy.name}
                                img={job.createdBy.photoUrl}
                            />
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default OngoingJobCard;
