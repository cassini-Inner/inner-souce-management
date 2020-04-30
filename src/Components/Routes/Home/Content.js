import React from "react";
import JobList from "../../Jobs/JobList";
import OngoingJobsGrid from "../../Jobs/OngoingJobsGrid";
import {
    GET_ALL_JOBS_FILTER,
    GET_USER_SKILLS,
    GET_YOUR_JOBS,
} from "../../../queries";
import { useQuery } from "@apollo/client";
import { connect } from "react-redux";
import Placeholder from "../../Placeholders/placeholder";
import { Link, Redirect } from 'react-router-dom'

const Content = (props) => {
    const { loading, error, data } = useQuery(GET_USER_SKILLS, {
        variables: { userId: props.user.id },
        fetchPolicy: "cache-and-network",
    });
    const { loading: OngoingJobsLoad, error: OngoingJobsError, data: OngoingJobsData } = useQuery(
        GET_YOUR_JOBS, {
            variables: { userId: props.user.id },
            fetchPolicy: "cache-and-network",
        });

    if (loading || OngoingJobsLoad) {
        return "Loading...";
    } else if (OngoingJobsError) return (`Error! ${error.message}`);

    const userSkills = data.User.skills ? data.User.skills.map(
        (skill, key) => skill.value) : [];

    let ongoingJobs = [];
    if (OngoingJobsData.User.appliedJobs) {
        ongoingJobs = (OngoingJobsData.User.appliedJobs.filter((job) =>
            job.applicationStatus === "accepted" && job.userJobStatus ===
          "ongoing" ? job.job : null)).map((application) => application.job);
    }
    const placeholder = (<Placeholder
        heading="This is your personalised job feed"
        body="You can find projects and tasks based on your skills and interests.
Have an interesting project? You can add that & invite people to collaborate with you."
        buttonLabel="Create a new Job"
        image="../../../../assets/images/explore_jobs_placeholder.svg"
        onClick={() => {}}
        linkLocation="/createJob"
    />);

    return (
        <div className="h-auto mt-4">
            <OngoingJobsGrid maxCount={2} location="home" title="Ongoing Jobs"
                jobs={ongoingJobs} placeholder = {(<div></div>)}/>
            <JobList title="Explore Jobs" location="home"
                query={GET_ALL_JOBS_FILTER} userSkills={userSkills}
                placeholder={placeholder}/>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps)(Content);
