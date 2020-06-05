import React from "react";
import JobCard from "./JobCard";
import LoadingIndicator from "../Common/LoadingIndicator/LoadingIndicator";

const JobList = ({ jobs, placeholder, loading }) => {

    return (<div>
        {
            jobs && (jobs.length > 0) &&
            jobs.map((job, key) =>
                <JobCard key={key} data={job} />
            )
        }
        {
            (!jobs || (jobs.length === 0)) && placeholder &&!loading &&
            placeholder
        }
        {
            loading &&
              <LoadingIndicator/>
        }
    </div>);
};

export default JobList;
