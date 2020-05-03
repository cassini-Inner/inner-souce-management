import React, { Component, Fragment, useContext } from 'react';
import { explore } from '../../../assets/placeholder';
import * as Icons from 'react-feather';
import { Link } from 'react-router-dom';
import Button from '../Common/Button/Button';
import JobCard from './JobCard';
import Portal from '../Containers/Portal';
import ModalViewWithScrim from '../Modals/ModalViewWithScrim';
import FilterModal from '../Modals/FilterModal';
import { Query } from '@apollo/react-components';
import LoadingIndicator from '../Common/LoadingIndicator/LoadingIndicator';
import { JobsFeedContext } from '../../reducers/JobFeedProvider/JobFeedProvider';

const JobList = (props) => {
    const { state, dispatch } = useContext(JobsFeedContext)
    console.log(state);
    return (<div>
        <Options />
        {
            (state.jobs.length > 0) &&
            state.jobs.map((job, key) =>
                <JobCard key={key} data={job} />
            )
        }
    </div>)
}

const Options = (props) => {
    return (
        <div className="flex mt-4 h-12 w-full cursor-default">
            <div
                className="flex bg-white rounded items-center pl-4 pr-2 cursor-pointer transition duration-150 hover:bg-nebula-blue-light hover:text-nebula-blue">
                <h4 className="text-lg font-semi-bold pr-1">Explore Jobs</h4>
            </div>
            <div className="flex-1" />
            <Link to="/createJob"><Button label="Create a new Job"
                type="primary" /></Link>
        </div>
    )
}

export default JobList
