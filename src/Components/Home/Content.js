import React, { Component } from 'react';
import JobList from './JobList';
import OngoingJobs from '../YourJobs/OngoingJobs';

class Content extends Component {
    render() {
        return(
            <div className="h-auto ml-10 mt-4 mr-24">
                <OngoingJobs />
                <JobList title="Explore Jobs"/>
            </div>
        );
    }
}

export default Content;