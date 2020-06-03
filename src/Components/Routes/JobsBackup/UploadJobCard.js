import InfoTag from "../../Common/InfoTag/InfoTag";
import React from "react";
import { getDuration } from "../../../HelperFunctions/DurationParser";
import { Square, CheckSquare } from "react-feather";

const UploadJobCard = (props) => {
    return (
        <div className="w-full bg-white mt-4 rounded-lg transition duration-300 shadow-none cursor-pointer border border-nebula-grey-400"
            key={props.data.id}
            >
            {
                props.isSelected ?
                    <div className="flex text-nebula-blue items-center m-2">
                        <p className="hover:text-black" id={props.data.id} onClick={props.toggleSelectJob}><CheckSquare /></p>
                        <p className="ml-3">Selected</p>
                    </div>
                    :
                    <div className="flex items-center m-2">
                        <p className="hover:text-nebula-blue" id={props.data.id} onClick={props.toggleSelectJob}><Square /></p>
                        <p className="ml-3">Select</p>
                    </div>
            }
            <hr />
            <div className="p-6" >
                <h1 className="text-base font-semibold">{props.data.title}</h1>
                <div
                    className="mt-2 text-sm leading-relaxed text-nebula-grey-700 mb-6">
                    {props.data.desc}
                </div>
                <div className="flex flex-wrap items-center my-4">
                    <div
                        className="flex flex-1 flex-wrap justify-evenly items-center md:justify-start">
                        <div
                            className="flex flex-1 flex-col md:flex-row md:flex-initial">
                            <div className="mr-6">
                                <InfoTag title="MILESTONES"
                                    data={props.data.milestones.totalCount +
                                        " Milestones"} />
                            </div>
                            <div className="mr-6 md:mt-0">
                                <InfoTag title="DIFFICULTY"
                                    data={props.data.difficulty} />
                            </div>
                        </div>
                        <div
                            className="flex flex-1 flex-col md:flex-row md:flex-initial">
                            <div className="mr-6">
                                <InfoTag title="DURATION" data={getDuration(
                                    props.data["milestones"]["milestones"])} />
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div
                    className="flex flex-col flex-wrap mt-4 justify-left md:flex-row">
                    <div className="py-4 md:py-0">
                        <p className="cursor-pointer text-sm font-semibold text-nebula-blue hover:text-blue-700" data-id={props.data.id} onClick={props.openMilestoneModal}>
                            View Milestones
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadJobCard;
