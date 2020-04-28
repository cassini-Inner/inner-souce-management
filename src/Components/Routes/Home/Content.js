import React  from "react";
import JobList from "../../Jobs/JobList";
import OngoingJobsGrid from "../../Jobs/OngoingJobsGrid";
import { GET_ALL_JOBS_FILTER, GET_YOUR_JOBS } from "../../../queries";
import { GET_USER_ONGOING_JOBS } from "../../../queries";
import { GET_USER_SKILLS } from "../../../queries"; 
import {useQuery} from "@apollo/client";
import {connect} from "react-redux";

const Content = (props) => {
    const {loading, error, data} = useQuery(GET_USER_SKILLS, { variables: {userId: props.user.id} , fetchPolicy:"cache-and-network"});
    const {loading: OngoingJobsLoad, error: OngoingJobsError, data:OngoingJobsData} = useQuery(GET_YOUR_JOBS, { variables: {userId: props.user.id} , fetchPolicy:"cache-and-network"});

    if (loading || OngoingJobsLoad) return "Loading...";
    else if (error) return (`Error! ${error.message}`);

    const userSkills = data.User.skills ? data.User.skills.map((skill, key) => skill.value): [];
    const ongoingJobs = (OngoingJobsData.User.appliedJobs.filter((job) =>
        job.applicationStatus=== "accepted" && job.userJobStatus==="ongoing" ?  job.job :  null)).map((application) => application.job);

    return (
        <div className="h-auto mt-4">
            <OngoingJobsGrid maxCount = {2} location = "home" title = "Ongoing Jobs" jobs={ongoingJobs} />
            <JobList title = "Explore Jobs" location = "home" query = {GET_ALL_JOBS_FILTER} userSkills = {userSkills} />
        </div>
    );
};

const mapStateToProps = state => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps)(Content);
