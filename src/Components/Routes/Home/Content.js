import React, { useCallback, useContext, useEffect, useRef } from "react";
import JobList from "../../Jobs/JobList";
import OngoingJobsGrid from "../../Jobs/OngoingJobsGrid";
import { GET_YOUR_JOBS } from "../../../queries";
import { useQuery } from "@apollo/client";
import Placeholder from "../../Placeholders/placeholder";
import LoadingIndicator from "../../Common/LoadingIndicator/LoadingIndicator";
import { Link } from "react-router-dom";
import Button from "../../Common/Button/Button";
import { JobsFeedContext } from "../../../hooks/JobFeedProvider/provider";
import { AuthenticationContext } from "../../../hooks/useAuthentication/provider";
import NoJobsFilterImage
    from "../../../assets/images/explore_jobs_placeholder.svg";
import TextInput from "../../Common/InputFields/TextInput";
import ActionChip from "../../Common/Chips/ActionChip";

const Content = (props) => {
    const { user } = useContext(AuthenticationContext);

    const { loading: OngoingJobsLoad, error: OngoingJobsError, data: OngoingJobsData } = useQuery(
        GET_YOUR_JOBS, {
            variables: { userId: user.id },
        });

    const { jobData, loading, loadMoreJobs, getAllJobs } = useContext(JobsFeedContext);


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
        return <LoadingIndicator/>;
    } else if (OngoingJobsError) return (`Error! ${OngoingJobsError.message}`);

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
        <div>
            <OngoingJobsGrid maxCount={2} location="home" title="Ongoing Jobs"
                jobs={ongoingJobs} placeholder={(<div/>)}/>
            <div className="flex flex-row justify-between items-center  ">
                <div className="text-xl font-semibold flex-1 py-4">
                  Explore Jobs
                </div>
                <Link to="/createJob"><Button label="Create a new Job"
                    type="primary"/></Link>
            </div>
            <div>
                <div
                    className="flex flex-col-reverse lg:grid lg:gap-4 lg:grid-cols-12">
                    <div className="lg:col-span-8">
                        <JobList
                            jobs={jobData.jobs}
                            placeholder={placeholder}
                            loading={loading}
                        />
                        <div ref={loadMoreRef}/>
                    </div>
                    <div className="lg:col-span-4">
                        <SidebarReactiveFilter/>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SidebarReactiveFilter = (props) => {
    const skillsFilterRef = useRef();

    const { skills, status, addSkill, removeSkill, resetFilter, addStatus, removeStatus } = React.useContext(
        JobsFeedContext);

    const inputOnKeyDown = (e) => {
        if (e.keyCode === 13 && skillsFilterRef.current.value !== "") {
            addSkill(skillsFilterRef.current.value);
            skillsFilterRef.current.value = "";
        }
    };

    const checkboxOnChange = (e) => {
        if (e.currentTarget.checked) {
            addStatus(e.currentTarget.id);
        } else {
            removeStatus(e.currentTarget.id);
        }
    };

    const openChecked = status.includes("OPEN");
    const ongoingChecked = status.includes("ONGOING");
    const completedChecked = status.includes("COMPLETED");
    return (
        <div
            className="bg-white border border-nebula-grey-400 rounded-lg mt-4 my-auto lg:max-w-xs">
            <h4
                className="text-md font-semibold text-nebula-blue border-b border-gray-300 rounded-tl-lg rounded-tr-lg bg-white py-4 pl-4">Filters</h4>
            <div className="px-4 py-2">
                <h4
                    className="text-sm font-semibold text-nebula-grey-800 mt-4">Skills</h4>
                <TextInput className="w-full my-2"
                    placeholder="Add job skill filters"
                    forwardedRef={skillsFilterRef}
                    onKeyDown={(e) => inputOnKeyDown(e)}/>
                <div className="flex flex-row flex-wrap">
                    {
                        skills.map((skill, key) => (<div key={key}>
                            {
                                <ActionChip
                                    key={key}
                                    id={key}
                                    label={skill}
                                    onClick={() => removeSkill(skill)}
                                    className="m-1 ml-0"
                                />
                            }
                        </div>))
                    }
                </div>
                <h4
                    className="text-sm font-semibold text-nebula-grey-800 mt-4">Job
                  State</h4>
                <div className="flex items-center my-1 py-1">
                    <input type="checkbox" id="OPEN"
                        onChange={(e) => checkboxOnChange(e)}
                        checked={openChecked}/>
                    <label htmlFor="OPEN" className="ml-2">Open</label>
                </div>
                <div className="flex items-center my-1 py-1">
                    <input type="checkbox" id="ONGOING"
                        onChange={(e) => checkboxOnChange(e)}
                        checked={ongoingChecked}/>
                    <label htmlFor="ONGOING" className="ml-2">Ongoing</label>
                </div>
                <div className="flex items-center my-1 py-1">
                    <input type="checkbox" id="COMPLETED"
                        onChange={(e) => checkboxOnChange(e)}
                        checked={completedChecked}/>
                    <label htmlFor="COMPLETED" className="ml-2">Completed</label>
                </div>
                <div className="flex items-center my-1 py-1">
                    <Button type="secondary" label="Reset" onClick={resetFilter}/>
                </div>
            </div>
        </div>

    );
};

export default (Content);
