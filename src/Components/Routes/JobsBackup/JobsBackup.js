import React from "react";
import Button from "../../Common/Button/Button";
import { useLazyQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { GET_JOBS_BACKUP } from "../../../queries";
// import { UPLOAD_JOBS } from "../../../mutations";
import { DownloadCloud } from "react-feather";
import {  withRouter, useParams, BrowserRouter } from "react-router-dom";

const JobsBackup = (props) => {
    const { id } = useParams();
    const userId = id;

    // const [uploadJobsMutation, { uploadJobsLoading, uploadJobsError }] = useMutation(UPLOAD_JOBS, {
    //     refetchQueries: [
    //         {
    //             query: GET_JOB_DETAILS,
    //             variables: { jobId: props.jobId },
    //         },
    //         {
    //             query: GET_MILESTONES,
    //             variables: { jobId: props.jobId },
    //         },
    //     ],

    // });
    const [downloadJobsBackup] = useLazyQuery(GET_JOBS_BACKUP, {
        onCompleted: (data) => {
            data = [...data["User"]["createdJobs"]]
            const content = JSON.stringify(data);
            const a = document.createElement('a');
            const blob = new Blob([content], {'type':'application/json'});
            a.href = window.URL.createObjectURL(blob);
            a.download = "JobsBackup";
            a.click();
        },
        onError: (error => {console.log(error);}),
    });

    const downloadJobsOnClick = () => {
        downloadJobsBackup({
            variables: { 
                userId: userId
            }
        })
    }

    // to hide the "choose file" input 
    const uploadJobsOnClick = () => { document.getElementById("uploadJobsInput").click() }

    //To read the uploaded file 
    const fileUploadHandler = (event) => {
        const validExtension = ".json";
        const file = event.target.files[0];
        event.target.value = "";
        //If the uploaded file is not .json file
        if(file.name.search(validExtension) === -1) {
            alert("Invalid file extension! Please ensure that you have uploaded the correct file.");
            return false; 
        }
        const reader = new FileReader();
        reader.onload = validateFile;
        reader.readAsText(file);
    }

    //For parsing the uploaded file to json
    const validateFile = (event) => {
        const file = event.target.result;
        const parse = (file) => {
            try {
                return JSON.parse(file);
            }
            catch(err) {
                return false
            }
        };
        const jsonFile = parse(file);
        if(!jsonFile) {
            alert("Invalid file! Please ensure that you have uploaded the correct file.")
        }
        else {
            const jobFields = ["id", "title", "status", "desc", "difficulty", "milestones"]
            const milestoneFields = ["id", "title", "status", "desc", "duration", "skills", "resolution"]
            const skillsFields = ["id", "value"]
            let isValid = true;
            var BreakException = {};
            try {
                jsonFile.forEach( job => {
                    if(job == null) {
                        isValid = false; 
                        throw BreakException;
                    }
                    //Check for fields in job
                    isValid = jobFields.reduce((accumulator, field) => (accumulator && job[field] != null && job[field] != undefined), true)
                    if(!isValid) throw BreakException;
                    //Check for fields in milestones
                    if(!job["milestones"]["totalCount"]) throw BreakException;
                    const milestones = job["milestones"]["milestones"];
                    milestones.forEach(milestone => {
                        isValid = milestoneFields.reduce((accumulator, field) => (accumulator && milestone[field] != null && milestone[field] != undefined), true)
                        if(!isValid) throw BreakException;
                        const skills = milestone["skills"];
                        //Check for fields in skills
                        skills.forEach( skill => {
                            isValid = skillsFields.reduce((accumulator, field) => (accumulator && skill[field] != null && skill[field] != undefined), true)
                            if(!isValid) throw BreakException;
                        })
                    });
                    if(!isValid) throw BreakException;
                });
            }
            catch (e) {
                if (e !== BreakException) throw e;
            }
            if(isValid) {
                props.history.push({
                    pathname: props.match.url + "/uploadJobs",
                    state: { jobs: jsonFile } 
                });
            }
            else {
                alert("Missing fields! The file might be corrupted or modified!")
            }
        }
    }

    return (
        <div className="flex flex-col">
            <hr />
            <p className="flex mt-6">
                <p className="mr-2 text-nebula-blue"><DownloadCloud/></p>
                <p className="font-semibold text-lg">Jobs Backup</p>
            </p>
            <p className="font-semibold mt-4">Download Backup</p>
            <p className="text-sm text-nebula-grey-700 my-2">
                Download the jobs that you have created as a JSON file, this backup file can later be uploaded
                if required. Do not edit the file.
            </p>
            <p className="w-3/4">
                <Button type="primary" label="Download" onClick={downloadJobsOnClick} />
            </p>
            <br />
            <p className="font-semibold">Upload Backup</p>
            <p className="text-sm text-nebula-grey-700 my-2">
                Upload the "JobsBackup.json" file to restore all the jobs that you have created.
            </p>
            <p className="w-3/4">
                <Button type="primary" label="Upload" onClick={uploadJobsOnClick} className=" disabled" />
                <input type="file" id="uploadJobsInput" onChange={fileUploadHandler} style={{"display":"none"}} accept=".json" />
            </p>
        </div>
    );
};

export default withRouter(JobsBackup);
