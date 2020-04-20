import React from "react";
import MilestoneCard from "./MilestoneCard";
import { milestones } from "../../../assets/placeholder";
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const GET_MILESTONEDETAILS = gql`
  query{
    Job(id:"3"){
        id
        milestones {
            totalCount
            milestones{
                id
                title
                desc
                status
                duration
                resolution
            }
        }

    }
}
`;

const MilestonesList = (props) => {
    const { loading, error, data } = useQuery(GET_MILESTONEDETAILS);
    if (loading) return 'Loading...';
    else if (error) alert(`Error! ${error.message}`);
    console.log(data)
    return (
        <ul className="py-8">
            {
                milestones.map(
                    (milestone, index) => {
                        return (
                            <li key={milestone.id}>
                                <MilestoneCard milestone={data["Job"]} isEditMode={props.isEditMode} index={index} lastIndex={milestones.length} />
                            </li>
                        );
                    })
            }
        </ul>
    );
};

export default MilestonesList;