import React, { Component, Fragment } from 'react';
import { Button, InfoTag, AuthorInfo, StatusTag, Dropdown, SearchBar } from './CommonComponents';
import { exploreJobs, explore } from "../../assets/placeholder";
import { FilterIcon } from "./Icons";

class JobList extends Component {

    state = {
        filterModal: false,
    }

    closeFilterModal = () => {
        this.props.setModalState({
            display: false,
        });
    }

    openFilterModal = () => {
        this.props.setModalState({
            display: true,
            header: this.getModalHeader(),
            content: this.getModalContent(),
            buttons: this.getModalButtons(),
        });
    }

    getModalHeader = () => {
        return (
            <h1 className="text-2xl">Filter Jobs</h1>
        );
    }

    getModalButtons = () => {
        return (
            <div className="flex">
                {/* <div className="flex-1"></div> */}
                <div className="flex-1">
                    <div className="flex">
                        <Button type="secondary" label="Cancel" onClick={this.closeFilterModal} />
                        <div className="m-1"></div>
                        <Button type="primary" label="Apply Filter" />
                    </div>
                </div>
            </div>
        );
    }

    getModalContent = () => {
        return (
            <div className="flex-col w-full my-2">
                <div className="flex mr-64">
                    <Dropdown title="Sort By" label="Oldest" list = {["Some", "Sample", "Data"]} />
                    <div className="m-4"></div>
                    <Dropdown title="Job status" label="Open" list = {["Some", "Sample", "Data"]} />
                </div>
                <h2 className="text-base mt-6">Job Tags</h2>
                <p className="text-nebula-grey-500 mt-1 mb-2 text-sm">No tags added</p>
                <SearchBar className="mt-2 mb-40 bg-nebula-grey-200 " inputClass="placeholder-nebula-grey-600 bg-nebula-grey-200" placeholder="Search for tags to add" />
            </div>
        );
    }


    render() {
        return (
            <div className="cursor-default ">
                <div className=" w-full mt-6 ">
                    <h1 className="text-2xl flex-1 " id={this.props.title}>{this.props.title}</h1>
                    {this.props.title == explore ? <Options setModalState={this.openFilterModal} /> : ""}
                </div>
                {
                    exploreJobs.map(data => {
                        return (
                            <div className="w-full p-6 bg-white mt-5 transition duration-300 shadow-none hover:shadow-lg " key={data.title}>
                                <h1 className="text-lg font-semibold">{data.title}</h1>
                                <div className="mt-2 text-base leading-normal text-nebula-grey-600 mb-8">
                                    {data.description}
                                </div>
                                <div className="flex mb-4 flex-wrap">
                                    <div className="flex flex-1 justify-evenly md:justify-start">
                                        <div className="flex flex-1 flex-col md:flex-row md:flex-initial">
                                            <div className="mr-6">
                                                <InfoTag title="MILESTONES" data={data.noMilestones + " Milestones"} />
                                            </div>
                                            <div className="mr-6 mt-4 md:mt-0">
                                                <InfoTag title="DIFFICULTY" data={data.difficulty} />
                                            </div>
                                        </div>
                                        <div className="flex flex-1 flex-col md:flex-row md:flex-initial">
                                            <div className="mr-6">
                                                <InfoTag title="DURATION" data={data.duration} />
                                            </div>
                                            <div className="mr-6 mt-4 md:mt-0">
                                                <InfoTag title="SKILLS NEEDED" data={data.skills} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 md:mt-0">
                                        <AuthorInfo />
                                    </div>
                                </div>
                                <hr />
                                <div className="flex flex-col flex-wrap mt-4 justify-left md:flex-row">
                                    <div className="flex-1">
                                        <div className="flex items-center">
                                            <div><StatusTag statusTag={data.status} /></div>
                                            <div className="text-nebula-grey-600 ml-2 text-sm">{"created on " + data.date}</div>
                                        </div>
                                    </div>
                                    <div className="py-4 md:py-0">
                                        <a href="#" className="cursor-pointer text-sm font-semibold text-nebula-blue hover:text-blue-700">View Details</a>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

const Options = (props) => {
    return (
        <div className="flex mt-4 h-12 w-full cursor-default">
            <div className="flex bg-white rounded items-center pl-4 pr-2 cursor-pointer transition duration-150 hover:bg-nebula-blue-light hover:text-nebula-blue" onClick={props.setModalState}>
                <h4 className="text-lg font-semi-bold pr-1">Filter Jobs</h4>
                <FilterIcon class="ml-4 h-5 w-5 stroke-current text-bg-nebula-blue" />
            </div>
            <div className="flex-1" />
            <a href="/createJob"><Button label="Create a new Job" type="primary" /></a>
        </div>
    );
}


export default JobList;