import React, { Component } from "react";
import JobList from "../../Jobs/JobList";
import OngoingJobsGrid from "../../Jobs/OngoingJobsGrid";
import { GET_ALL_JOBS_FILTER } from '../../../queries';
import { GET_USER_ONGOING_JOBS } from "../../../queries";

class Content extends Component {

    //ToDo Get user id of the currently logged in user
    ongoingJobsVariables = { 
        userId: "3" 
    }

    exploreJobsFilter = { 
        "filter":{
            "status": ["OPEN","ONGOING"],
            "skills": ["nodejs", "spring", "react", "golang"], 
            "sortOrder": "NEWEST" 
        }
    }

    render() {
        return (
            <div className="h-auto mt-4">
                <OngoingJobsGrid maxCount = {1} location = "home" title = "Ongoing Jobs" query = {GET_USER_ONGOING_JOBS} queryVariables = {this.ongoingJobsVariables} />
                <JobList title = "Explore Jobs" type = "exploreJobs" query = {GET_ALL_JOBS_FILTER} queryVariables = {this.exploreJobsFilter} />
            </div>
        );
    }
}

export default Content;
