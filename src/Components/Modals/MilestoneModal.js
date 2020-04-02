import React from "react";
import TextInput from "../Common/InputFields/TextInput";
import TextAreaInput from "../Common/InputFields/TextAreaInput";
import SearchTagsInput from "../Common/InputFields/SearchTagsInput";
import Dropdown from "../Common/Dropdown/Dropdown";
import Button from "../Common/Button/Button";
import ModalContainer from "./ModalContainer";
import PropTypes from "prop-types";
const MilestoneModal = (props) => {
    return (
        <ModalContainer>
            <div id="header" className="text-lg mb-4"><h1 className="text-lg">Milestone #{props.milestoneNo}</h1></div>
            <hr />
            <div id="content" className="mt-4 mb-10 bg-white w-full h-full">
                <div className="flex flex-col">
                    <TextInput placeholder="Title of the Milestone" label="Title" className="w-full" />
                    <TextAreaInput className="my-4" rows="3" label="Description" placeholder="Add a clear description of the Milestone" />
                    <div className="flex py-4 flex-col md:flex-row">
                        <div className="flex-col flex-1">
                            <h2 className="text-sm font-semibold">Duration</h2>
                            <p className="text-sm text-nebula-grey-600">How long do you think completing this milestone will take?</p>
                        </div>
                        <div className="flex flex-1 ml-4">
                            <TextInput className="mr-2 w-24 self-center" placeholder="Duration" />
                            <Dropdown className="self-center" list={["Weeks", "Days", "Months"]} />
                        </div>
                    </div>
                    <h2 className="text-sm font-semibold mt-4">Skills Required</h2>
                    <SearchTagsInput />
                    <h2 className="text-sm font-semibold my-4">Milestone Resolution Method</h2>
                    <TextInput placeholder="eg. Accepted Github pull request" />
                </div>
            </div>
            <div id="footer" className="py-4 sticky bottom-0 bg-white">
                {
                    props.information ?
                        <div id="information" className="flex-1 p-2">
                            {props.information}
                        </div> : ""
                }
                <div className="flex flex-col justify-between flex-wrap md:flex-row" >
                    <div className="flex-1 mt-2">
                        <Button type="error" className="w-full md:w-auto" label="Delete Milestone" />
                    </div>
                    <div className="flex mt-2">
                        <Button type="secondary" label="Discard" className="w-full md:w-auto mx-1" onClick={props.closeModal} />
                        <Button type="primary" label="Save Milestone" className="w-full md:w-auto mx-1" />
                    </div>
                </div>
            </div>

        </ModalContainer>

    );
};

MilestoneModal.propTypes = {
    closeModal: PropTypes.func,
    milestoneNo: PropTypes.number,
    information: PropTypes.string,
};

export default MilestoneModal;
