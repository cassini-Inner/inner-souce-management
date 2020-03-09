import React, { Fragment, Component } from 'react';
import SplitContainer from './SplitContainer';
import JobInformation from './JobInformation';
import { Button } from '../CommonComponents';
import MilestonesList from './MilestonesList';

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


        const statusWidget = (
            <div>
                <p>This is a title</p>
                <p>This is text</p>
            </div>
        );

        return (
            <SplitContainer
                leftView={< JobInformation />}
                actions={actions}
                rightView={<MilestonesList />}
                statusTitle="This is a title"
                statusSubtitle="This is a subtitle"
            />
        );
    }
}


export default JobDetailsPage;