import React, { Fragment } from "react";
import * as Icons from "react-feather";
import { jobApplication } from "../../../../assets/placeholder";
import StatusTag from "../../Common/StatusTags/StatusTags";
import Avatar from "../../Common/Avatar/Avatar";
import { useQuery } from "@apollo/client";
import { GET_JOB_APPLICANTS } from "../../../queries";

const UserList = (props) => {

    const { loading, error, data } = useQuery(GET_JOB_APPLICANTS, { variables: { jobId: props.jobId } });
    if (loading) return "Loading...";
    else if (error) console.log(`Error! ${error.message}`);
    if(data["Job"]["applications"]["applications"]) {
        const userList =
            data["Job"]["applications"]["applications"].map((application, key) =>{
                if((props.type == "APPLICATIONS" && application.status == "PENDING") || (props.type == "WORKING" && application.status == "ACCEPTED")) {
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
        if(userList.indexOf(undefined)) {
            return(userList)
        }
    }
    if(props.type == "APPLICATIONS") {
        props.setDisplayState(false);
        return null;
    }
    else if(props.type == "WORKING") {
        return(<div className="mt-2">No currently working users</div>)
    }

};

export default UserList;
