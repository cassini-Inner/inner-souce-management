import React, { Component, Fragment } from 'react';
import SplitContainer from '../../Containers/SplitContainer';
import TextAreaInput from '../../Common/InputFields/TextAreaInput';
import TextInput from '../../Common/InputFields/TextInput';
import Dropdown from '../../Common/Dropdown/Dropdown';
import Button from '../../Common/Button/Button';
import Modal from "../../Containers/Portal";
import ModalViewWithScrim from '../../Modals/ModalViewWithScrim';
import MilestoneModal from '../../Modals/MilestoneModal';
import Portal from '../../Containers/Portal';
import { withRouter } from "react-router";

class CreateJob extends Component {

    state = {
        milestoneModal: false,
        msg: "",
        msgType: "",
        job: {
            title:"",
            description: "",
            difficult: "",
            milestones: {
                title: "",
                description: "",
                duration: "",
                skills: [],
                resolutionMethod: ""
            }
        }
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

    onChangeHandler = (event) => {
        console.log(event.currentTarget.id, event.currentTarget.value)
    }

    goBack = () => {
        const cancel = window.confirm("Are you sure you want cancel this job creation?")
        if(cancel) {
            this.props.history.goBack();
        }
    }

    ButtonRow = [
        <Button type="secondary" label="Cancel Job Creation" onClick={() => this.goBack()}/>,
        <Button type="primary" label="Submit Job" />
    ]


    render() {
        return (
            <Fragment>

                <Modal
                    modalType="milestone"
                    modalDisplay={this.state.milestoneModal}
                    closeMilestoneModal={this.closeMilestoneModal}
                    milestoneNo="4"
                />
                <SplitContainer
                    leftView={<JobForm msg={this.props.msg} msgType={this.props.msgType} onChangeHandler={this.onChangeHandler}/>}
                    rightView={<Milestones openMilestoneModal={this.openMilestoneModal} />}
                    actions={this.ButtonRow}
                />
                <Portal isOpen={this.state.milestoneModal} >
                    <ModalViewWithScrim>
                        <MilestoneModal closeModal={this.closeMilestoneModal} />
                    </ModalViewWithScrim>
                </Portal>
            </Fragment>
        );
    }
}

const JobForm = (props) => {
    return (
        <div className="bg-white flex flex-col w-full h-full mt-10">
            <h2 className="text-sm font-semibold ">Job Title</h2>
            <TextInput id="jobTitle" className="mt-2 w-full" placeholder="Give your Job a small title" onChange={props.onChangeHandler}/>
            <h2 className="text-sm font-semibold mt-10">Job Description</h2>
            <TextAreaInput id="jodDesc" className="mt-2 w-full" placeholder="Enter a brief overview of the job" onChange={props.onChangeHandler}/>
            <div className="flex mt-10">
                <div className="flex-col flex-1 pr-1">
                    <h2 className="text-sm font-semibold">Difficulty</h2>
                    <p className="text-nebula-grey-700 leading-tight text-sm">How difficult is the job?</p>
                </div>
                <Dropdown list={["Intermediate", "Easy", "Hard"]} />
            </div>
            { //To display error and success messages
                props.msg?
                <div 
                    className = {"mt-6 "+(props.msgType == "error" ? "text-nebula-red" : "text-nebula-blue") }>
                        {props.msg}
                    </div>
                : ""
            }
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

export default withRouter(CreateJob);
