import React, { useState, useRef, Fragment } from "react";
import UploadJobCard from "./UploadJobCard";
import Navbar from "../../Navigation/Navbar/Navbar";
import {  withRouter, useParams } from "react-router-dom";
import ModalViewWithScrim from "../../Modals/ModalViewWithScrim";
import Portal from "../../Containers/Portal";
import { Square, CheckSquare } from "react-feather";
import Button from "../../Common/Button/Button";
import MilestoneDetailsModal from "./MilestoneDetailsModal";

const UploadJobsList = (props) => {
    const { id } = useParams();
    const userId = id;
    const jobs = props.location.state.jobs ? props.location.state.jobs : null;
    if(!jobs || jobs == null) {
        alert("Some error occured! No jobs to upload found");
        props.history.goBack();
    } 
    const initialJobIdList = jobs.map(job => job.id)
    const [ jobIdList, setJobIdList ] = useState(initialJobIdList);
    const [ milestoneModalState, setMilestoneModalState ] = useState(null);

    const toggleSelectAll = () => {
        if(jobIdList.length == initialJobIdList.length) {
            setJobIdList([]);
        }
        else {
            setJobIdList(initialJobIdList);
        }
    }

    const toggleSelectJob = (e) => {
        let id = e.currentTarget.id.toString().trim();
        let index = jobIdList.indexOf(id);
        let newList = [...jobIdList];
        if(index == -1) {
            newList.push(id)
        }
        else {
            newList.splice(index, 1)
        }
        setJobIdList(newList);
    }

    const openMilestoneModal = (e) => {
        let id = e.currentTarget.dataset.id.trim().toString();
        let job = jobs.find((job) => job.id == id)
        setMilestoneModalState(job);
    }

    const closeMilestoneModal = () => {
        setMilestoneModalState(null);
    }

    const uploadJobs = () => {
        let uploadJobs = [];
        jobIdList.forEach(id => {
            uploadJobs.push(jobs.find((job) => job.id == id))
        });
        console.log(uploadJobs);
    }

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
