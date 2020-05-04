import React, { useContext, useEffect } from "react";
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
import LoadingIndicator from "../../Common/LoadingIndicator/LoadingIndicator";
import { Link } from "react-router-dom";
import Button from "../../Common/Button/Button";
import { JobsFeedContext, actions } from "../../../reducers/JobFeedProvider/JobFeedProvider";

const Content = (props) => {
    const { loading: OngoingJobsLoad, error: OngoingJobsError, data: OngoingJobsData } = useQuery(
        GET_YOUR_JOBS, {
            variables: { userId: props.user.id },
            fetchPolicy: "cache-and-network",
        });

    const { state, dispatch } = useContext(JobsFeedContext);

    const { loading: jobsLoading, data: jobsData } = useQuery(
        GET_ALL_JOBS_FILTER, {
            variables: {
                filter: {
                    skills: state.skills,
                    status: state.status,
                }
            },
            fetchPolicy: "cache-and-network",
            onCompleted: (data) => {
                if (data != null && data.allJobs != null) {
                    dispatch({ type: actions.UPDATE_JOBS, value: data.allJobs });
                }
            },
            onError: (error) => {
                console.log(error);
            }
        }
    );



    if (OngoingJobsLoad) {
        return <LoadingIndicator />;
    } else if (OngoingJobsError) return (`Error! ${error.message}`);


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
        onClick={() => { }}
        linkLocation="/createJob"
    />);


    return (
        <div className="h-auto mt-4">
            <OngoingJobsGrid maxCount={2} location="home" title="Ongoing Jobs"
                jobs={ongoingJobs} placeholder={(<div></div>)} />

            <div className="flex mt-4 h-12 w-full cursor-default">
                <div
                    className="flex bg-white rounded items-center pl-4 pr-2 cursor-pointer transition duration-150 hover:bg-nebula-blue-light hover:text-nebula-blue">
                    <h4 className="text-lg font-semi-bold pr-1">Explore Jobs</h4>
                </div>
                <div className="flex-1" />
                <Link to="/createJob"><Button label="Create a new Job"
                    type="primary" /></Link>
            </div>
            <JobList jobs={state.jobs}
                placeholder={placeholder} />
        </div>
    );
};

const mapStateToProps = state => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps)(Content);
