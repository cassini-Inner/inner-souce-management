import React from "react";
import JobList from "../../Jobs/JobList";
import Navbar from "../../Navigation/Navbar/Navbar";
import {  withRouter, useParams } from "react-router-dom";

const UploadJobsList = (props) => {
    const { id } = useParams();
    console.log("id:",id)
    console.log(props.location.state.jobs)
    return (
        <div className=" px-4 lg:px-10 bg-white w-full ">
            <Navbar />

        </div>
    );
};

export default withRouter(UploadJobsList);
