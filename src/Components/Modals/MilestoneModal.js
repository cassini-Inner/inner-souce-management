import React from "react";
import TextInput from "../Common/InputFields/TextInput";
import TextAreaInput from "../Common/InputFields/TextAreaInput";
import Dropdown from "../Common/Dropdown/Dropdown";
import Button from "../Common/Button/Button";

const MilestoneModal = (props) => {
    return (
        <div className="fixed w-screen h-screen flex justify-center items-center z-50">
            <div className="w-full h-full fixed bg-black opacity-25">
            </div>
            <div id="modal" className="flex-col fixed  w-screen h-screen  bg-white p-6 justify-end items-end md:w-auto md:h-auto ">
                <div id="header" className="text-lg mb-2"><h1 className = "text-2xl">Milestone #{ props.modalState.modal.payload.milestoneNo }</h1></div>
                <hr />
                <div id="content" className="mt-4 mb-4 bg-white max-w-xl">
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
                </div>
                <hr />
                <div id="footer" className="mt-2 flex-col">
                    {
                        props.modalState.modal.payload.information ?
                            <div id="information" className="flex-1 p-2">
                                {props.modalState.modal.payload.information}
                            </div> : ""
                    }
                    <div className = "flex flex-row justify-between" >
                        <div className = "flex-1">
                            <Button type = "error" label = "Delete Milestone" />
                        </div>
                        <div className = "flex">
                            <Button type = "secondary" label = "Discard" className = "mr-4" onClick = { props.closeModal } />
                            <Button type = "primary" label = "Save Milestone" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};


export default MilestoneModal;