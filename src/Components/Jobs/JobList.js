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


const JobList = ({ jobs, placeholder }) => {

    return (<div>

        {
            jobs && (jobs.length > 0) &&
            jobs.map((job, key) =>
                <JobCard key={key} data={job} />
            )
        }
        {
            (!jobs || (jobs.length === 0)) && placeholder &&
            placeholder
        }
    </div>)
}

export default JobList
