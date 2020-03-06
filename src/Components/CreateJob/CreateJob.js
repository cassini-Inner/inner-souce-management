import React, { Component, Fragment } from 'react';
import Sidebar from "../Sidebar";
import Jobform from "./JobForm";

class CreateJob extends Component {
    render() {
        return (
            <Fragment>
                {/* <Sidebar page="manageJobs" /> */}
                <div className="w-full lg:w-full lg:mx-10">
                    <Jobform />
                    {/* <Content setModalState={this.props.setModalState} /> */}
                </div>
            </Fragment>
        );
    }
}

export default CreateJob;