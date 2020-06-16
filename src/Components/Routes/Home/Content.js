import React, {
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
    Fragment,
} from "react";
import JobList from "../../Jobs/JobList";
import OngoingJobsGrid from "../../Jobs/OngoingJobsGrid";
import {
    GET_YOUR_JOBS,
} from "../../../queries";
import { useQuery } from "@apollo/client";
import Placeholder from "../../Placeholders/placeholder";
import LoadingIndicator from "../../Common/LoadingIndicator/LoadingIndicator";
import { Link } from "react-router-dom";
import Button from "../../Common/Button/Button";
import { JobsFeedContext, actions } from "../../../hooks/JobFeedProvider/JobFeedProvider";
import { AuthenticationContext } from "../../../hooks/useAuthentication/provider";
import NoJobsFilterImage from "../../../assets/images/explore_jobs_placeholder.svg";

const Content = (props) => {
    const { user } = useContext(AuthenticationContext);

    const { loading: OngoingJobsLoad, error: OngoingJobsError, data: OngoingJobsData } = useQuery(
        GET_YOUR_JOBS, {
            variables: { userId: user.id },
            fetchPolicy: "cache-and-network",
        });

    const { jobData,loading, loadMoreJobs } = useContext(JobsFeedContext);
    const observer = useRef();
    const loadMoreRef = useCallback(node => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !loading && jobData.hasNextPage) {
                loadMoreJobs();
            }
        });
        if (node) observer.current.observe(node);
    }, [jobData]);



    if (OngoingJobsLoad) {
        return <LoadingIndicator />;
    } else if (OngoingJobsError) return (`Error! ${error.message}`);


    let ongoingJobs = [];
    if (OngoingJobsData.User.appliedJobs) {
        ongoingJobs = (OngoingJobsData.User.appliedJobs.filter((job) =>
            job.applicationStatus === "accepted" && job.userJobStatus ===
                "ongoing" ? job.job : null)).map((application) => application.job);
    }

    const placeholder = (<Placeholder
        heading="No jobs found with the set filters"
        body="You can change the filters to explore more jobs. "
        buttonLabel="Create a new Job"
        image={NoJobsFilterImage}
    />);
 

    return (
        <Fragment>
        <div className="h-auto">
            <OngoingJobsGrid maxCount={2} location="home" title="Ongoing Jobs"
                jobs={ongoingJobs} placeholder={(<div></div>)} />
            <div className="flex flex-row justify-between items-center  ">
                <div className="text-xl font-semibold flex-1 py-4">
                    Explore Jobs
                </div>
                <Link to="/createJob"><Button label="Create a new Job"
                    type="primary" /></Link>
            </div>
            <JobList
                jobs={jobData.jobs}
                placeholder={placeholder}
                loading={loading}
            />
            <div ref={loadMoreRef} className=""></div>
            
        </div>
        </Fragment>
    );
};

export default (Content);
