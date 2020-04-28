import React, { Component, Fragment } from "react";
import Navbar from "../../Navigation/Navbar";
import OngoingJobsGrid from "../../Jobs/OngoingJobsGrid";
import JobList from "../../Jobs/JobList";
import { Redirect, Route, withRouter } from "react-router";
import * as config from "../../../../assets/placeholder";
import TabStrip from "../../Common/TabStrip/TabStrip";
import StickyHeader from "../../Common/StickyHeader/StickyHeader";
import { useQuery } from "@apollo/client";
import { GET_YOUR_JOBS } from "../../../queries";
import { connect } from "react-redux";
 
// To get the tabs(Working on, awaiting approval..) values
const YourJobs = (props) =>{ 
    var appliedJobs = [], ongoingJobs = [], completedJobs = [];
    //Query to get your jobs 
    const { loading:yourJobsInfoLoading, error:yourJobsInfoError, data } = useQuery(GET_YOUR_JOBS, { variables: { userId: props.user.id } });
    if (yourJobsInfoLoading) return "Loading...";
    else if (yourJobsInfoError) return `error! ${yourJobsInfoError.message}`;
    
    if(data.User.appliedJobs) {
        data.User.appliedJobs.forEach(appliedJob => {
        // If application status is pending and job status is either open or ongoing then the user is awaiting approval
            if(appliedJob.userJobStatus.toUpperCase() != "COMPLETED" && appliedJob.applicationStatus.toUpperCase() == "PENDING") {
                appliedJobs.push({ ...appliedJob.job, userApplicationStatus: "APPLIED"});
            }
        // If application status is accepted and job status is ongoing then the user is currently working on the job
            if(appliedJob.userJobStatus.toUpperCase() == "ONGOING" && appliedJob.applicationStatus.toUpperCase() == "ACCEPTED") {
                ongoingJobs.push({ ...appliedJob.job, userApplicationStatus: "WORKING"});
            }
        // If the application status is accepted and job status is completed then the job the user has taken(maybe milestones) is completed
            if(appliedJob.userJobStatus.toUpperCase() == "COMPLETED" && appliedJob.applicationStatus.toUpperCase() == "ACCEPTED") {
                completedJobs.push({ ...appliedJob.job, userApplicationStatus: "COMPLETED"});
            }
        });
    }

    const tabList = [
        {
            title: "Working On",
            location: "ongoing",
            count: ongoingJobs.length,
        },
        {
            title: "Awaiting Approval",
            location: "applications",
            count: appliedJobs.length,
            notify: true
        },
        {
            title: "Completed",
            location: "completed",
            count: completedJobs.length,
        }
    ];


    return(
        <YourJobsBody 
            {...props}
            tabList={tabList} 
            appliedJobs={appliedJobs}
            ongoingJobs={ongoingJobs}
            completedJobs={completedJobs}
        />
    );
}


class YourJobsBody extends Component {

    constructor (props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        if (this.props.location.hash) {
            this.navigateToTag(this.props.location.hash);
        }
    }

    shouldComponentUpdate(newProps, newState) {
        if (this.props.location.hash !== newProps.location.hash) {
            let internalLocation = newProps.location.hash;
            this.navigateToTag(internalLocation);
            return true;
        }

        return false;
    }

    navigateToTag(sectionId) {
        const elementId = [...sectionId];
        elementId.splice(0, 1);
        const element = document.getElementById(elementId.join(""));
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }

   

    render() {

        return (
            <Fragment>
                {
                    location.pathname === "/yourJobs"?<Redirect to={this.props.match.url + "/ongoing"} />: "" 
                }
                <div className="px-4 lg:px-10">
                    <Navbar/>
                    <div className="h-auto">
                        <StickyHeader>
                            <div className="text-xl font-semibold flex-1 py-4">
                                Your Jobs
                            </div>
                            <TabStrip tabs={this.props.tabList}/>
                        </StickyHeader>
                        <div className="my-2"/>
                        <Route exact path={this.props.match.url + "/ongoing"}
                            component={(props) => <OngoingJobsGrid
                                id={config.ongoing}
                                jobs={this.props.ongoingJobs}
                                />}/>
                        <Route exact
                            path={this.props.match.url + "/applications"}
                            component={(props) => <JobList
                                id={config.applications}
                                jobs={this.props.appliedJobs}/>}/>
                        <Route exact path={this.props.match.url + "/completed"}
                            component={(props) => <JobList
                                id={config.completed}
                                jobs={this.props.completedJobs}/>}/>
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps)(withRouter(YourJobs));