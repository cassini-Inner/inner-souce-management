import React, { Component } from 'react';
import JobList from '../JobList';
import OngoingJobs from '../YourJobs/OngoingJobs';

class Content extends Component {
    render() {
        return (
            <div className="h-auto mt-4">
                <OngoingJobs maxCount = {1} location = "home" />
                <JobList title = "Explore Jobs" setModalState = { this.props.setModalState } />
            </div>
        );
    }
}

export default Content;