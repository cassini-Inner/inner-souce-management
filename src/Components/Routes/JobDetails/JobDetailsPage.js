import React, { Fragment, useState, useRef, useContext } from "react";
import JobInformation from "./JobInformation";
import MilestonesList from "../../Milestones/MilestonesList";
import Button from "../../Common/Button/Button";
import TabStrip from "../../Common/TabStrip/TabStrip";
import Discussions from "./Discussions";
import Applications from "./Applications";
import { withRouter, Redirect } from "react-router";
import { Route } from "react-router-dom";
import { ArrowLeft } from "react-feather";
import WorkingUsers from "./WorkingUsers";
import { useQuery } from "@apollo/client";
import LoadingIndicator from "../../Common/LoadingIndicator/LoadingIndicator";
import {
    GET_JOB_APPLICANTS,
    GET_JOB_INFO,
} from "../../../queries";
import { DELETE_JOB, APPLY_TO_JOB, WITHDRAW_JOB_APPLICATION } from "../../../mutations";
import { useMutation } from "@apollo/client";
import { AuthenticationContext } from "../../../hooks/useAuthentication/provider";

const JobDetailsPage = (props) => {

    const { user } = useContext(AuthenticationContext);

    const initialState = {
        isEditMode: true,
        jobId: props.match.params.id,
        footerMessage: "",
        footerSubMessage: "",
    };

    const [state, setState] = useState(initialState);

    //Mutation for applying to a job
    const [applyToJobMutation, { applyToJobLoading, applyToJobError }] = useMutation(APPLY_TO_JOB, {
        refetchQueries: [

            {
                query: GET_JOB_APPLICANTS,
                variables: { jobId: state.jobId }
            },
        ],
    });
    //Mutation for deleting a job
    const [deleteJobMutation, { deleteJobLoading, deleteJobError }] = useMutation(DELETE_JOB, {
        refetchQueries: [
            {
                query: GET_JOB_INFO,
                variables: { jobId: state.jobId }
            },
        ],
    });
    //Mutation for withdrawing a job application
    const [withdrawApplicationMutation, { withdrawApplicationLoading, withdrawApplicationError }] = useMutation(WITHDRAW_JOB_APPLICATION,
        {
            refetchQueries: [
                {
                    query: GET_JOB_APPLICANTS,
                    variables: { jobId: state.jobId }
                },
                {
                    query: GET_JOB_INFO,
                    variables: { jobId: state.jobId }
                },
            ],
        });

    const { loading, error, data } = useQuery(GET_JOB_INFO, { variables: { jobId: state.jobId }, fetchPolicy: "cache-first" });

    if (applyToJobLoading) return <LoadingIndicator />;
    if (applyToJobError) return <p>Apply to job mutation Error! {applyToJobError}</p>;

    if (withdrawApplicationLoading) return <LoadingIndicator />;
    if (withdrawApplicationError) return <p>Apply to job mutation Error! {withdrawApplicationError}</p>;


    if (deleteJobLoading) return <LoadingIndicator />;
    if (deleteJobError) return <p>Delete job mutation Error! {deleteJobError}</p>;

    const applyToJobHandler = () => {
        applyToJobMutation({
            variables: {
                jobId: state.jobId
            }
        }).then(
            res => {
                console.log(res);
            },
            err => console.log(err)
        );
    };
    // ToDo implement Modal for getting password
    const deleteJobHandler = () => {
        let confirmed = window.confirm("Are you sure you want to delete this job? Note: all the associated milestones, discussions and applications will be lost.");
        if (confirmed) {
            deleteJobMutation({
                variables: {
                    jobId: state.jobId
                }
            }).then(
                res => {
                    console.log(res);
                    props.history.push("/");
                },
                err => console.log(err)
            );
        }
    };

    const withdrawApplicationHandler = () => {
        let confirmed = window.confirm("Are you sure you want to withdraw from this job?");
        if (confirmed) {
            withdrawApplicationMutation({
                variables: {
                    jobId: state.jobId,
                }
            }).then(
                res => { },
                err => console.log(err)
            );
        }
    };


    //Query to get the job tabs and primary info(created by, applicant IDs)
    if (loading) return <LoadingIndicator />;
    else if (error) alert(`Error! ${error.message}`);

    //To check if the user has already applied to this job for buttons
    var userActions = [];
    var isJobAuthor = false;
    // If the user has applied to this job and user's application has not been accepted
    if (data.Job.viewerHasApplied && data.Job.applications.applications.find((application) => (application.applicant.id == user.id && application.status.toUpperCase() == "PENDING"))) {
        userActions = [
            (<Button type="secondary" label="Withdraw application"
                key="withdrawJobApplication"
                className=" w-auto mr-4 "
                onClick={withdrawApplicationHandler}
            />),
        ];
        //To set the message on the footer 
        if (!state.footerMessage || !state.footerSubMessage) {
            setState({
                ...state,
                footerMessage: "You've successfully applied to this job!",
                footerSubMessage: "Please wait for intimation from the job author."
            });
        }
    }

    // If the user has applied to this job and if the application has been accepted
    else if (data.Job.applications.applications && data.Job.applications.applications.find((application) => (application.applicant.id == user.id && application.status.toUpperCase() == "ACCEPTED"))) {
        userActions = [
            (<Button type="secondary" label="Leave Job"
                key="leaveJob"
                className=" w-auto mr-4 "
                onClick={withdrawApplicationHandler}
            />),
        ];
        if (!state.footerMessage || !state.footerSubMessage) {
            setState({
                ...state,
                footerMessage: "Hurray! your application has been accpeted",
                footerSubMessage: "Keep in touch with the job author."
            });
        }
    }

    else {
        userActions = [
            (<Button type="primary" label="Apply to Job"
                key="applyjob"
                className=" w-auto mr-4 "
                onClick={applyToJobHandler}
            />),
            /* Functionality to be added in version 2
            (<Button type="secondary" label="Apply to Milestones"
                className=" w-auto mr-4 "
                key="applyMilestone"
            />),
                */
        ];
        if (state.footerMessage || state.footerSubMessage) {
            setState({
                ...state,
                footerMessage: "",
                footerSubMessage: "",
            });
        }
    }

    const authorActions = [
        (<Button type="secondary" label="Edit Job"
            key="editjob"
            className=" w-auto mr-4 "
        />),
        (<Button type="error" label="Delete Job"
            className=" w-auto mr-4 "
            key="deletejob"
            onClick={deleteJobHandler}
        />),
    ];

    var tabList = [
        {
            title: "Milestones",
            location: "milestones",
            count: data.Job.milestones.totalCount ? data.Job.milestones.totalCount : 0,
        },
        {
            title: "Discussions",
            location: "discussions",
            count: data.Job.discussion.totalCount ? data.Job.discussion.totalCount : 0,
        },
    ];
    // Only the author of the job can view applications and currently working tab
    if (user.id == data.Job.createdBy.id) {
        tabList.push({
            title: "Applications",
            location: "applications",
            count: data.Job.applications.pendingCount ? data.Job.applications.pendingCount : 0,
            notify: true
        });
        tabList.push({
            title: "Currently Working",
            location: "working",
            count: data.Job.applications.acceptedCount ? data.Job.applications.acceptedCount : 0,
        });
    }
    //To check if the user is the author of the job
    if (user.id == data.Job.createdBy.id) {
        isJobAuthor = true;
    }

    return (
        <Fragment>
            <div className="px-4 pb-24 max-w-screen-lg min-h-screen mx-auto lg:px-10">
                <button onClick={() => { props.history.goBack(); }} className="flex  py-4">
                    <ArrowLeft />
                    <p className="px-4">Back</p>
                </button>
                < JobInformation jobId={state.jobId} />
                <TabStrip tabs={tabList} />
                {
                    location.pathname === ("/jobDetails/" + state.jobId) ? <Redirect to={props.match.url + "/milestones"} /> : ""
                }
                <Route exact path={props.match.url + "/milestones"} component={(props) => <MilestonesList jobId={state.jobId} isJobAuthor={isJobAuthor} />} />
                <Route exact path={props.match.url + "/discussions"} component={(props) => <Discussions jobId={state.jobId} />} />
                {
                    data.Job.createdBy.id == user.id
                        ?
                        <Fragment>
                            <Route exact path={props.match.url + "/applications"} component={(props) => <Applications jobId={state.jobId} />} />
                            <Route exact path={props.match.url + "/working"} component={(props) => <WorkingUsers jobId={state.jobId} />} />
                        </Fragment>
                        :
                        ""
                }
            </div>
            <div className="bottom-0 sticky bg-white">
                <hr />
                <div className="px-4 flex flex-wrap-reverse items-center max-w-screen-lg mx-auto py-4 lg:px-10">
                    <div className="flex">
                        {isJobAuthor ? authorActions : userActions}
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-nebula-blue">{state.footerMessage}</p>
                        <p className="text-sm font-semibold text-nebula-grey-600">{state.footerSubMessage}</p>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};


export default (withRouter(JobDetailsPage));
