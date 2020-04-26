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
import { validateJob, validateMilestone } from "./ValidateForm";
import MilestoneCard from "../../Milestones/MilestoneCard";
import { durationStringToDays } from "../../../HelperFunctions/DurationParser";

class CreateJob extends Component {

    state = {
        milestoneModal: false,
        milestoneCount: -1, //No milestones in the job initially
        milestoneErrMsg: "",
        jobErrMsg: "",
        job: {
            title:"",
            description: "",
            difficulty: "Intermediate", //Default value in the dropdown
            milestones: [],
        },
        milestone: {
            title: "",
            description: "",
            duration: "",
            durationUnit: "Weeks", //Default value in the dropdown
            skills: [],
            resolution: ""
        }
    }

    //To set the skill tags of the milestone
    getTagList = (skillList) => {   
        this.setState({
            milestone: {
                ...this.state.milestone,
                skills: skillList,
            }
        });
    }
    
    openMilestoneModal = () => {
        this.setState({
            milestoneModal: true,
            milestoneCount: this.state.milestoneCount + 1,
        })
    };

    closeMilestoneModal = () => {
        this.setState({
            milestoneModal: false,
            milestoneCount: this.state.milestoneCount - 1,
        })
    };

    //To validate and save the milestone
    saveMilestone = () => {
        const isMilestoneValid = validateMilestone(this.state.milestone);
        if(isMilestoneValid) {
            //To change the duration into days before saving it
            let newMilestone ={
                id: this.state.milestoneCount+1,
                title: this.state.milestone.title,
                description: this.state.milestone.description,
                duration: durationStringToDays(this.state.milestone.duration+" "+this.state.milestone.durationUnit),
                skills: this.state.milestone.skills,
                resolution: this.state.milestone.resolution,
            }
            
            const updatedMilestones = [...this.state.job.milestones, newMilestone]
            //To save the newly created milestone into the existing list of milestones
            this.setState({
                milestoneModal: false,
                job: {
                    ...this.state.job,
                    milestones: updatedMilestones,
                },
                //To empty the milestone after insertion
                milestone: {
                    title: "",
                    description: "",
                    duration: "",
                    durationUnit: "Weeks", //Default value in the dropdown
                    skills: [],
                    resolution: ""
                }
            });
        }
        else {
            this.setState({
                ...this.state,
                milestoneErrMsg: "Empty fields!"
            });
        }
    };

    //To validate the whole form 
    validateForm = () => {
        const isFormValid = validateJob(this.state.milestoneCount + 1, this.state.job); //milestoneCount refers to array index hence +1
        if(isFormValid) {
            console.log("Hiii");
        }

        else {
            console.log("Not hii");
            this.setState({
                ...this.state,
                jobErrMsg: "Please fill all the fields and add at least one milestone!"
            });
        }
    }

    //To get all the input values and store them in the state
    onInputChangeHandler = (event) => {
        const value = event.currentTarget.value;
        switch(event.currentTarget.id) {
            case "jobTitle": this.setState({...this.state,
                milestoneErrMsg:"",
                jobErrMsg:"",
                job: {...this.state.job, title: value}});break;

            case "jobDescription": this.setState({...this.state,
                milestoneErrMsg:"",
                jobErrMsg:"",
                job:{...this.state.job, description: value}});break;

            case "jobDifficulty": this.setState({...this.state,
                milestoneErrMsg:"",
                jobErrMsg:"",
                job:{...this.state.job, difficulty: value}});break;

            case "milestoneTitle": this.setState({...this.state,
                milestoneErrMsg:"",
                jobErrMsg:"",
                milestone:{...this.state.milestone, title: value}});break;

            case "milestoneDescription": this.setState({...this.state,
                milestoneErrMsg:"",
                jobErrMsg:"",
                milestone:{...this.state.milestone, description: value}});break;

            case "milestoneDuration": this.setState({...this.state,
                milestoneErrMsg:"",
                jobErrMsg:"",
                milestone:{...this.state.milestone, duration: value}});break;

            case "milestoneDurationUnit": this.setState({...this.state,
                milestoneErrMsg:"",
                jobErrMsg:"",
                milestone:{...this.state.milestone, durationUnit: value}});break;

            case "milestoneResolution": this.setState({...this.state,
                milestoneErrMsg:"",
                jobErrMsg:"",
                milestone:{...this.state.milestone, resolution: value}});break;
        }
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
                    leftView={<JobForm jobErrMsg={this.state.jobErrMsg} state={this.state} onChange={this.onInputChangeHandler} />}
                    rightView={<Milestones milestoneCount={this.state.milestoneCount} milestones={this.state.job.milestones} openMilestoneModal={this.openMilestoneModal} />}
                    actions={this.ButtonRow}
                />
                <Portal isOpen={this.state.milestoneModal} >
                    <ModalViewWithScrim>
                        <MilestoneModal 
                            saveMilestone={this.saveMilestone} 
                            closeModal={this.closeMilestoneModal} 
                            getTagList = {this.getTagList}
                            onChange={this.onInputChangeHandler}
                            errMsg={this.state.milestoneErrMsg}
                            milestoneNo={this.state.milestoneCount+1}//milestoneCount refers to array index hence +1
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
            { //To display error messages
                props.jobErrMsg?
                <div 
                    className = "mt-6 text-nebula-red" >
                        {props.jobErrMsg}
                    </div>
                : ""
            }
        </div>
    );

}

const Milestones = (props) => {
    return (
        <div>
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
            <ul className="py-8">
                {
                    props.milestoneCount > -1 ?
                        props.milestones.map(
                            (milestone, index) => {
                                return (
                                    <li key={index}>
                                        <MilestoneCard milestone={milestone} isEditMode={true} index={index} lastIndex={props.milestoneCount+1} />
                                    </li>
                                );
                            })
                        :
                        ""
                }
            </ul>
        </div>
    );
}

export default withRouter(CreateJob);
