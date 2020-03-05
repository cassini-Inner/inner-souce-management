import React, { Component } from 'react';
import { Button, InfoTag, AuthorInfo, StatusTag, Dropdown } from './CommonComponents';
import { exploreJobs } from "../../assets/placeholder";
import { FilterIcon } from "./Icons";



class JobList extends Component {

    state = {
        filterModal: false,
    }

    modalHeader = <h1 className="text-2xl">Filter Jobs</h1>;
    modalContent =  <div className="flex w-full my-2">
                        <Dropdown title="Sort By" name="Oldest" />
                        <Dropdown title="Job status" name="Open" />
                    </div>;

    closeFilterModal = () => {
        this.props.setModalState({
            display: false,
        });
    }

    openFilterModal = () => {
        this.props.setModalState({
            display: true,
            header: this.modalHeader,
            content: this.modalContent,
            information: "Some other info ",
            buttons: <button onClick={this.closeFilterModal}>Close modal</button>,
        });
    }

    render() {
        return (
            <div>
                <div className="flex w-full mt-6 px-4 md:px-0">
                    <h1 className="text-2xl flex-1 ">{this.props.title}</h1>
                </div>
                <div className=" px-4 md:px-0">
                    {this.props.title == "Explore Jobs" ? <Options setModalState={this.openFilterModal} /> : ""}
                </div>
                {
                    exploreJobs.map(data => {
                        return (
                            <div className="w-full p-6 bg-white mt-5  border border-transparent hover:border-nebula-grey-400" key={data.title}>
                                <h1 className="text-xl font-semibold">{data.title}</h1>
                                <div className="mt-2 text-nebula-grey-600 mb-8">
                                    {data.description}
                                </div>
                                <div className="flex mb-4 flex-wrap">
                                    <div className="flex flex-1 flex-wrap ">
                                        <div className="mr-6">
                                            <InfoTag title="MILESTONES" data={data.noMilestones + " Milestones"} />
                                        </div>
                                        <div className="mr-6">
                                            <InfoTag title="DIFFICULTY" data={data.difficulty} />
                                        </div>
                                        <div className="mr-6">
                                            <InfoTag title="DURATION" data={data.duration} />
                                        </div>
                                        <div className="mr-6">
                                            <InfoTag title="SKILLS NEEDED" data={data.skills} />
                                        </div>
                                    </div>
                                    <AuthorInfo />
                                </div>
                                <hr />
                                <div className="flex flex-wrap mt-4 justify-left">
                                    <div className="flex-1">
                                        <div className="flex">
                                            <div><StatusTag statusTag={data.status} /></div>
                                            <div className="text-nebula-grey-600 ml-6 text-sm">{"created on " + data.date}</div>
                                        </div>
                                    </div>
                                    <a href="#" className="cursor-pointer text-sm font-semibold text-nebula-blue hover:text-blue-700 px-4">View Details</a>
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
        <div className="flex mt-4 h-12">
            <div className="flex bg-white rounded items-center pl-4 pr-2 cursor-pointer hover:bg-nebula-blue-light hover:text-nebula-blue" onClick={props.setModalState}>
                <h4 className="text-lg font-semi-bold pr-1">Filter Jobs</h4>
                <FilterIcon class="ml-4 h-5 w-5 stroke-current text-bg-nebula-blue" />
            </div>
            <div className="flex-1" />
            <Button name="Add a new Job" type="primary" />
        </div>
    );
}



export default JobList;