import React, { Component, Fragment } from 'react';
import Navbar from "../Navbar";
import OngoingJobs from './OngoingJobs';
import JobList from "../JobList";
import { ongoing, completed, applications } from "../../../assets/placeholder";
import { withRouter } from 'react-router';
import * as config from "../../../assets/placeholder";

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
        const element = document.getElementById(elementId.join(''));
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    render() {

        return (
            <Fragment>
                <div className="px-4 lg:px-10">
                    <Navbar />
                    <div className="h-auto mt-4">
                        <OngoingJobs id={config.ongoing} title={ongoing} />
                        <JobList id={config.applications} title={applications} setModalState={this.props.setModalState} />
                        <JobList id={config.completed} title={completed} setModalState={this.props.setModalState} />
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default withRouter(YourJobs);