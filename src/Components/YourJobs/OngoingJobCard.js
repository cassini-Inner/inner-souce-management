import React from 'react';
import { AuthorInfo, StatusTag } from '../CommonComponents';

const OngoingJobCard = (props) => {
    return (
        <div className={"bg-white p-6 flex border border-transparent hover:border-nebula-grey-400 select-text cursor-pointer  " + props.className} key={props.job.title}>
            <div className="flex flex-col flex-1">
                <div className="flex-1">
                    <h2 className="text-lg font-semibold mb-4">{props.job.title}</h2>
                    <StatusTag statusTag={["ongoing"]} />
                </div>
                <div className="flex">
                    <div className="w-1/2 mt-8">
                        <p className="text-nebula-grey-600 text-xs font-semibold pb-0">JOB PROGRESS</p>
                        <h1 className="text-lg font-semibold">{(props.job.completedMilestones / props.job.noMilestones * 100) + "%"}</h1>
                        <p className="text-nebula-grey-600 text-xs font-semibold">{props.job.completedMilestones + " of " + props.job.noMilestones + " milestones"}</p>
                    </div>
                    <div className="w-1/2 mt-8">
                        <p className="text-nebula-grey-600 text-xs font-semibold pb-0">POSTED BY</p>
                        <AuthorInfo />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OngoingJobCard;