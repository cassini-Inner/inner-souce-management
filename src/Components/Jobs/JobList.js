import React, { Component, Fragment } from 'react';
import { exploreJobs, explore } from '../../../assets/placeholder';
import * as Icons from 'react-feather';
import { Link } from 'react-router-dom';
import Button from '../Common/Button/Button'
import * as actionType from '../../Store/actions';
import JobCard from './JobCard'
import { connect } from 'react-redux';

class JobList extends Component {

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
