import React, { useState } from "react";
import * as Icons from "react-feather";
import InfoTag from "../Common/InfoTag/InfoTag";
import StatusTags from "../Common/StatusTags/StatusTags";
import  { DurationParser } from "../../HelperFunctions/DurationParser"; 
import { TOGGLE_MILESTONE_COMPLETED } from "../../mutations";
import { useMutation } from "@apollo/client";
import { GET_MILESTONES } from "../../queries";
import LoadingIndicator from "../Common/LoadingIndicator/LoadingIndicator";

const MilestoneCard = (props) => {

    const initialState = {
        isExpanded: props.expanded,
    };
    const [state, setState] = useState(initialState);

    //Toggle milestone as completed
    const [toggleMilestoneMutation, {toggleMilestoneLoading, toggleMilestoneError}] = useMutation(TOGGLE_MILESTONE_COMPLETED,{
        refetchQueries: [
            { query: GET_MILESTONES,
                variables: { jobId: props.jobId }
            },
        ],
    });
    if(toggleMilestoneLoading) return <LoadingIndicator/>;
    if(toggleMilestoneError) return <p>Toggle milestone mutation Error! {toggleMilestoneError}</p>;

    const toggleExpandedState = () => {
        const currentState = state.isExpanded;
        setState({
            isExpanded: !currentState,
        });
    };

    const toggleMilestoneStatus = (event) => {
        const milestoneId = event.currentTarget.id;
        toggleMilestoneMutation({
            variables: {
                milestoneId: milestoneId,
            }
        }).then(res => console.log(res),
            err => console.log(err)
        );
    };

    const isExpanded = state.isExpanded;
    const isEditMode = props.isEditMode;
    const isJobAuthor = props.isJobAuthor;
    const isMilestoneCompleted = props.milestone.status ? (props.milestone.status.toUpperCase() == "COMPLETED" ? true : false) : false; 
    return (
        <div className={"flex " + props.className}>
            <div>
                <svg className="w-3 relative mt-6 fill-current text-nebula-grey-400" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="6" cy="6" r="6" fill="" />
                </svg>
                <div className={(props.index === props.lastIndex - 1 ? "" : "h-full ") + " w-px mx-auto bg-nebula-grey-400"}/>
            </div>
            <div className="mx-4 flex-1 ">
                <div className="flex items-center flex-wrap">
                    <div className="flex flex-1 flex-col">
                        <div className="h-4"/>
                        <div className="flex-1">
                            <p className="font-semibold text-nebula-grey-600">Milestone #{props.index + 1}</p>
                        </div>
                        <div className="h-4"/>
                    </div>
                    {isEditMode &&
                        <div className="flex text-nebula-grey-500 hover:text-nebula-blue" id={"#"+props.index} onClick={props.editMilestone}>
                            <Icons.Edit className=" mx-4" />
                            {/* <Icons.Delete className="text-nebula-red mx-4" /> */}
                        </div>
                    }
                    {
                        isJobAuthor 
                            ? 
                            isMilestoneCompleted
                                ?
                                <div id={props.milestone.id} onClick={toggleMilestoneStatus} className="flex items-center text-nebula-blue mx-4 cursor-pointer flex">
                                    <div className="px-2">Completed</div>
                                    <Icons.CheckCircle className="h-4 w-4" />
                                </div>
                                :
                                <div id={props.milestone.id} onClick={toggleMilestoneStatus} className="flex items-center text-nebula-grey-600 hover:text-nebula-blue mx-4 cursor-pointer">
                                    <div className="px-2">Mark as completed</div>
                                    <Icons.CheckCircle className="h-4 w-4" />
                                </div>
                            :
                            ""
                    }
                </div>
                <div className="bg-white rounded-md shadow-none border-nebula-grey-400 border p-6 cursor-pointer transition duration-100 hover:shadow-md" onClick={toggleExpandedState}>
                    <div className="flex flex-row justify-start items-start">
                        <p className="text-base leading-tight flex-1 font-semibold mb-2 pr-4 ">{props.milestone.title}</p>

                        <button className={" transition duration-150 ease-in-out transform " + (isExpanded ? "rotate-0" : "rotate-180")}>
                            <Icons.ChevronUp />
                        </button>
                    </div>
                    {   
                        props.milestone.status ? 
                            <StatusTags statusTag={[props.milestone.status.toLowerCase()]}/>
                            :""
                    }
                    {
                        isExpanded &&
                        <div >
                            <p className="pt-4 text-sm text-nebula-grey-700 leading-relaxed" >{props.milestone.description}</p>
                            <div className="flex flex-row flex-wrap">
                                <InfoTag className="mr-6 mt-4" title="DURATION" data={ DurationParser(props.milestone.duration) } /> 
                                <InfoTag className="mr-6 mt-4" title="RESOLUTION METHODS" data={props.milestone.resolution} />
                                { 
                                    props.milestone.skills?
                                        <InfoTag 
                                            className="mr-6 mt-4"
                                            title="SKILLS NEEDED"
                                            // To convert the incoming type of (if object type) skills to array 
                                            data={props.milestone.skills.map((skill, key) => typeof skill === "object" ? skill.value : skill)} 
                                        />
                                        : []
                                } 
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};


export default MilestoneCard;
