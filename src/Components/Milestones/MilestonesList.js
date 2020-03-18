import React from "react";
import MilestoneCard from "./MilestoneCard";
import { milestones } from "../../../assets/placeholder";

const MilestonesList = (props) => {
    return (
        <div>
            <h2 className="text-2xl">Milestones</h2>
            <ul className="">
                {
                    milestones.map(
                        (milestone, index) => {
                            return (
                                <li key={milestone.id}>
                                    <MilestoneCard milestone={milestone} isEditMode={props.isEditMode} index={index} lastIndex={milestones.length} />
                                </li>
                            );
                        })
                }
            </ul>
        </div>
    );
};

export default MilestonesList;