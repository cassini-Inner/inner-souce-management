import React, { Component } from 'react';
import SplitContainer from '../../Containers/SplitContainer';
import * as actionType from '../../../Store/actions';
import SearchTagsInput from '../../Common/InputFields/SearchTagsInput'
import TextInput from '../../Common/InputFields/TextInput'
import Dropdown from '../../Common/Dropdown/Dropdown'
import Button from '../../Common/Button/Button'
import { connect } from 'react-redux';

class CreateJob extends Component {
    ButtonRow = [
        <Button type="secondary" label="Cancel Job Creation" className=" w-full " />,
        <Button type="primary" label="Submit Job" className=" w-full " />
    ]
    

    render() {
        return (
            <SplitContainer leftView={<JobForm />} rightView={<Milestones openMilestoneModal={this.props.openModal} />} actions={this.ButtonRow} />
        );
    }
}

const JobForm = () => {
    return (
        <div className="bg-white flex flex-col w-full mt-10">
            <h2 className="text-base font-semibold ">Job Title</h2>
            <TextInput className="mt-2 w-full" placeholder="Give your Job a small title" />
            <h2 className="text-base font-semibold mt-10">Job Description</h2>
            <TextInput className="mt-2 w-full" placeholder="Enter a brief overview of the job" />
            <div className="flex mt-10">
                <div className="flex-col flex items-start flex-1 pr-1">
                    <h2 className="text-base font-semibold ">Duration</h2>
                    <p className=" text-nebula-grey-700 leading-tight text-sm">How soon do you expect the job to be finished?</p>
                </div>
                <div className="flex items-center">
                    <TextInput className="mr-2 w-24" placeholder="Duration" />
                    <Dropdown list={["Weeks", "Days", "Months"]} />
                </div>
            </div>
            <div className="flex mt-10">
                <div className="flex-col flex-1 pr-1">
                    <h2 className="text-base font-semibold">Difficulty</h2>
                    <p className="text-nebula-grey-700 leading-tight text-sm">How difficult is the job?</p>
                </div>
                <Dropdown list={["Intermediate", "Easy", "Hard"]} />
            </div>
            <h2 className="text-base font-semibold mt-10">Skills required</h2>
            <SearchTagsInput className="w-full" placeholder="Type and press enter to add skills" />
        </div>
    );

}

const Milestones = (props) => {
    return (
        <div className="flex-col p-2 pt-0">
            <div className="text-2xl">
                Milestones
            </div>
            <div className="mt-6 flex-wrap">
                Break down your job into smaller actionable milestones to help people understand it better.
                They can also choose to work on individual milestones they find interesting.
            </div>
            <div className="mt-6">
                <Button type="primary" label="Add a new Milestone" onClick={props.openMilestoneModal} />
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        modalState: state.modal.display
    };
}

const mapDispatchToProps = dispatch => {
    return {
        openModal: () => dispatch({ type: actionType.OPEN_MODAL, modalType: "milestone", payload: {milestoneNo: 4}})
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateJob);
