import React from "react";
import TextInput from "../Common/InputFields/TextInput";
import TextAreaInput from "../Common/InputFields/TextAreaInput";
import Dropdown from "../Common/Dropdown/Dropdown";
import Button from "../Common/Button/Button";

const MilestoneModal = (props) => {
    return (
            <div id="modal" className="absolute self-center w-screen h-screen flex-col fixed bg-white p-6 md:w-auto md:h-auto z-50">
                <div id="header" className="text-lg mb-2"><h1 className = "text-2xl">Milestone #{ props.milestoneNo }</h1></div>
                <hr />
                <div id="content" className="mt-4 mb-10 bg-white w-full h-full">
                    <div className = "flex flex-col mr-64">
                        <h2 className = "text-xl font-semibold" >Title</h2>
                        <TextInput placeholder = "Title of the Milestone" className = "my-4 w-full" />
                        <h2 className = "text-xl font-semibold my-4" >Description</h2>
                        <TextAreaInput className = "my-4" rows = "3" placeholder = "Add a clear description of the Milestone"/>
                        <div className = "flex my-4 py-4">
                            <div className = "flex-col flex-1">
                                <h2 className = "text-xl font-semibold mb-4">Duration</h2>
                                <p>How long do you think completing this milestone will take?</p>
                            </div>
                            <div className = "flex ml-6 mt-6">
                                <TextInput className="mr-2 w-24 self-center" placeholder = "Duration" />
                                <Dropdown className = "self-center" list = {["Weeks", "Days", "Months"]} />
                            </div>
                        </div>
                        <h2 className = "text-xl font-semibold my-4">Milestone Resolution Method</h2>
                        <TextInput placeholder = "eg. Accepted Github pull request" />
                    </div>
                </div>
                <hr />
                <div id="footer" className="mt-2 flex-col">
                    {
                        props.information ?
                            <div id="information" className="flex-1 p-2">
                                {props.information}
                            </div> : ""
                    }
                    <div className = "flex flex-row justify-between" >
                        <div className = "flex-1">
                            <Button type = "error" label = "Delete Milestone" />
                        </div>
                        <div className = "flex">
                            <Button type = "secondary" label = "Discard" className = "mr-4" onClick = { props.closeMilestoneModal } />
                            <Button type = "primary" label = "Save Milestone" />
                        </div>
                    </div>
                </div>

            </div>
    );
};


export default MilestoneModal;