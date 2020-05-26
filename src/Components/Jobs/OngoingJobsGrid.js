import React, { Fragment, useContext } from "react";
import OngoingJobCard from "./OngoingJobCard";
import { AuthenticationContext } from "../../hooks/useAuthentication/provider";

const OngoingJobsGrid = (props) => {
    const { user } = useContext(AuthenticationContext);

    //The ongoing jobs header in the home page
    if (props.jobs != null && props.jobs.length === 0) {
        const placeholder = props.placeholder;
        return (placeholder);
    }

    if (props.jobs != null) {
        const maxCount = props.maxCount ? props.maxCount : props.jobs.length;
        const jobs = props.jobs.slice(0, maxCount);
        return (
            <div className="mb-10">
                { 
                    props.title?
                    <div className="text-xl font-semibold flex-1 py-6">
                        {props.title}
                    </div>
                    : ""
                }
                <div className="grid grid-cols-1 md:grid-cols-2 md:col-gap-4 md: row-gap-4">
                    {jobs.map((job) => {
                        return <OngoingJobCard job={job} key={job.id} />;
                    })}
                </div>
            </div>
        );
    }
    if (props.location === "home") {
        return "";
    }
    else {
        return (<div className="ml-2 mt-2">No Jobs</div>);
    }
};


export default (OngoingJobsGrid);

