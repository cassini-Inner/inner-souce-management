import React from "react";
import TabStrip from "../../Common/TabStrip/TabStrip";
import { Redirect, Route, withRouter } from "react-router";
import { Link } from "react-router-dom";
import Navbar from "../../Navigation/Navbar";
import JobCard from "../../Jobs/JobCard";
import Button from "../../Common/Button/Button";
import StickyHeader from "../../Common/StickyHeader/StickyHeader";
import { useQuery } from "@apollo/client";
import { GET_CREATED_JOBS } from "../../../queries";
import { connect } from "react-redux";
import Placeholder from "../../Placeholders/placeholder";
import LoadingIndicator from "../../Common/LoadingIndicator/LoadingIndicator";

const ManageJobs = (props) => {
    if(location.pathname === "/manageJobs") {
        return (<Redirect to={props.match.url + "/open"} />);
    }

    var openJobsCreated = [], ongoingJobsCreated = [], completedJobsCreated = [];
    const { loading:manageJobsLoading, error:manageJobsError, data } = useQuery(GET_CREATED_JOBS, { variables: { userId: props.user.id } });
    if (manageJobsLoading) return <LoadingIndicator/>;
    else if (manageJobsError) return `error! ${manageJobsError}`;

    if(data.User.createdJobs) {
        data.User.createdJobs.forEach(createdJob => {
            // If the created job is in open status

            if(createdJob.status.toUpperCase() == "OPEN") {
                openJobsCreated.push(createdJob);
            }
            // If app job
            else if(createdJob.status.toUpperCase() == "ONGOING") {
                ongoingJobsCreated.push(createdJob);
            }
            // If the application status is accepted and job status is completed then the job the user has taken(maybe milestones) is completed
            else if(createdJob.status.toUpperCase() == "COMPLETED") {
                completedJobsCreated.push(createdJob);
            }
        });
    }

    const createJobsPlaceholder = (
        <Placeholder
            heading="Create jobs for people to apply to!"
            body="Once you create a job and publish it, people will be able to apply to it and work on the whole job or specific milestones."
            buttonLabel="Create Job"
            image="../../../../assets/images/create_jobs_placeholder.svg"
            linkLocation="/createJob"
        />
    );

    const tabList = [
        {
            title: "Open",
            location: "open",
            count: openJobsCreated.length,
            notify: true,
        },
        {
            title: "Ongoing",
            location: "ongoing",
            count: ongoingJobsCreated.length,
        },
        {
            title: "Completed",
            location: "completed",
            count: completedJobsCreated.length,
        },
    ];

    return (
        <div className="px-8">
            <Navbar />
            <StickyHeader>
                <div className="flex py-4 mx-1">
                    <div className="text-xl font-semibold flex-1">
                        Created Jobs
                    </div>
                    <div className="flex">
                        <Link to="/createJob">
                            <Button type="primary" label="Create new job" />
                        </Link>
                    </div>
                </div>
                <TabStrip tabs={tabList} />
            </StickyHeader>
            <div className="my-2">
                <Route exact path={props.match.url + "/open"}
                    component={(props) => <CreatedJobList jobs={openJobsCreated}  placeholder={createJobsPlaceholder} />} />
                <Route exact path={props.match.url + "/ongoing"}
                    component={(props) => <CreatedJobList jobs={ongoingJobsCreated}  placeholder={createJobsPlaceholder} />}/>
                <Route exact path={props.match.url + "/completed"}
                    component={(props) => <CreatedJobList jobs={completedJobsCreated}  placeholder={createJobsPlaceholder} />}/>
            </div>
        </div>
    );
};

const CreatedJobList = (props) => {
    if ((!props.jobs.length || props.jobs.length === 0 )) {
        return props.placeholder;
    }
    return (
        props.jobs.map((job, index) => {
            return (
                <div className="my-8 border border-nebula-grey-400 rounded-lg transition duration-300 shadow-none cursor-pointer hover:shadow-lg" key={index}>
                    {
                        job.applications.pendingCount 
                            ?
                            <Link to = { "/jobDetails/"+job.id} >
                                <div className="flex mt-1">
                                    <div className="self-center font-semibold text-nebula-blue text-sm ml-6 ">
                                    View {job.applications.pendingCount} Applications
                                    </div>
                                    <div className="flex py-8 px-8">
                                        {
                                            job.applications.applications
                                                ?
                                                job.applications.applications.slice(0, 3).map((application, key) => {
                                                    if(application.status.toUpperCase() == "PENDING") {
                                                        return(
                                                            <div key={application.applicant.id} className="self-center rounded-full bg-nebula-blue-light p-1 z-0 absolute">
                                                                <img src={application.applicant.photoUrl} className="flex-0 h-8 w-8 rounded-full" />
                                                            </div>
                                                        );
                                                    }
                                                })
                                                :
                                                ""
                                        }
                                    </div>    
                                
                                    <div className="self-center text-lg font-semibold text-nebula-grey-500 ml-24">{job.applications.pendingCount > 3 ? ("+" + (job.applications.pendingCount-3)) : "" }</div>
                                </div>
                            </Link>
                            :
                            ""
                    }  
                    <hr />
                    <JobCard data={job} manageJobs={true} />
                </div>
            );
        })
    );
};

const mapStateToProps = state => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps)(withRouter(ManageJobs));
