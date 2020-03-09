import React, { Component, Fragment } from "react";
import { TextInput, Dropdown, Button, SkillTag } from "../CommonComponents";
import SplitContainer from '../JobDetails/SplitContainer';

class CreateJob extends Component {
    ButtonRow = [
        <Button type = "secondary" label = "Cancel Job Creation" />,
        <Button type = "primary" label = "Submit Job" />
    ]
    render() {
        return (
            <SplitContainer leftView = { <JobForm /> } rightView = { <Milestones /> } actions = { this.ButtonRow }  />
        );
    }
}

const JobForm = () => {
    return(
        <div className = "bg-white flex flex-col p-4 w-full">
            <h2 className = "text-xl font-semibold mt-2">Job Title</h2> 
            <TextInput className = "mt-2 w-full" placeholder = "Give your Job a small title" /> 
            <h2 className = "text-xl font-semibold mt-10">Job Description</h2> 
            <TextInput className = "mt-2 w-full" placeholder = "Enter a brief overview of the job" /> 
            <div className = "flex mt-10">
                <div className = "flex-col flex-1 pr-1">
                    <h2 className = "text-xl font-semibold">Duration</h2>
                    <p>How soon do you expect the job to be finished?</p>
                </div>
                <div className = "flex items-center">
                    <TextInput className="mr-2 w-24" placeholder = "Duration" /> 
                    <Dropdown list = {["Some", "Random", "List"]} label="Weeks" />
                </div>
            </div>
            <div className = "flex mt-10">
                <div className = "flex-col flex-1 pr-1">
                    <h2 className = "text-xl font-semibold">Difficulty</h2>
                    <p>How difficult is the job?</p>
                </div>
                <Dropdown list = {["Some", "Random", "List"]} label="Intermediate" />
            </div>
            <h2 className = "text-xl font-semibold mt-10">Skills required</h2>
            <TextInput className="mt-2 w-full mb-4" placeholder = "Type and press enter to add skills" /> 
            <div className="flex flex-row flex-wrap">
            <SkillTag skill = "Nodejs" />
            </div>
        </div>
    );

}

const Milestones = () => {
    return(
        <div className = "flex-col p-2 pt-0">
            <div className = "text-2xl">
                Milestones
            </div>
            <div className = "mt-6 flex-wrap">
                Break down your job into smaller actionable milestones to help people understand it better. 
                They can also choose to work on individual milestones they find interesting.
            </div>
            <div className = "mt-6">
                <Button type = "primary" label = "Add a new Milestone" />
            </div>
        </div>
    );
}

export default CreateJob;