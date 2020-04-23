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
import * as actions from "../../../Store/actions";
import { connect } from "react-redux";
import { validateJob, validateMilestone } from "./ValidateForm";

class CreateJob extends Component {

    state = {
        milestoneModal: false,
        milestoneNo: 0,
        msg: "",
        msgType: "",
        job: {
            title:"",
            description: "",
            difficulty: "Intermediate", //Default value in the dropdown
            milestones: [{
                title: "",
                description: "",
                duration: "",
                durationUnit: "Weeks", //Default value in the dropdown
                skills: [],
                resolutionMethod: ""
            }]
        }
    }

    getTagList = (skillList) => {
        console.log(skillList);
        this.setState({
            job: {
                milestones: {
                    milestoneSkills: skillList,
                }
            }
        })
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

    saveMilestone = () => {
        // let isMilestoneValid, milestone = validateMilestone(this.state.milestoneSkills);
        this.setState({
            milestoneModal: false,
        })
    };

    validateForm = () => {
        // const some = (job) =>{
        //     console.log(job);
        //     if(!isJobValid) {
        //         alert("hii");
        //     }
        // }
        // validateJob(some);
    }

    onInputChangeHandler = (event) => {
        console.log(event.currentTarget.id, event.currentTarget.value);
    }


    goBack = () => {
        const cancel = window.confirm("Are you sure you want cancel this job creation?")
        if(cancel) {
            this.props.history.goBack();
        }
    }

    ButtonRow = [
        <Button type="secondary" label="Cancel Job Creation" onClick={() => this.goBack()}/>,
        <Button type="primary" label="Submit Job" onClick={() => this.validateForm() }/>
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
                    leftView={<JobForm msg={this.state.msg} msgType={this.state.msgType} state={this.state} onChange={this.onInputChangeHandler} />}
                    rightView={<Milestones openMilestoneModal={this.openMilestoneModal} />}
                    actions={this.ButtonRow}
                />
                <Portal isOpen={this.state.milestoneModal} >
                    <ModalViewWithScrim>
                        <MilestoneModal 
                            saveMilestone={this.saveMilestone} 
                            closeModal={this.closeMilestoneModal} 
                            getTagList = {this.getTagList}
                            onChange={this.onInputChangeHandler}
                        />
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
            <TextInput id="jobTitle" className="mt-2 w-full" placeholder="Give your Job a small title" onChange={props.onChange} />
            <h2 className="text-sm font-semibold mt-10">Job Description</h2>
            <TextAreaInput id="jobDescription" className="mt-2 w-full" placeholder="Enter a brief overview of the job" onChange={props.onChange} />
            <div className="flex mt-10">
                <div className="flex-col flex-1 pr-1">
                    <h2 className="text-sm font-semibold">Difficulty</h2>
                    <p className="text-nebula-grey-700 leading-tight text-sm">How difficult is the job?</p>
                </div>
                <Dropdown id="jobDifficulty" list={["Intermediate", "Easy", "Hard"]} onChange={props.onChange} />
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

// const mapStateToProps = state => {
//     return {
//         jobStore: state.createJob
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return {
//       setJobFields: () => dispatch({ type: actions.SET_CREATEJOB_JOBFIELDS }),
//       setMilestoneFields: () => dispatch({ type: actions.SET_CREATEJOB_MILESTONEFIELDS }),
//       cancelJobCreation: () => dispatch({ type: actions.CANCEL_CREATEJOB })
//     }
// }

export default withRouter(CreateJob);
