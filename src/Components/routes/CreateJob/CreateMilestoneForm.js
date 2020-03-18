import React from "react";
import TextInput from "../../Common/InputFields/TextInput";
import { TextAreaInput } from "../../Common/InputFields/TextAreaInput";
import Dropdown from "../../Common/Dropdown/Dropdown";
import Button from "../../Common/Button/Button";


const CreateMilestoneForm = (milestoneNo, closeModal) => {

    let title = <h1 className = "text-2xl">Milestone #{ milestoneNo }</h1>;

    let content = (
        <div className = "flex flex-col mr-64">
            <h2 className = "text-xl font-semibold" >Title</h2>
            <TextInput placeholder = "Title of the Milestone" className = "my-4 w-full" />
            <h2 className = "text-xl font-semibold my-4" >Description</h2>
            <TextAreaInput className = "my-4" placeholder = "Add a clear description of the Milestone"/>
            <div className = "flex my-4 py-4">
                <div className = "flex-col flex-1 pr-1">
                    <h2 className = "text-xl font-semibold">Duration</h2>
                    <p>How long do you think completing this milestone will take?</p>
                </div>
                <div className = "flex items-center">
                    <TextInput className="mr-2 w-24" placeholder = "Duration" />
                    <Dropdown list = {["Weeks", "Days", "Months"]} />
                </div>
            </div>
            <h2 className = "text-xl font-semibold my-4">Milestone Resolution Method</h2>
            <TextInput placeholder = "eg. Accepted Github pull request" />
        </div>
    );

    let actions = (
        <div className = "flex flex-row justify-between" >
            <div className = "flex-1">
                <Button type = "error" label = "Delete Milestone" />
            </div>
            <div className = "flex">
                <Button type = "secondary" label = "Discard" className = "mr-4" onClick = { closeModal } />
                <Button type = "primary" label = "Save Milestone" />
            </div>
        </div>
    );

    return(
        {
            title: title,
            content: content,
            actions: actions
        }
    );
};

export default CreateMilestoneForm;
