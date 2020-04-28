import React, { Fragment } from "react";
import * as Icons from "react-feather";
import { jobApplication } from "../../../../assets/placeholder";
import StatusTag from "../../Common/StatusTags/StatusTags";
import Avatar from "../../Common/Avatar/Avatar";
import { useQuery } from "@apollo/client";
import { GET_JOB_APPLICANTS } from "../../../queries";

const UserList = (props) => {
    // To check if userlist is empty
    var isEmptyList = true;
    //Only for version 1  v1
    var applicationIdList = [];

    const { loading, error, data } = useQuery(GET_JOB_APPLICANTS, { variables: { jobId: props.jobId }, fetchPolicy:"cache-and-network" });
    if (loading) return "Loading...";
    else if (error) console.log(`Error! ${error.message}`);
    if(data["Job"]["applications"]["applications"]) {
        const userList =
            data["Job"]["applications"]["applications"].map((application, key) =>{
                if((props.type == "APPLICATIONS" && application.status.toUpperCase() == "PENDING") || (props.type == "WORKING" && application.status.toUpperCase() == "ACCEPTED")) {
                    //Only for version 1  v1 
                    if(applicationIdList.find((id) => application.applicant.id == id )) {
                        return "";
                    }
                    applicationIdList.push(application.applicant.id);
                    isEmptyList = false;
                    return (
                        <div className="border-b border-nebula-gray-400" key = { application.applicant.id }>
                            <div className = "mt-4 mb-2 flex">
                                <Avatar imagePath = {application.applicant.photoUrl} />
                                <div className = "flex-col ml-4 mb-2 flex-1">
                                    <div className = "text-lg font-semibold">{application.applicant.name}</div>
                                    <div className = "text-nebula-grey-600">{application.applicant.role}</div>
                                    {/*Functionality to be added in version 2
                                        <div className = "text-nebula-blue font-semibold">{ milestones ? ("Milestones "+milestones) : "" }</div>
                                        */}
                                </div>

                                {/* Functionality to be added in version 2 
                                    <div className = "flex self-center">
                                        <StatusTag statusTag = { [type] } />
                                    </div> 
                                    */}
                                
                                <div className = "flex">
                                    <div className ="cursor-pointer self-center p-3 mx-2 rounded-full bg-nebula-red-light">
                                        <Icons.X className=" h-4 w-4 stroke-current text-nebula-red hover:text-black" />
                                    </div>
                                    <div className ="cursor-pointer self-center p-3 mx-2 rounded-full bg-nebula-blue-light">
                                        <Icons.Check className=" h-4 w-4 stroke-current text-nebula-blue hover:text-black" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }
            }
            );
        //To ensure user list is not empty
        if(!isEmptyList) {
            return(userList);
        }
    }
    if(props.type == "APPLICATIONS") {
        props.setFilterDisplay(false);
        return <div className="mt-2">No applicants so far!</div>;
    }
    else if(props.type == "WORKING") {
        return(<div className="mt-2">No currently working users!</div>);
    }

};

export default UserList;
