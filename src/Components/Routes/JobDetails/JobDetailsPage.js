import React, { Fragment, useState } from "react";
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
import {
    GET_JOB_APPLICANTS,
    GET_JOB_INFO,
    GET_USER_PROFILE,
} from "../../../queries";
import { connect } from "react-redux";
import { DELETE_JOB, APPLY_TO_JOB, WITHDRAW_JOB_APPLICATION } from "../../../mutations";
import { useMutation } from "@apollo/client";

const JobDetailsPage = (props) => {

    const initialState = {
        isEditMode: true,
        jobId: props.match.params.id,
    };

    const [ state, setState ] = useState(initialState);


    const applyToJobHandler = () => {
        let confirmed = window.confirm("Apply to this job?");
        if(confirmed) {
            applyToJobMutation({
                variables :{
                    jobId: state.jobId
                }
            }).then(
                res => {
                    console.log(res);
                    alert("Applied to the job successfully!");
                    props.history.push("/");
                },
                err => console.log(err)
            );
        }
    };
    // ToDo implement Modal for getting password
    const deleteJobHandler = () => {
        let confirmed = window.confirm("Are you sure you want to delete this job? Note: all the associated milestones, discussions and applications will be lost.");
        if(confirmed) {
            deleteJobMutation({
                variables:{
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
        let confirmed = window.confirm("Are you sure you want to withdraw your application for this job?");
        if(confirmed) {
            withdrawApplicationMutation({
                variables: {
                    jobId: state.jobId,
                }
            }).then(res => props.history.push("/jobDetails/"+state.jobId),
                err => console.log(err));
        }
    };

    //Mutation for applying to a job
    const [applyToJobMutation, {applyToJobLoading, applyToJobError}] = useMutation(APPLY_TO_JOB,{
        refetchQueries: [
            { query: GET_JOB_APPLICANTS,
                variables: { jobId: state.jobId }
            },
        ],
    });
    //Mutation for deleting a job
    const [deleteJobMutation, {deleteJobLoading, deleteJobError}] = useMutation(DELETE_JOB, {
        refetchQueries: [
            { query: GET_JOB_INFO,
                variables: { jobId: state.jobId }
            },
        ],
    });
    //Mutation for withdrawing a job application
    const [withdrawApplicationMutation, {withdrawApplicationLoading, withdrawApplicationError}] = useMutation(WITHDRAW_JOB_APPLICATION,
        {
            refetchQueries: [
                { query: GET_JOB_APPLICANTS,
                    variables: { jobId: state.jobId }
                },
            ],
        });

    const { loading, error, data } = useQuery(GET_JOB_INFO, { variables: { jobId: state.jobId }, fetchPolicy:"cache-first" });

    if(applyToJobLoading) return <p>Loading...</p>;
    if(applyToJobError) return <p>Apply to job mutation Error! {applyToJobError}</p>;

    if(withdrawApplicationLoading) return <p>Loading...</p>;
    if(withdrawApplicationError) return <p>Apply to job mutation Error! {withdrawApplicationError}</p>;


    if(deleteJobLoading) return <p>Loading...</p>;
    if(deleteJobError) return <p>Delete job mutation Error! {deleteJobError}</p>;

    //Query to get the job tabs and primary info(created by, applicant IDs)
    if (loading) return "Loading...";
    else if (error) alert(`Error! ${error.message}`);

    //To check if the user has already applied to this job for buttons
    var userActions = [];
    if(data.Job.applications.applications && data.Job.applications.applications.find((application) => application.applicant.id == props.user.id)) {
        userActions = [
            (<Button type="error" label="Withdraw application"
                key="withdrawJobApplication"
                className=" w-auto mr-4 "
                onClick={withdrawApplicationHandler}
            />),
        ];
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

    const tabList = [
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
    // Only the owner of the job can view applications and currently working tab
    if( props.user.id==data.Job.createdBy.id ) {
        tabList.push({
            title: "Applications",
            location: "applications",
            count: data.Job.applications.pendingCount ? data.Job.applications.pendingCount : 0,
            notify: true
        });
        tabList.push( {
            title: "Currently Working",
            location: "working",
            count: data.Job.applications.acceptedCount ? data.Job.applications.acceptedCount : 0,
        });
    }


    return (
        <Fragment>
            <div className="px-4 pb-24 max-w-screen-lg mx-auto lg:px-10">
                <button onClick={() => {props.history.goBack();}} className="flex  py-4">
                    <ArrowLeft />
                    <p className="px-4">Back</p>
                </button>
                < JobInformation jobId = {state.jobId} />
                <TabStrip tabs = { tabList } />
                {
                    location.pathname === ("/jobDetails/"+state.jobId)?<Redirect to={props.match.url + "/milestones"} />: ""
                }
                <Route exact path = {props.match.url + "/milestones"} component = {(props) => <MilestonesList jobId = {state.jobId}/>} />
                <Route exact path = {props.match.url + "/discussions"} component = {(props) => <Discussions jobId = {state.jobId}/>} />
                {
                    data.Job.createdBy.id == props.user.id
                        ?
                        <Fragment>
                            <Route exact path = {props.match.url + "/applications"} component = {(props) => <Applications jobId = {state.jobId}/>} />
                            <Route exact path={props.match.url + "/working"} component={(props) => <WorkingUsers jobId = {state.jobId}/>} />
                        </Fragment>
                        :
                        ""
                }
            </div>
            <div className="fixed bottom-0 bg-white">
                <hr/>
                <div className="px-4 flex flex-wrap-reverse items-center max-w-screen-lg mx-auto py-4 lg:px-10">
                    <div className="flex">
                        { props.user.id == data.Job.createdBy.id ? authorActions : userActions}
                    </div>
                    <div>
                        {/* <p className="text-sm font-semibold text-nebula-blue">This title</p>
                        <p className="text-sm font-semibold text-nebula-grey-600">This subtitle</p> */}
                    </div>
                </div>
            </div>
        </Fragment>
    );
};


const mapStateToProps = state => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps)(withRouter(JobDetailsPage));
