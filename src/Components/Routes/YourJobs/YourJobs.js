import React, { Fragment, useState, useContext } from "react";
import Navbar from "../../Navigation/Navbar/Navbar";
import { Redirect, Route, withRouter } from "react-router";
import TabStrip from "../../Common/TabStrip/TabStrip";
import { useQuery } from "@apollo/client";
import { GET_YOUR_JOBS } from "../../../queries";
import { connect } from "react-redux";
import OngoingJobsGrid from "../../Jobs/OngoingJobsGrid";
import Placeholder from "../../Placeholders/placeholder";
import JobList from "../../Jobs/JobList";
import LoadingIndicator from "../../Common/LoadingIndicator/LoadingIndicator";
import { AuthenticationContext } from "../../../hooks/useAuthentication/provider";
// To get the tabs(Working on, awaiting approval..) values
const YourJobs = (props) => {

    //Query to get your jobs
    return (
        <Fragment>
            {
                location.pathname === "/yourJobs" ? props.history.push(
                    props.match.url + "/ongoing") : ""
            }
            <div className="px-4 lg:px-10">
                <Navbar />
                <div className="h-auto pb-4">
                        <div className="text-xl font-semibold flex-1 py-4">
                            Your Jobs
                        </div>
                    <div className="my-2" />
                </div>
                <YourJobsBody
                    {...props}
                />
            </div>
        </Fragment>
    );
};


const YourJobsBody = (props) => {
    const { user } = useContext(AuthenticationContext);

    const intialState = {
        tabList: [
            {
                title: "Working On",
                location: "ongoing",
                count: 0,
            },
            {
                title: "Awaiting Approval",
                location: "applications",
                count: 0,
            },
            {
                title: "Completed",
                location: "completed",
                count: 0,
            },
        ],
        appliedJobs: [],
        ongoingJobs: [],
        completedJobs: [],
    };
    const [state, updateState] = useState(intialState);
    const { loading: yourJobsInfoLoading, error: yourJobsInfoError, data } = useQuery(
        GET_YOUR_JOBS, {
            variables: { userId: user.id },
            fetchPolicy: "network-only",
            onCompleted: data1 => {
                const jobs = data1.User.appliedJobs;
                // console.log(data1);
                const appliedJobs = [];
                const ongoingJobs = [];
                const completedJobs = [];
                if (jobs) {
                    jobs.forEach(appliedJob => {
                    // If application status is pending and job status is either open or ongoing then the user is awaiting approval
                        if (appliedJob.userJobStatus.toUpperCase() !==
                        "COMPLETED" &&
                        appliedJob.applicationStatus.toUpperCase() ===
                        "PENDING") {
                            appliedJobs.push(appliedJob.job);
                        }
                        // If application status is accepted and job status is ongoing then the user is currently working on the job
                        if (appliedJob.userJobStatus.toUpperCase() ===
                        "ONGOING" &&
                        appliedJob.applicationStatus.toUpperCase() ===
                        "ACCEPTED") {
                            ongoingJobs.push(appliedJob.job);
                        }
                        // If the application status is accepted and job status is completed then the job the user has taken(maybe milestones) is completed
                        if (appliedJob.userJobStatus.toUpperCase() ===
                        "COMPLETED" &&
                        appliedJob.applicationStatus.toUpperCase() ===
                        "ACCEPTED") {
                            completedJobs.push(appliedJob.job);
                        }
                    });
                    updateState({
                        tabList: [
                            {
                                title: "Working On",
                                location: "ongoing",
                                count: ongoingJobs.length,
                            },
                            {
                                title: "Awaiting Approval",
                                location: "applications",
                                count: appliedJobs.length,
                            },
                            {
                                title: "Completed",
                                location: "completed",
                                count: completedJobs.length,
                            },
                        ],
                        ongoingJobs: ongoingJobs,
                        appliedJobs: appliedJobs,
                        completedJobs: completedJobs,
                    });
                }
            },
        });
    const OngoingJobsPlaceholder = (
        <Placeholder
            heading="You don’t have any ongoing jobs."
            body="You can always head to explore new jobs or projects and apply to them!"
            onClick={() => <Redirect to="/" />}
            buttonLabel="Explore Jobs"
            image="../../../assets/images/explore_jobs_placeholder.svg"
            linkLocation="/"
        />
    );
    const JobApplicationsPlaceholder = (
        <Placeholder
            heading="You’ll find your pending job applications here"
            body="You currently don't have any pending applications. Once you do, your applications will appear here."
            onClick={() => <Redirect to="/" />}
            buttonLabel="Explore Jobs"
            image="../../../assets/images/explore_jobs_placeholder.svg"
            linkLocation="/"
        />
    );
    const CompletedJobsPlaceholder = (
        <Placeholder
            heading="Completed jobs will appear here"
            body="You haven’t completed any jobs yet. Once you do, your completed jobs will appear here."
            onClick={() => <Redirect to="/" />}
            buttonLabel="Explore Jobs"
            image="../../../assets/images/explore_jobs_placeholder.svg"
            linkLocation="/"
        />
    );
    return (
        <Fragment>
            <TabStrip tabs={state.tabList} />
            {
                yourJobsInfoLoading &&
                <LoadingIndicator />
            }
            {
                !yourJobsInfoLoading && !yourJobsInfoError &&
                <div>
                    <Route exact path={props.match.url + "/ongoing"}
                        component={() => {
                            return <OngoingJobsGrid
                                jobs={state.ongoingJobs}
                                placeholder={OngoingJobsPlaceholder}
                            />;
                        }} />
                    <Route exact
                        path={props.match.url + "/applications"}
                        component={() => {
                            return <JobList
                                jobs={state.appliedJobs}
                                placeholder={JobApplicationsPlaceholder}
                            />;
                        }
                        }
                    />
                    <Route exact path={props.match.url + "/completed"}
                        component={() => <JobList
                            jobs={state.completedJobs}
                            placeholder={CompletedJobsPlaceholder}
                        />}
                    />
                </div>
            }
        </Fragment>
    );
};
export default (withRouter(YourJobs));
