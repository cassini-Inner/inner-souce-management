import React, { Component } from 'react';
import JobList from '../JobList';
import OngoingJobs from '../YourJobs/OngoingJobs';

class Content extends Component {
    render() {
        return (
            <div className="h-auto mt-4">
                <OngoingJobs />
                <JobList title="Explore Jobs" />
            </div>
        );
    }
}

export default Content;