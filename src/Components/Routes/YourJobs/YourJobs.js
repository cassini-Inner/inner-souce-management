import React, { Component, Fragment } from "react";
import Navbar from "../../Navigation/Navbar";
import OngoingJobsGrid from "../../Jobs/OngoingJobsGrid";
import JobList from "../../Jobs/JobList";
import { Redirect, Route, withRouter } from "react-router";
import * as config from "../../../../assets/placeholder";
import TabStrip from "../../Common/TabStrip/TabStrip";
import StickyHeader from "../../Common/StickyHeader/StickyHeader";
import { useQuery } from "@apollo/client";
import { GET_JOB_INFO } from "../../../queries";

// To get the tabs(Working on, awaiting approval..) values
const YourJobs = (props) =>{ 

    //Query to get the job tabs and primary info(created by, applicant IDs)
    // const { loading, error, data } = useQuery(GET_JOB_INFO, { variables: {ate.jobId } });
    // if (loading) return "Loading...";
    // else if (error) alert(`Error! ${error.message}`);


    return(<YourJobsBody {...props}/>);
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
        
    const tabList = [
        {
            title: "Working On",
            location: "ongoing",
            count: 2,
        },
        {
            title: "Awaiting Approval",
            location: "applications",
            count: 3,
            notify: true
        },
        {
            title: "Completed",
            location: "completed",
            count: 8,
        }
    ];

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
                            <TabStrip tabs={tabList}/>
                        </StickyHeader>
                        <div className="my-2"/>
                        <Route exact path={this.props.match.url + "/ongoing"}
                            component={(props) => <OngoingJobsGrid
                                id={config.ongoing}/>}/>
                        <Route exact
                            path={this.props.match.url + "/applications"}
                            component={(props) => <JobList
                                id={config.applications}/>}/>
                        <Route exact path={this.props.match.url + "/completed"}
                            component={(props) => <JobList
                                id={config.completed}/>}/>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default withRouter(YourJobs);
