import React from "react";
import Dropdown from "../Common/Dropdown/Dropdown";
import Button from "../Common/Button/Button";
import SearchTagsInput from "../Common/InputFields/SearchTagsInput";


const FilterModal = (props) => {

    return (
        <div id="modal" className = "flex-col fixed  w-screen h-screen  bg-white p-6 justify-end items-end md:w-auto md:h-auto ">
            <div id="header" className="text-lg mb-2">
                <h1 className="text-2xl">Filter Jobs</h1>
            </div>
            <hr />
            <div id="content" className="mt-4 mb-4 bg-white max-w-xl">
                <div className="flex-col w-full my-2">
                    <div className="flex mr-64">
                        <Dropdown title="Sort By" label="Oldest" list={["Some", "Sample", "Data"]} />
                        <div className="m-4" />
                        <Dropdown title="Job status" label="Open" list={["Some", "Sample", "Data"]} />
                    </div>
                    <h2 className="text-base mt-6">Job Tags</h2>
                    <SearchTagsInput placeholder="Search for tags to add" className="mb-16" />
                </div>
            </div>
            <hr />
            <div id="footer" className="mt-2 flex-col">
                <div id="buttons" className="p-2">
                    <div className="flex">
                        <div className="flex-1">
                            <div className="flex">
                                <Button type="secondary" label = "Cancel" onClick = { props.closeModal } />
                                <div className="m-1" />
                                <Button type="primary" label = "Apply Filter" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterModal;