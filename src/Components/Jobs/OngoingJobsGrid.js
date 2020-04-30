import React, { Fragment } from "react";
import OngoingJobCard from "./OngoingJobCard";
import { Link, NavLink } from "react-router-dom";
import { useQuery } from "@apollo/client";
import {connect} from "react-redux";
import Placeholder from "../Placeholders/placeholder";

const OngoingJobsGrid = (props) => {
    //The ongoing jobs header in the home page
    var displayOngoingJobsHeader = false;

    let queryVariables = {};
    if(props.location == "home") {
        queryVariables = {userId: props.user.id};
    }
    else if(props.queryVariables) {
        queryVariables = props.queryVariables;
    }

    if (props.jobs != null && props.jobs.length ===0) {
        const placeholder = props.placeholder;
        return (placeholder);
    }
    
    if (props.jobs != null) {
        const maxCount = props.maxCount ? props.maxCount : props.jobs.length;
        const jobs = props.jobs.slice(0, maxCount);
        return <div className="grid grid-cols-1 md:grid-cols-2 md:col-gap-4 md: row-gap-4">
            {jobs.map((job) => {
                return <OngoingJobCard job={job} key = {job.id}/>;
            })}
        </div>;
    }
    if(props.location === "home") {
        return "";
    }
    else {
        return(<div className="ml-2 mt-2">No Jobs</div>);
    }
};

const mapStateToProps = state => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps)(OngoingJobsGrid);

