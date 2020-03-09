import React, { Fragment, Component } from 'react';
import { milestones } from '../../../assets/placeholder';
import MilestoneCard from './MilestoneCard';
import SplitContainer from './SplitContainer';
import JobInformation from './JobInformation';
import { Button } from '../CommonComponents';

class JobDetailsPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isEditMode: true,
        }
    }



    render() {
        const isEditMode = this.state.isEditMode;

        const actions = [
            (<Button type="secondary" label="Apply to Milestones"></Button>),
            (<Button type="primary" label="Apply to Job"></Button>),
        ];

        const rightView = (
            <div>
                <h2 className="text-2xl">Milestones</h2>
                <ul className="">
                    {
                        milestones.map(
                            (milestone, index) => {
                                return (
                                    <li key={milestone.id}>
                                        <MilestoneCard milestone={milestone} isEditMode={this.props.isEditMode} index={index} lastIndex={milestones.length} />
                                    </li>
                                );
                            })
                    }
                </ul>
            </div>
        );
        return (
            <SplitContainer
                leftView={< JobInformation />}
                actions={actions}
                rightView={rightView}
            />
        );
    }
}

export default JobDetailsPage;