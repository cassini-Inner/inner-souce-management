import React from "react";
import OngoingJobCard from "./OngoingJobCard";
import { NavLink } from "react-router-dom";
import { useQuery } from "@apollo/client";
import {connect} from "react-redux";

const OngoingJobsGrid = (props) => {
    let queryVariables = {}
    if(props.location == "home") {
        queryVariables = {userId: props.user.id};
    }
    else if(props.queryVariables) {
        queryVariables = props.queryVariables;
    }
    
    if(props.query) {
        const { loading, error, data } = useQuery(props.query, { variables: queryVariables });
        if (loading) return "Loading...";
        else if (error) return(`Error! ${error.message}`);
        let jobs = data["User"]["appliedJobs"];

        let maxCount = props.maxCount ? props.maxCount : jobs.length / 2 + 1; // +1 to ensure even odd number of cards are printed 
        let jobsRow = [];
        if (jobs && jobs.length) {
            for (let i = 0; i < jobs.length && i < maxCount; i++) {
                let job1 = jobs[i];
                let job2 = jobs[i + 1];

                jobsRow.push(
                    <div className="flex w-full mb-4 flex-wrap lg:flex-no-wrap">
                        {job1 != null &&
                            <OngoingJobCard job={job1} className="w-full mb-4 lg:mb-0 lg:w-1/2"/>
                        }
                        <div className="w-4"></div>
                        {/* Blank div in case job count is even, otherwise the last card is out of place */}
                        {job2 != null ?
                            <OngoingJobCard job={job2} className="w-full mb-4 lg:mb-0 lg:w-1/2"/>
                            :
                            <div className="w-1/2"/>}
                    </div>
                );
            }

            return (
                <div id={props.id} className="">
                    <div className="flex w-full">
                        <h1 className="text-2xl flex-1">{props.title}</h1>
                        {
                            props.location === "home" ? 
                                <NavLink exact to="/yourJobs/ongoing">
                                    <div className="cursor-pointer text-sm font-semibold text-nebula-blue mt-3 hover:text-blue-700 tracking-widest">
                                        SEE ALL ONGOING JOBS
                                    </div>
                                </NavLink> 
                                : ""
                        }
                    </div>
                    <div className="flex flex-wrap mt-4">
                        {jobsRow}
                    </div>
                </div>
            );
        }
    }
    if(props.location == "home") {
        return '';
    }
    else {
        return(<div className="ml-2 mt-2">No Jobs</div>)
    }
    
};

const mapStateToProps = state => {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps)(OngoingJobsGrid);

