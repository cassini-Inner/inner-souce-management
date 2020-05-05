import React, { Component, Fragment, useContext } from "react";
import JobCard from "./JobCard";
import LoadingIndicator from "../Common/LoadingIndicator/LoadingIndicator";

const JobList = ({ jobs, placeholder, loading }) => {

    if (loading) {
        return <LoadingIndicator />
    }

    return (<div>
        {
            jobs && (jobs.length > 0) &&
            jobs.map((job, key) =>
                <JobCard key={key} data={job} />
            )
        }
        {
            (!jobs || (jobs.length === 0)) && placeholder &&
            placeholder
        }
    </div>);
};

export default JobList;
