import React from "react";
import MilestoneCard from "./MilestoneCard";
import { useQuery } from "@apollo/react-hooks";
import { GET_MILESTONES } from "../../queries";

const MilestonesList = (props) => {
    const { loading, error, data } = useQuery(GET_MILESTONES, { variables: { jobId: props.jobId } });
    if (loading) return "Loading...";
    else if (error) alert(`Error! ${error.message}`);
    return (
        <ul className="py-8">
            {
                data["Job"]["milestones"]["milestones"].map(
                    (milestone, index) => {
                        // To convert the incoming object type skills to array
                        milestone.skills = milestone.skills.map((skill, key) => typeof skill === "object" ? skill.value : skill);
                        return (
                            <li key={data.id}>
                                <MilestoneCard milestone={milestone} isEditMode={props.isEditMode} index={index} lastIndex={data.Job.milestones.totalCount} />
                            </li>
                        );
                    })
            }
        </ul>
    );
};

export default MilestonesList;