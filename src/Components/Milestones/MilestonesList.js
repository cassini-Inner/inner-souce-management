import React from "react";
import MilestoneCard from "./MilestoneCard";
import { milestones } from "../../../assets/placeholder";
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
                        return (
                            <li key={data.id}>
                                <MilestoneCard milestone={milestone} isEditMode={props.isEditMode} index={index} lastIndex={milestones.length} />
                            </li>
                        );
                    })
            }
        </ul>
    );
};

export default MilestonesList;