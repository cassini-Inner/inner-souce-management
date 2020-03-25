import React, { Component, Fragment } from "react";
import JobInformation from "./JobInformation";
import MilestonesList from "../../Milestones/MilestonesList";
import Button from "../../Common/Button/Button";
import TabStrip from "../../Common/TabStrip/TabStrip";
import Discussions from "./Discussions";
import Applications from "./Applications";
import { withRouter, Route, Redirect } from "react-router";
import { ArrowLeft } from "react-feather";
import WorkingUsers from "./WorkingUsers";

class JobDetailsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditMode: true,
        };
    }

    applyToJobClickHandler() {

    }

    render() {

        const actions = [
            (<Button type="primary" label="Apply to Job"
                key="applyjob"
                className=" w-auto mr-4 "
            />),
/* ################################ Functionality to be added in version 2 #######################################
            (<Button type="secondary" label="Apply to Milestones"
                className=" w-auto mr-4 "
                key="applyMilestone"
            />),
###################################################################################################################*/
        ];

        const tabList = [
            {
                title: "Milestones",
                location: "milestones",
                count: 3
            },
            {
                title: "Discussions",
                location: "discussions",
                count: 6
            },
            {
                title: "Applications",
                location: "applications",
                count: "10+",
                notify: true
            },
            {
                title: "Currently Working",
                location: "working",
                count: "2",
            }
        ];


        return (
            <Fragment>

                <div className="px-4 max-w-screen-lg mx-auto lg:px-10">
                    <button onClick={() => {this.props.history.goBack();}} className="flex  py-4">
                        <ArrowLeft /> 
                        <p className="px-4">Back</p>
                    </button>
                    < JobInformation />
                    <TabStrip tabs = { tabList } />
                    {
                        location.pathname === "/jobDetails"?<Redirect to={this.props.match.url + "/milestones"} />: "" 
                    }
                    <Route exact path = {this.props.match.url + "/milestones"} component = {(props) => <MilestonesList />} />
                    <Route exact path = {this.props.match.url + "/discussions"} component = {(props) => <Discussions />} />
                    <Route exact path = {this.props.match.url + "/applications"} component = {(props) => <Applications />} />
                    <Route exact path={this.props.match.url + "/working"} component={(props) => <WorkingUsers />} />
                </div>
                <div className="sticky bottom-0 bg-white">
                    <hr/>
                    <div className="px-4 flex flex-wrap-reverse items-center max-w-screen-lg mx-auto py-4 lg:px-10">
                        <div className="flex">
                            {actions}
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-nebula-blue">This is title</p>
                            <p className="text-sm font-semibold text-nebula-grey-600">This is subtitle</p>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}


export default withRouter(JobDetailsPage);
