import React, { Component } from "react";
import { milestones } from "../../../../assets/placeholder";
import MilestoneCard from "../../Milestones/MilestoneCard";

class ApplyToMilestones extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedMilestoneIds: new Set(),
        };
    }

    toggleMilestone(milestoneId) {
        let selectedIdsSet = this.state.selectedMilestoneIds;

        if (selectedIdsSet.has(milestoneId)) {
            selectedIdsSet.delete(milestoneId);
        } else {
            selectedIdsSet.add(milestoneId);
        }

        this.setState({
            selectedMilestoneIds: selectedIdsSet,
        });
    }

    render() {
        return (
            <div className="max-w-lg max-h-screen overflow-y-auto">
                <ul>
                    {milestones.map(
                        (milestone, index) => {
                            return (
                                <div className="w-full flex">
                                    <MilestoneCard expanded={false} index={index} milestone={milestone} lastIndex={milestones.length} className="flex-1" />
                                    <input type="checkbox" id={milestone.id}></input>
                                </div>
                            );
                        }
                    )}
                </ul>
            </div>
        );
    }
}

export default ApplyToMilestones;
