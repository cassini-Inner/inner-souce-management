import React, { Component, Fragment } from 'react';
import { ongoingJobs } from '../../../assets/placeholder';
import OngoingJobCard from "./OngoingJobCard";

const OngoingJobs = (props) => {
    // const ongoingJobsGrid = getongoingJobsGrid(ongoingJobs);

    let jobsRow = [];
    let jobs = [...ongoingJobs];


    console.log(jobs.length);
    for (let i = 0; i < jobs.length && i < props.maxCount; i++) {
        let job1 = jobs[i];
        let job2 = jobs[i + 1];

        jobsRow.push(
            <div className="flex w-full mb-4">
                {job1 != null && <OngoingJobCard job={job1} className="w-1/2"></OngoingJobCard>}
                <div className="w-4"></div>
                {/* Blank div in case job count is even, otherwise the last card is out of place */}
                {job2 != null ? <OngoingJobCard job={job2} className="w-1/2"></OngoingJobCard> : <div className="w-1/2"></div>}
            </div>
        );
    }

    return (
        <div>
            <div className="flex w-full">
                <h1 className="text-2xl flex-1">Ongoing Jobs</h1>
                <h1 className="cursor-pointer text-sm font-semibold text-nebula-blue mt-3 hover:text-blue-700 tracking-widest">SEE ALL JOBS</h1>
            </div>
            <div className="flex flex-wrap mt-4">
                {jobsRow}
            </div>
        </div>
    );
}


export default OngoingJobs;