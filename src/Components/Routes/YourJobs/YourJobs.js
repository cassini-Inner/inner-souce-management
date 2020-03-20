import React, { Component, Fragment } from "react";
import Navbar from "../../Navigation/Navbar";
import OngoingJobsGrid from "../../Jobs/OngoingJobsGrid";
import JobList from "../../Jobs/JobList";
import { withRouter, Route } from "react-router";
import * as config from "../../../../assets/placeholder";
import Tabs from "../../Common/Tabs/Tabs";

class YourJobs extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
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

    tabList = {
        Ongoing: 2,
        Applications: 14,
        Completed: 8,
    }
    render() {

        return (
            <Fragment>
                <div className="px-4 lg:px-10">
                    <Navbar />
                    <div className="h-auto mt-4">
                        <Tabs tabList = {this.tabList} />
                        <div className="my-2" />
                        <Route path = {this.props.match.url + "/Ongoing"} component = {(props) => <OngoingJobsGrid id={config.ongoing} />} />
                        <Route path = {this.props.match.url + "/Applications"} component = {(props) => <JobList id={config.applications} />} />
                        <Route path = {this.props.match.url + "/Completed"} component = {(props) => <JobList id={config.completed} />} />
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default withRouter(YourJobs);
