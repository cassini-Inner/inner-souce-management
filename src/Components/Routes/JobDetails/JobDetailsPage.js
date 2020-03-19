import React, { Component } from "react";
import SplitContainer from "../../Containers/SplitContainer";
import JobInformation from "./JobInformation";
import MilestonesList from "../../Milestones/MilestonesList";
import Button from "../../Common/Button/Button";

class JobDetailsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditMode: true,
        };
    }

    applyToJobClickHandler() {

    }

    render() {
        const isEditMode = this.state.isEditMode;

        const actions = [
            (<Button type="secondary" label="Apply to Milestones"
                onClick={this.openFilterModal}
                className=" w-full "
            />),
            (<Button type="primary" label="Apply to Job"
                onClick={this.applyToJobClickHandler}
                className=" w-full "
            />),
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
