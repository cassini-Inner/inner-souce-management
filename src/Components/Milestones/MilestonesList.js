import React from "react";
import MilestoneCard from "./MilestoneCard";
import { milestones } from "../../../assets/placeholder";

const MilestonesList = (props) => {
    return (
        <ul className="py-8">
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
    );
};

export default MilestonesList;