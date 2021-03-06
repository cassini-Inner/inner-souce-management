import React from "react";
import TextInput from "../Common/InputFields/TextInput";
import TextAreaInput from "../Common/InputFields/TextAreaInput";
import Dropdown from "../Common/Dropdown/Dropdown";
import Button from "../Common/Button/Button";
import ModalContainer from "./ModalContainer";
import PropTypes from "prop-types";
import { useSkills } from "../../hooks/useSkills/hook";
import { SkillsInput } from "../Common/InputFields/SkillsInput";
const MilestoneModal = (props) => {

    const { skills, addSkill, removeSkill } = useSkills(props.milestone ? props.milestone.skills : []);

    return (
        <ModalContainer>
            <div id="header" className="text-lg mb-4"><h1 className="text-lg">Milestone #{props.milestoneNo}</h1></div>
            <hr />
            <div id="content" className="mt-4 mb-10 bg-white w-full h-full">
                <div className="flex flex-col">
                    <TextInput id="milestonetitle" placeholder="Title of the Milestone" label="Title" className="w-full" onChange={props.onChange} value={props.editMilestoneState ? props.milestone.title : ""} />
                    {props.milestone.errorMessages && props.milestone.errorMessages.titleErr ? <div className="mt-2 text-nebula-red" >{props.milestone.errorMessages.titleErr}</div> : ""}
                    <TextAreaInput id="milestonedescription" className="my-4" rows="3" label="Description" placeholder="Add a clear description of the Milestone" onChange={props.onChange} value={props.editMilestoneState ? props.milestone.description : ""} />
                    {props.milestone.errorMessages && props.milestone.errorMessages.descriptionErr ? <div className="text-nebula-red" >{props.milestone.errorMessages.descriptionErr}</div> : ""}
                    <div className="flex py-4 flex-col md:flex-row md:items-center">
                        <div className=" flex flex-col flex-1">
                            <h2 className="text-sm font-semibold">Duration</h2>
                            <p className="text-sm text-nebula-grey-600">How long do you think completing this milestone will take?</p>
                        </div>
                        <div className="flex flex-row ml-4 items-center ">
                            <TextInput id="milestoneduration" number min="1" className="mr-2 w-24 self-center" placeholder="Duration" onChange={props.onChange} value={props.editMilestoneState ? props.milestone.duration : ""} />
                            <Dropdown id="milestonedurationUnit" className="self-center flex-1 w-full" list={["Weeks", "Days", "Months"]} onChange={props.onChange} value={props.editMilestoneState ? props.milestone.durationUnit : null} />
                        </div>
                    </div>
                    {props.milestone.errorMessages && props.milestone.errorMessages.durationErr ? <div className="mt-2 text-nebula-red" >{props.milestone.errorMessages.durationErr}</div> : ""}


                    <SkillsInput label="Skills Required" addSkill={addSkill} removeSkill={removeSkill} skills={skills} skillAddCallback={props.getTagList} />
                    {props.milestone.errorMessages && props.milestone.errorMessages.skillsErr ? <div className="mt-2 text-nebula-red" >{props.milestone.errorMessages.skillsErr}</div> : ""}


                    <TextInput
                        label="Milestone Resolution Method"
                        id="milestoneresolution"
                        value={props.editMilestoneState ? props.milestone.resolution : ""}
                        placeholder="eg. Accepted Github pull request"
                        onChange={props.onChange}
                    />
                    {props.milestone.errorMessages && props.milestone.errorMessages.resolutionErr ? <div className="mt-2 text-nebula-red" >{props.milestone.errorMessages.resolutionErr}</div> : ""}
                </div>
            </div>
            <div id="footer" className="py-4 sticky bottom-0 bg-white">
                <div className="flex flex-col justify-between flex-wrap md:flex-row" >
                    <div className="flex-1 mt-2">
                        {
                            props.editMilestoneState ?
                                <Button type="error" className="w-full md:w-auto" label="Delete Milestone" onClick={props.deleteMilestone} />
                                : ""
                        }
                    </div>
                    <div className="flex mt-2">
                        <Button type="secondary" label="Discard" className="w-full md:w-auto mx-1" onClick={props.closeModal} />
                        <Button type="primary" label="Save Milestone" className="w-full md:w-auto mx-1" onClick={props.saveMilestone} />
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
