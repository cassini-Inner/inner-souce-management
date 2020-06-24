import React, { useState, useContext, Fragment } from "react";
import UploadJobCard from "./UploadJobCard";
import Navbar from "../../Navigation/Navbar/Navbar";
import {  withRouter } from "react-router-dom";
import ModalViewWithScrim from "../../Modals/ModalViewWithScrim";
import { useMutation } from "@apollo/react-hooks";
import Portal from "../../Containers/Portal";
import { Square, CheckSquare } from "react-feather";
import { GET_YOUR_JOBS } from "../../../queries";
import { RESTORE_JOBS_BACKUP } from "../../../mutations";
import Button from "../../Common/Button/Button";
import MilestoneDetailsModal from "./MilestoneDetailsModal";
import { AuthenticationContext } from "../../../hooks/useAuthentication/provider";
const UploadJobsList = (props) => {
    const { user } = useContext(AuthenticationContext);
    const jobs = props.location.state.jobs ? props.location.state.jobs : null;
    if(!jobs || jobs == null) {
        alert("Some error occured! No jobs to upload found");
        props.history.goBack();
    } 
    const initialJobIdList = jobs.map(job => job.id);
    const [ jobIdList, setJobIdList ] = useState(initialJobIdList);
    const [ milestoneModalState, setMilestoneModalState ] = useState(null);
    const [uploadJobsMutation, { error }] = useMutation(RESTORE_JOBS_BACKUP,
        {
            refetchQueries: [
                {
                    query: GET_YOUR_JOBS,
                    variables: { userId: user.id }
                },
            ],
        });
    if (error) return <p>Post comment mutation Error! {error}</p>;
    const toggleSelectAll = () => {
        if(jobIdList.length == initialJobIdList.length) {
            setJobIdList([]);
        }
        else {
            setJobIdList(initialJobIdList);
        }
    };

    const toggleSelectJob = (e) => {
        let id = e.currentTarget.id.toString().trim();
        let index = jobIdList.indexOf(id);
        let newList = [...jobIdList];
        if(index == -1) {
            newList.push(id);
        }
        else {
            newList.splice(index, 1);
        }
        setJobIdList(newList);
    };

    const openMilestoneModal = (e) => {
        let id = e.currentTarget.dataset.id.trim().toString();
        let job = jobs.find((job) => job.id == id);
        setMilestoneModalState(job);
    };

    const closeMilestoneModal = () => {
        setMilestoneModalState(null);
    };

    const uploadJobs = () => {
        let uploadJobs = [];
        jobIdList.forEach(id => {
            uploadJobs.push(jobs.find((job) => job.id == id));
        });
        // pre - processing before upload
        const jobsBackup = uploadJobs.map((job, _) => {
            let milestones = job.milestones.milestones.map((milestone, _) => {
                let skills = skills = milestone.skills.map((skill, _) => skill.value);
                return({
                    title: milestone.title,
                    desc: milestone.desc,
                    status: milestone.status,
                    resolution: milestone.resolution,
                    duration: milestone.duration,
                    skills: skills,
                });
            });
            return({
                title: job.title,
                desc: job.desc,
                difficulty: job.difficulty,
                milestones: milestones
            });
        });
        uploadJobsMutation({
            variables: {
                jobs: jobsBackup,
            },
        }).then((result) => {
            alert("Upload Successfull!");
            props.history.push("/profile/"+user.id);
        })
            .catch((e) => {
                alert("Could not upload jobs backup: ", e);
            });
    };

    const jobList = jobs.map( (job, key) => {
        return (
            <UploadJobCard
                data={job} 
                key={key} 
                isSelected={jobIdList.indexOf(job.id) != -1 ? true : false}
                toggleSelectJob={toggleSelectJob}
                openMilestoneModal={openMilestoneModal}
            />
        );
    });
    return (
        <Fragment>
            <div className=" px-4 lg:px-10 bg-white w-full">
                <Navbar />
                <div className="text-lg flex mt-2 rounded items-center">
                    { 
                        initialJobIdList.length == jobIdList.length ? 
                            <div className="text-nebula-blue flex mx-2">
                                <p onClick={toggleSelectAll} className="cursor-pointer hover:text-black"><CheckSquare/></p> 
                                <p className="ml-3">All {jobIdList.length} jobs selected</p>
                            </div>
                            : 
                            <div className="flex mx-2">
                                <p onClick={toggleSelectAll} className="hover:text-nebula-blue cursor-pointer"><Square/></p> 
                                <p className="ml-3">{jobIdList.length} jobs selected</p>
                            </div>
                    }
                    <p className="text-lg m-auto">Please select the jobs to upload</p>
                </div>
                { jobList }
                <div className="flex w-full bg-white justify-start flex-col md:flex-row sticky bottom-0 border border-nebula-grey-400">
                    <div className="max-w-screen-md mx-auto w-full flex flex-row">
                        <div className={"py-4 pl-4 flex"}>
                            <Button type="primary" label="Upload Selected Jobs" onClick={uploadJobs} />
                        </div>
                        <div className={"py-4 pl-4 flex"}>
                            <Button type="secondary" label="Cancel Job Upload" onClick={ () => props.history.goBack() } />
                        </div>
                    </div>
                </div>
            </div>
            <Portal isOpen={milestoneModalState} >
                <ModalViewWithScrim>
                    <MilestoneDetailsModal
                        data = {milestoneModalState}
                        closeMilestoneModal = {closeMilestoneModal}
                    />
                </ModalViewWithScrim>
            </Portal>
        </Fragment>
    );
};

export default withRouter(UploadJobsList);
