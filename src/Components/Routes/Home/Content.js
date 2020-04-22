import React, { Component } from "react";
import JobList from "../../Jobs/JobList";
import OngoingJobsGrid from "../../Jobs/OngoingJobsGrid";
import { GET_ALL_JOBS_FILTER } from '../../../queries';

class Content extends Component {
    jobsFilter = { 
        "filter":{
            "status": ["OPEN","ONGOING"],
            "skills": ["nodejs", "spring", "react", "golang"], 
            "sortOrder": "NEWEST" 
        }
    }
    render() {
        return (
            <div className="h-auto mt-4">
                <OngoingJobsGrid maxCount = {1} location = "home" title = "Ongoing Jobs" />
                <JobList title = "Explore Jobs" type = "exploreJobs" query = {GET_ALL_JOBS_FILTER} queryVariables = {this.jobsFilter}/>
            </div>
        );
    }
}

export default Content;
