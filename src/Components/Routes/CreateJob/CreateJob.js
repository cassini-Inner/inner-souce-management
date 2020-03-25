import React, { Component, Fragment } from 'react';
import SplitContainer from '../../Containers/SplitContainer';
import SearchTagsInput from '../../Common/InputFields/SearchTagsInput'
import TextInput from '../../Common/InputFields/TextInput'
import Dropdown from '../../Common/Dropdown/Dropdown'
import Button from '../../Common/Button/Button'
import Modal from "../../Containers/Portal";
import ModalViewWithScrim from '../../Modals/ModalViewWithScrim'
import MilestoneModal from '../../Modals/MilestoneModal'
import Portal from '../../Containers/Portal'
class CreateJob extends Component {

    state = {
        milestoneModal: false,
    }

    openMilestoneModal = () => {
        this.setState({
            milestoneModal: true,
        })
    };

    closeMilestoneModal = () => {
        this.setState({
            milestoneModal: false,
        })
    };
    
    ButtonRow = [
        <Button type="secondary" label="Cancel Job Creation" className=" w-full " />,
        <Button type="primary" label="Submit Job" className=" w-full " />
    ]
    

    render() {
        return (
            <Fragment>

                <Modal 
                    modalType = "milestone" 
                    modalDisplay = {this.state.milestoneModal} 
                    closeMilestoneModal = {this.closeMilestoneModal} 
                    milestoneNo = "4"
                />
                <SplitContainer 
                    leftView={<JobForm />} 
                    rightView={<Milestones openMilestoneModal = {this.openMilestoneModal} />} 
                    actions={this.ButtonRow} 
                />
                <Portal isOpen={this.state.milestoneModal} >
                    <ModalViewWithScrim>
                        <MilestoneModal closeModal={this.closeMilestoneModal}/>
                    </ModalViewWithScrim>A
                </Portal>
            </Fragment>
        );
    }
}

const JobForm = () => {
    return (
        <div className="bg-white flex flex-col w-full h-full mt-10">
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

export default CreateJob;
