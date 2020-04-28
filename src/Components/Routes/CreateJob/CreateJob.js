import React, { useState, Fragment } from "react";
import SplitContainer from "../../Containers/SplitContainer";
import TextAreaInput from "../../Common/InputFields/TextAreaInput";
import TextInput from "../../Common/InputFields/TextInput";
import Dropdown from "../../Common/Dropdown/Dropdown";
import Button from "../../Common/Button/Button";
import Modal from "../../Containers/Portal";
import ModalViewWithScrim from "../../Modals/ModalViewWithScrim";
import MilestoneModal from "../../Modals/MilestoneModal";
import Portal from "../../Containers/Portal";
import { withRouter } from "react-router";
import { validateJob, validateMilestone } from "./ValidateForm";
import MilestoneCard from "../../Milestones/MilestoneCard";
import { durationStringToDays } from "../../../HelperFunctions/DurationParser";
import { CREATE_JOB } from "../../../mutations";
import { useMutation } from "@apollo/client";

const CreateJob = (props) =>  {

    const initialState = {
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
    };
    const [ state, setState ] = useState(initialState);

    const [createJob, {loading, error}] = useMutation(CREATE_JOB,);
    if(loading) return <p>Authenticating...</p>;
    if(error) return <p>Authentication Error! {error}</p>;

    //To set the skill tags of the milestone
    const getTagList = (skillList) => {   
        setState({
            ...state,
            milestone: {
                ...state.milestone,
                skills: skillList,
            }
        });
    };
    
    const openMilestoneModal = () => {
        setState({
            ...state,
            milestoneModal: true,
            milestoneCount: state.milestoneCount + 1,
        });
    };

    const closeMilestoneModal = () => {
        setState({
            ...state,
            milestoneModal: false,
            milestoneCount: state.milestoneCount - 1,
        });
    };

    //To validate and save the milestone
    const saveMilestone = () => {
        const isMilestoneValid = validateMilestone(state.milestone);
        if(isMilestoneValid) {
            //To change the duration into days before saving it
            let newMilestone ={
                id: state.milestoneCount+1,
                title: state.milestone.title,
                description: state.milestone.description,
                duration: durationStringToDays(state.milestone.duration+" "+state.milestone.durationUnit),
                skills: state.milestone.skills,
                resolution: state.milestone.resolution,
            };
            
            const updatedMilestones = [...state.job.milestones, newMilestone];
            //To save the newly created milestone into the existing list of milestones
            setState({
                ...state,
                milestoneModal: false,
                job: {
                    ...state.job,
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
            setState({
                ...state,
                milestoneErrMsg: "Empty fields!"
            });
        }
    };

    //To validate the whole form 
    const validateForm = () => {
        const isFormValid = validateJob(state.milestoneCount + 1, state.job); //milestoneCount refers to array index hence +1
        if(isFormValid) {
            const createJobInput = {
                title: state.job.title,
                desc: state.job.description,
                difficulty: state.job.difficulty.toUpperCase(),
                milestones: state.job.milestones.map((milestone, key) => {
                    return {
                        title: milestone.title,
                        desc: milestone.description,
                        resolution: milestone.resolution,
                        status: "OPEN",
                        duration: milestone.duration.toString(),
                        skills: milestone.skills
                    };
                })
            };
            console.log(createJobInput);
            createJob({
                variables: {
                    job: createJobInput,
                }
            })
                .then(res => {
                    props.history.push("/jobDetails/"+res.data.createJob.id);
                    alert("Job has been created successfully!");
                },
                err => console.log(err));
        }

        else {
            console.log("Not hii");
            setState({
                ...state,
                jobErrMsg: "Please fill all the fields and add at least one milestone!",
            });
        }
    };

    //To get all the input values and store them in the state
    const onInputChangeHandler = (event) => {
        const value = event.currentTarget.value;
        switch(event.currentTarget.id) {
        case "jobTitle": setState({...state,
            milestoneErrMsg:"",
            jobErrMsg:"",
            job: {...state.job, title: value}});break;

        case "jobDescription": setState({...state,
            milestoneErrMsg:"",
            jobErrMsg:"",
            job:{...state.job, description: value}});break;

        case "jobDifficulty": setState({...state,
            milestoneErrMsg:"",
            jobErrMsg:"",
            job:{...state.job, difficulty: value}});break;

        case "milestoneTitle": setState({...state,
            milestoneErrMsg:"",
            jobErrMsg:"",
            milestone:{...state.milestone, title: value}});break;

        case "milestoneDescription": setState({...state,
            milestoneErrMsg:"",
            jobErrMsg:"",
            milestone:{...state.milestone, description: value}});break;

        case "milestoneDuration": setState({...state,
            milestoneErrMsg:"",
            jobErrMsg:"",
            milestone:{...state.milestone, duration: value}});break;

        case "milestoneDurationUnit": setState({...state,
            milestoneErrMsg:"",
            jobErrMsg:"",
            milestone:{...state.milestone, durationUnit: value}});break;

        case "milestoneResolution": setState({...state,
            milestoneErrMsg:"",
            jobErrMsg:"",
            milestone:{...state.milestone, resolution: value}});break;
        }
    };


    const goBack = () => {
        const cancel = window.confirm("Are you sure you want cancel this job creation?");
        if(cancel) {
            props.history.goBack();
        }
    };

    const ButtonRow = [
        <Button type="secondary" label="Cancel Job Creation" onClick={() => goBack()}/>,
        <Button type="primary" label="Submit Job" onClick={() => validateForm() }/>
    ];
    return (
        <Fragment>
            <Modal
                modalType="milestone"
                modalDisplay={state.milestoneModal}
                closeMilestoneModal={closeMilestoneModal}
                milestoneNo="4"
            />
            <SplitContainer
                leftView={<JobForm jobErrMsg={state.jobErrMsg} state={state} onChange={onInputChangeHandler} />}
                rightView={<Milestones milestoneCount={state.milestoneCount} milestones={state.job.milestones} openMilestoneModal={openMilestoneModal} />}
                actions={ButtonRow}
            />
            <Portal isOpen={state.milestoneModal} >
                <ModalViewWithScrim>
                    <MilestoneModal 
                        saveMilestone={saveMilestone} 
                        closeModal={closeMilestoneModal} 
                        getTagList = {getTagList}
                        onChange={onInputChangeHandler}
                        errMsg={state.milestoneErrMsg}
                        milestoneNo={state.milestoneCount+1}//milestoneCount refers to array index hence +1
                    />
                </ModalViewWithScrim>
            </Portal>
        </Fragment>
    );
};


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

};

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
};

export default withRouter(CreateJob);
