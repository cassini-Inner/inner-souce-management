import React from "react";
import Dropdown from "../Common/Dropdown/Dropdown";
import Button from "../Common/Button/Button";
import SearchTagsInput from "../Common/InputFields/SearchTagsInput";
import ModalContainer from "./ModalContainer";
import PropTypes from "prop-types";

const FilterModal = (props) => {
    return (
        <ModalContainer>
            <div id="header" className="text-lg mb-2">
                <h1 className="text-2xl">Filter Jobs</h1>
            </div>
            <hr />
            <div id="content" className="mt-4 mb-4 bg-white max-w-xl">
                <div className="flex-col w-full my-2">
                    <div className="flex mr-64">
                        <Dropdown title="Sort By" list={["NEWEST", "OLDEST"]} onChange = {props.sortDropdown} />
                        <div className="m-4" />
                        <Dropdown title="Job status" value={jobStatusValue?jobStatusValue == ["OPEN"]} list={["OPEN & ONGOING", "OPEN", "ONGOING", "COMPLETED"]} onChange = {props.jobStatusDropdown} />
                    </div>
                    <h2 className="text-base mt-6">Job Tags</h2>
                    <SearchTagsInput getTagList={props.getTagList} placeholder="Search for tags to add" className="mb-16" />
                </div>
            </div>
            <hr />
            <div id="footer" className="mt-2 flex-col">
                <div id="buttons" className="flex-row">
                    <div className="flex flex-wrap-reverse lg:flex-row-reverse">
                        <Button className="flex-1 mb-4 mt-1 lg:flex-grow-0" type="secondary" label = "Cancel" onClick = { props.closeModal } />
                        <div className="m-1" />
                        <Button  className="flex-1 mb-4 mt-1 lg:flex-grow-0" type="primary" label = "Apply Filter" onClick = { props.applyFilter } />
                        <div className="m-1" />
                        <Button className="flex mb-4 mt-1 lg:flex-grow-0" type="error" label = "Reset" onClick = { props.resetFilter } />
                    </div>
                </div>
            </div>
        </ModalContainer>
    );
};

FilterModal.propTypes = {
    closeModal : PropTypes.func,
};

export default FilterModal;
