import React, { Component } from 'react';
import { milestones } from '../../../assets/placeholder';
import MilestoneCard from './MilestoneCard';

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
            <div>
                <ul>
                    {milestones.map(
                        (milestone, index) => {
                            return (
                                <div className="flex flex-row">
                                    <MilestoneCard index={index} milestone={milestone} />
                                    <CheckBox></CheckBox>
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