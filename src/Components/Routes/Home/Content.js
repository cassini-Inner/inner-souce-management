import React, { Component } from "react";
import JobList from "../../Jobs/JobList";
import OngoingJobsGrid from "../../Jobs/OngoingJobsGrid";

class Content extends Component {
    render() {
        return (
            <div className="h-auto mt-4">
                <OngoingJobsGrid maxCount = {1} location = "home" title = "Ongoing Jobs" />
                <JobList title = "Explore Jobs" />
            </div>
        );
    }
}

export default Content;
