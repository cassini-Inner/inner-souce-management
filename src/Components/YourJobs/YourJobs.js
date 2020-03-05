import React, { Fragment, Component } from 'react';
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import Content from "../Home/Content";

class YourJobs extends Component {
    render() {
        return (
            <Fragment>
                <Sidebar page="yourJobs" />
                <div className="w-full lg:w-4/5 lg:mx-10">
                    <div className="px-4 md:px-0">
                        <Navbar />
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default YourJobs;