import React, { Component } from 'react';
import { milestones } from '../../../assets/placeholder';
import MilestoneCard from '../Milestones/MilestoneCard';

class ApplyToMilestones extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedMilestoneIds: new Set(),
        }
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
            <div className="">
                <ul>
                    {milestones.map(
                        (milestone, index) => {
                            return (
                                <div className="w-full">
                                    <MilestoneCard index={index} milestone={milestone} />
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
