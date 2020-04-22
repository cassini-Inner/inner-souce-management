import React from "react";
import JobList from "../../Jobs/JobList";
import OngoingJobsGrid from "../../Jobs/OngoingJobsGrid";
import { GET_ALL_JOBS_FILTER } from '../../../queries';
import { GET_USER_ONGOING_JOBS } from "../../../queries";
import { GET_USER_SKILLS } from "../../../queries"; 
import {useQuery} from "@apollo/react-hooks";
import {connect} from "react-redux";

const Content = (props) => {

    //ToDo Get user id of the currently logged in user
    const ongoingJobsVariables = { 
        userId: props.user.id
    }

    //ToDo Get userid of currenlty logged in user 
    const { loading, error, data } = useQuery(GET_USER_SKILLS, { variables: {userId: props.user.id} });
    if (loading) return "Loading...";
    else if (error) return (`Error! ${error.message}`);

    const exploreJobsFilter = { 
        "filter":{
            "status": ["OPEN","ONGOING"],
            // "skills": data.User.skills ? data.User.skills.map((skill, key) => skill.value) : [],
            "skills": ["nodejs", "spring", "react", "golang", "tableau"],  
            "sortOrder": "NEWEST" 
        }
    }

    return (
        <div className="h-auto mt-4">
            <OngoingJobsGrid maxCount = {1} location = "home" title = "Ongoing Jobs" query = {GET_USER_ONGOING_JOBS} queryVariables = {ongoingJobsVariables} />
            <JobList title = "Explore Jobs" type = "exploreJobs" query = {GET_ALL_JOBS_FILTER} queryVariables = {exploreJobsFilter} />
        </div>
    );

}

const mapStateToProps = state => {
    return {
        user: state
    }
}

export default connect(mapStateToProps)(Content);