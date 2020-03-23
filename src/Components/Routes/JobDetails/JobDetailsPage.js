import React, { Component, Fragment } from "react";
import SplitContainer from "../../Containers/SplitContainer";
import JobInformation from "./JobInformation";
import MilestonesList from "../../Milestones/MilestonesList";
import Button from "../../Common/Button/Button";
import TabStrip from "../../Common/Tabs/TabStrip";
import Discussions from "./Discussions";
import Applications from "./Applications";
import { withRouter, Route, Redirect, Switch } from "react-router";
import UserList from "./UserList";

class JobDetailsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditMode: true,
        };
    }

    applyToJobClickHandler() {

    }

    getRightView = () => {
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
        ]
        return(
            <Fragment>
                <TabStrip tabs = { tabList } />
                {
                    location.pathname === "/jobDetails"?<Redirect to={this.props.match.url + "/milestones"} />: "" 
                }
                <Route exact path = {this.props.match.url + "/milestones"} component = {(props) => <MilestonesList />} />
                <Route exact path = {this.props.match.url + "/discussions"} component = {(props) => <Discussions />} />
                <Route exact path = {this.props.match.url + "/applications"} component = {(props) => <Applications />} />
                <Route exact path = {this.props.match.url + "/working"} component = {(props) => <UserList />} />
            </Fragment>
        ) ;
    }  
     

    render() {
        const isEditMode = this.state.isEditMode;

        const actions = [
            (<Button type="secondary" label="Apply to Milestones"
                onClick={this.openFilterModal}
                className=" w-full "
            />),
            (<Button type="primary" label="Apply to Job"
                onClick={this.applyToJobClickHandler}
                className=" w-full "
            />),
        ];


        const statusWidget = (
            <div>
                <p>This is a title</p>
                <p>This is text</p>
            </div>
        );

        return (
            <SplitContainer
                leftView={< JobInformation />}
                actions={actions}
                rightView={ this.getRightView() }
                statusTitle="This is a title"
                statusSubtitle="This is a subtitle"
            />
        );
    }
}


export default withRouter(JobDetailsPage);
