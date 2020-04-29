import React from "react";
import MilestoneCard from "./MilestoneCard";
import { useQuery } from "@apollo/client";
import { GET_MILESTONES } from "../../queries";

const MilestonesList = (props) => {
    const { loading, error, data } = useQuery(GET_MILESTONES, { variables: { jobId: props.jobId } });
    if (loading) return "Loading...";
    else if (error) alert(`Error! ${error.message}`);
    const sortedMilestones = data["Job"]["milestones"]["milestones"].sort(function(a, b) { return( a.id -b.id ) });
    return (
        <ul className="py-8">
            {
                sortedMilestones.map(
                    (milestone, index) => {
                        return (
                            <li key={milestone.id}>
                                <MilestoneCard 
                                    milestone = { milestone } 
                                    isEditMode = { props.isEditMode } 
                                    index = { index } 
                                    lastIndex = { data.Job.milestones.totalCount } 
                                    isJobAuthor = { props.isJobAuthor }
                                    jobId = { data.Job.id }
                                />
                            </li>
                        );
                    })
            }
        </ul>
    );
};

export default MilestonesList;