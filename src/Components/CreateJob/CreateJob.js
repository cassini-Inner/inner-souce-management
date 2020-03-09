import React, { Component, Fragment } from "react";
import { TextInput } from "../CommonComponents";

class CreateJob extends Component {

    render() {
        return (
            <div className = "bg-white flex-col p-4 w-full">
                <h2 className = "text-xl font-semibold mt-2">Job Title</h2> 
                <TextInput className = "mt-2" placeholder = "Give your Job a small title" /> 
                <h2 className = "text-xl font-semibold mt-10">Job Description</h2> 
                <TextInput className = "mt-2" placeholder = "Enter a brief overview of the job" /> 
                <div className = "flex mt-10">

                    <div className = "flex-col flex-1 pr-1">
                        <h2 className = "text-xl font-semibold">Duration</h2>
                        <p>How soon do you expect the job to be finished?</p>
                    </div>
                    <div className = "flex">
                        <TextInput placeholder = "Duration" /> 
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateJob;