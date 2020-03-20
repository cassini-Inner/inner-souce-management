import React, { Component, Fragment } from 'react';
import { exploreJobs, explore } from "../../../assets/placeholder";
import * as Icons from "react-feather";
import { Link } from 'react-router-dom';
import Button from '../Common/Button/Button'
import * as actionType from '../../Store/actions';
import JobCard from './JobCard'
import { connect } from 'react-redux';

class JobList extends Component {

    state = {
        filterModal: false,
    };

    closeFilterModal = () => {
        this.props.setModalState({
            display: false,
        });
    };

    openFilterModal = () => {
        this.props.setModalState({
            display: true,
            header: this.getModalHeader(),
            content: this.getModalContent(),
            buttons: this.getModalButtons(),
        });
    };

    getModalHeader = () => {
        return (
            <h1 className="text-2xl">Filter Jobs</h1>
        );
    };

    getModalButtons = () => {
        return (
            <div className="flex">
                <div className="flex-1">
                    <div className="flex">
                        <Button type="secondary" label="Cancel" onClick={this.closeFilterModal} />
                        <div className="m-1" />
                        <Button type="primary" label="Apply Filter" />
                    </div>
                </div>
            </div>
        );
    };

    getModalContent = () => {
        return (
            <div className="flex-col w-full my-2">
                <div className="flex mr-64">
                    <Dropdown title="Sort By" label="Oldest" list={["Some", "Sample", "Data"]} />
                    <div className="m-4" />
                    <Dropdown title="Job status" label="Open" list={["Some", "Sample", "Data"]} />
                </div>
                <h2 className="text-base mt-6">Job Tags</h2>
                <SearchBar className="mt-2 mb-40 bg-nebula-grey-200 " inputClass="placeholder-nebula-grey-600 bg-nebula-grey-200" placeholder="Search for tags to add" /> */}
                <SearchTagsInput placeholder="Search for tags to add" className="mb-16" />
            </div>
        );
    };


    render() {
        return (
            <div className="cursor-default ">
                <div className=" w-full mt-6 ">
                    <h1 className="text-2xl flex-1 " id={this.props.title}>{this.props.title}</h1>
                    {this.props.title == explore ? <Options setModalState={this.props.openFilterModal} /> : ""}
                </div>
                {
                    exploreJobs.map(data => {
                        return (
                          <JobCard data={data}/>
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
                <Icons.Filter className="ml-4 h-5 w-5 stroke-current text-bg-nebula-blue" />
            </div>
            <div className="flex-1" />
            <Link to="/createJob"><Button label="Create a new Job" type="primary" /></Link>
        </div>
    );
};


const mapStateToProps = state => {
    return {
        filterModal: state.modal.display
    };
}

const mapDispatchToProps = dispatch => {
    return {
        openFilterModal: () => dispatch({ type: actionType.OPEN_MODAL, modalType: "filter"})
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(JobList);
