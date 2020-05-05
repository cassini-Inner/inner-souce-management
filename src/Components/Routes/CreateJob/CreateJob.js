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
import { durationStringToDays, DurationParser } from "../../../HelperFunctions/DurationParser";
import { CREATE_JOB } from "../../../mutations";
import { useMutation } from "@apollo/client";
import LoadingIndicator from "../../Common/LoadingIndicator/LoadingIndicator";

const CreateJob = (props) => {

    const initialState = {
        milestoneModal: false,
        editMilestoneState: false,
        editMilestoneIndex: -1, //Index of the milestone in milestones list to be edit
        milestoneCount: -1, //No milestones in the job initially
        milestoneErrMsg: "",
        jobErrMsg: "",
        job: {
            title: "",
            description: "",
            difficulty: "Intermediate", //Default value in the dropdown
            milestones: [],
            errorMessages: {}
        },
        milestone: {
            title: "",
            description: "",
            duration: "",
            durationUnit: "Weeks", //Default value in the dropdown
            skills: [],
            resolution: "",
            errorMessages: {}
        }
    };
    const [state, setState] = useState(initialState);

    const [createJob, { loading, error }] = useMutation(CREATE_JOB);
    if (error) {
        console.log(error);
    }

    //To set the skill tags of the milestone
    const getTagList = (skillList) => {
        setState({
            ...state,
            milestone: {
                ...state.milestone,
                skills: skillList,
                errorMessages: {
                    ...state.milestone.errorMessages,
                    skillsErr: "",
                }
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
            ...state,     //If the milestone modal was opened by edit milestone option the number of milestones shouldn't change
            milestoneCount: state.editMilestoneState ? state.milestoneCount : state.milestoneCount - 1,
            milestoneModal: false,
            editMilestoneState: false,
            editMilestoneIndex: -1,
            job: {
                ...state.job,
                errorMessages: {}
            },
            milestone: {
                title: "",
                description: "",
                duration: "",
                durationUnit: "Weeks",
                skills: [],
                resolution: "",
                errorMessages: {}
            }
        });
    };

    //To validate and save the milestone
    const saveMilestone = () => {
        const [isMilestoneValid,errorMessages] = validateMilestone(state.milestone);
        if (isMilestoneValid) {
            var updatedMilestonesList = [];
            //To change the duration into days before saving it
            let newMilestone = {
                title: state.milestone.title,
                description: state.milestone.description,
                duration: durationStringToDays(state.milestone.duration + " " + state.milestone.durationUnit),
                skills: state.milestone.skills,
                resolution: state.milestone.resolution,
            };
            if (state.editMilestoneState) {
                updatedMilestonesList = [
                    ...state.job.milestones.slice(0, state.editMilestoneIndex),
                    newMilestone,
                    ...state.job.milestones.slice(state.editMilestoneIndex + 1)
                ];
            }
            else {
                updatedMilestonesList = [...state.job.milestones, newMilestone];
            }
            //To save the newly created milestone into the existing list of milestones
            setState({
                ...state,
                milestoneModal: false,
                editMilestoneIndex: -1,
                editMilestoneState: false,
                job: {
                    ...state.job,
                    milestones: updatedMilestonesList,
                },
                //To empty the milestone after insertion
                milestone: {
                    title: "",
                    description: "",
                    duration: "",
                    durationUnit: "Weeks",
                    skills: [],
                    resolution: "",
                    errorMessages: {}
                }
            });
        }
        else {
            setState({
                ...state,
                milestoneErrMsg: "",
                milestone: {
                    ...state.milestone,
                    errorMessages: errorMessages
                }
            });
        }
    };

    const deleteMilestone = () => {
        const confirmed = window.confirm("Are you sure you want to delete milestone " + (state.editMilestoneIndex + 1) + "?");
        if (confirmed) {
            const newMilestoneList = [
                ...state.job.milestones.slice(0, state.editMilestoneIndex),
                ...state.job.milestones.slice(state.editMilestoneIndex + 1)
            ];
            setState({
                ...state,
                editMilestoneState: false,
                milestoneModal: false,
                editMilestoneIndex: -1,
                milestoneCount: state.milestoneCount - 1,
                job: {
                    ...state.job,
                    milestones: [...newMilestoneList]
                },
                milestone: {
                    title: "",
                    description: "",
                    duration: "",
                    durationUnit: "Weeks",
                    skills: [],
                    resolution: "",
                    errorMessages: {}
                }
            });
        }
    };

    const editMilestoneOpen = (event) => {
        const milestoneIndex = parseInt(event.currentTarget.id.slice(1));
        var duration = DurationParser(state.job.milestones[milestoneIndex].duration).split(" ");
        setState({
            ...state,
            editMilestoneState: true,
            editMilestoneIndex: milestoneIndex,
            milestoneModal: true,
            milestone: {
                title: state.job.milestones[milestoneIndex].title,
                description: state.job.milestones[milestoneIndex].description,
                duration: duration[0],
                durationUnit: duration[1].charAt(0).toUpperCase() + duration[1].slice(1), //Default value in the dropdown
                skills: state.job.milestones[milestoneIndex].skills,
                resolution: state.job.milestones[milestoneIndex].resolution,
            }
        });
    };

    //To validate the whole form 
    const validateForm = () => {
        const [isFormValid,errorMessages]  = validateJob(state.milestoneCount + 1, state.job); //milestoneCount refers to array index hence +1
        if (isFormValid) {
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
            createJob({
                variables: {
                    job: createJobInput,
                }
            }).then(
                res => props.history.push("/jobDetails/" + res.data.createJob.id),
                err => alert("Failed to create a new job: " + err)
            );
        }

        else {
            setState({
                ...state,
                jobErrMsg: errorMessages.jobErrMsg,
                job: {
                    ...state.job,
                    errorMessages: errorMessages
                }
            });
        }
    };

    //To get all the input values and store them in the state
    const onInputChangeHandler = (event) => {
        var value = event.currentTarget.value;
        var field = event.currentTarget.id;

        if(field.includes("job")) {
            field = field.replace("job",'');
            setState({
                ...state,
                milestoneErrMsg: "",
                jobErrMsg: "",
                job: { 
                    ...state.job, 
                    [field]: value,
                    errorMessages: {
                        ...state.job.errorMessages,
                        [field+"Err"]: "",
                    }
                }
            });
        }

        else if(field.includes("milestone")) {
            field = field.replace("milestone",'');
            setState({
                ...state,
                milestoneErrMsg: "",
                jobErrMsg: "",
                milestone: { 
                    ...state.milestone, 
                    [field]: value,
                    errorMessages: {
                        ...state.milestone.errorMessages,
                        [field+"Err"]: "",
                    }
                }
            });
        }
    };


    const goBack = () => {
        const cancel = window.confirm("Are you sure you want cancel this job creation?");
        if (cancel) {
            props.history.goBack();
        }
    };

    const ButtonRow = [
        <Button type="secondary" label="Cancel Job Creation" onClick={() => goBack()} />,
        <Button type="primary" label="Submit Job" onClick={() => validateForm()} />
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
                rightView={<Milestones milestoneCount={state.milestoneCount} editMilestone={editMilestoneOpen} milestones={state.job.milestones} openMilestoneModal={openMilestoneModal} />}
                actions={ButtonRow}
            />
            <Portal isOpen={state.milestoneModal} >
                <ModalViewWithScrim>
                    <MilestoneModal
                        saveMilestone={saveMilestone}
                        closeModal={closeMilestoneModal}
                        getTagList={getTagList}
                        onChange={onInputChangeHandler}
                        deleteMilestone={deleteMilestone}
                        errMsg={state.milestoneErrMsg}          //milestoneCount & editMilestoneIndex refers to array index hence +1
                        milestoneNo={state.editMilestoneIndex > -1 ? state.editMilestoneIndex + 1 : state.milestoneCount + 1}
                        editMilestoneState={state.editMilestoneState}
                        milestone={state.milestone}
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
            <TextInput id="jobtitle" className="mt-2 w-full" placeholder="Give your Job an appropriate title" onChange={props.onChange} />
            {props.state.job.errorMessages.titleErr ? <div className = "mt-2 text-nebula-red" >{props.state.job.errorMessages.titleErr}</div> : ""}
            <h2 className="text-sm font-semibold mt-10">Job Description</h2>
            <TextAreaInput id="jobdescription" className="mt-2 w-full" placeholder="Enter a brief overview of the job" onChange={props.onChange} />
            {props.state.job.errorMessages.descriptionErr ? <div className = "mt-2 text-nebula-red" >{props.state.job.errorMessages.descriptionErr}</div> : ""}
            <div className="flex mt-10">
                <div className="flex-col flex-1 pr-1">
                    <h2 className="text-sm font-semibold">Difficulty</h2>
                    <p className="text-nebula-grey-700 leading-tight text-sm">How difficult is the job?</p>
                </div>
                <Dropdown id="jobdifficulty" list={["Intermediate", "Easy", "Hard"]} onChange={props.onChange} />
            </div>
            { //To display error messages
                props.jobErrMsg ?
                    <div
                        className="mt-6 text-nebula-red" >
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
                                        <MilestoneCard
                                            milestone={milestone}
                                            isEditMode={true}
                                            index={index}
                                            lastIndex={props.milestoneCount + 1}
                                            editMilestone={props.editMilestone} />
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
