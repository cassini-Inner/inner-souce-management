import React from "react";
import * as Icons from "react-feather";
import Avatar from "../../Common/Avatar/Avatar";
import { useMutation, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { GET_JOB_APPLICANTS, GET_JOB_INFO } from "../../../queries";
import {
    ACCEPT_JOB_APPLICATION,
    REJECT_JOB_APPLICATION,
} from "../../../mutations";
import LoadingIndicator from "../../Common/LoadingIndicator/LoadingIndicator";

const UserList = (props) => {
    // To check if userlist is empty
    var isEmptyList = true;
    //Only for version 1  v1
    var applicationIdList = [];

    const { loading, error, data } = useQuery(GET_JOB_APPLICANTS, {
        variables: { jobId: props.jobId },
        fetchPolicy: "network-only",
    });

    const [acceptApplication, { error: acceptApplicationError }] = useMutation(
        ACCEPT_JOB_APPLICATION,
        {
            refetchQueries: [
                { query: GET_JOB_APPLICANTS,
                    variables: { jobId: props.jobId },
                },
            ],
        });
    const [rejectApplication, { error: rejectApplicationError }] = useMutation(
        REJECT_JOB_APPLICATION,
        {
            refetchQueries: [
                { query: GET_JOB_APPLICANTS,
                    variables: { jobId: props.jobId }
                },
            ],
        });

    if (loading) {
        return <LoadingIndicator/>;
    } else if (error) console.log(`Error! ${error.message}`);

    const acceptOnClick = (e, applicantId) => {
        if (window.confirm("Are you sure you want to accept this application?")) {
            acceptApplication({
                variables: {
                    applicantId: applicantId,
                    jobId: props.jobId,
                    note: "",
                },
            }).catch(() => {alert("Failed to accept application");});

        }
    };

    const rejectOnClick = (e, applicantId) => {
        const confirm = window.confirm("Are you sure you want to reject this application?");
        if (confirm){
            rejectApplication({
                variables: {
                    applicantId: applicantId,
                    jobId: props.jobId,
                    note: "",
                },
            }).catch(() => alert("Failed to reject application"));
        }
    };

    const applications = data["Job"]["applications"]["applications"];
    if (applications) {
        const userList =
          applications.map((application, key) => {
              if ((props.type == "APPLICATIONS" &&
                  application.status.toUpperCase() == "PENDING") ||
                  (props.type == "WORKING" && application.status.toUpperCase() ==
                    "ACCEPTED")) {
                  //Only for version 1  v1
                  if (applicationIdList.find(
                      (id) => application.applicant.id == id)) {
                      return "";
                  }
                  applicationIdList.push(application.applicant.id);
                  isEmptyList = false;
                  return (
                      <div className="border-b border-nebula-gray-400"
                          key={application.applicant.id}>
                          <div className="mt-4 mb-2 flex">
                              <Avatar imagePath={application.applicant.photoUrl}/>
                              <div className="flex-col ml-4 mb-2 flex-1">
                                  <Link to={"/profile/"+application.applicant.id}>
                                      <div
                                          className="text-lg font-semibold hover:text-nebula-blue">{application.applicant.name}</div>
                                  </Link>
                                  <div
                                      className="text-nebula-grey-600">{application.applicant.role}</div>
                                  {/*Functionality to be added in version 2
                                            <div className = "text-nebula-blue font-semibold">{ milestones ? ("Milestones "+milestones) : "" }</div>
                                            */}
                              </div>

                              {/* Functionality to be added in version 2
                                        <div className = "flex self-center">
                                            <StatusTag statusTag = { [type] } />
                                        </div>
                                        */}

                              <div className="flex">
                                  <button
                                      onClick={(e) => rejectOnClick(e, application.applicant.id)}
                                      className="cursor-pointer self-center p-3 mx-2 rounded-full bg-nebula-red-light">
                                      <Icons.X
                                          className=" h-4 w-4 stroke-current text-nebula-red hover:text-black"/>
                                  </button>
                                  {props.type == "APPLICATIONS" &&
                                    <button
                                        onClick={(e) => acceptOnClick(e, application.applicant.id)}
                                        className="cursor-pointer self-center p-3 mx-2 rounded-full bg-nebula-blue-light"
                                    >
                                        <Icons.Check
                                            className=" h-4 w-4 stroke-current text-nebula-blue hover:text-black"/>
                                    </button>}
                              </div>
                          </div>
                      </div>
                  );
              }
          },
          );
        //To ensure user list is not empty
        if (!isEmptyList) {
            return (userList);
        }
    }


    if (props.type == "APPLICATIONS") {
        return <div className="mt-2">No applicants so far!</div>;
    } else if (props.type == "WORKING") {
        return (<div className="mt-2">No currently working users!</div>);
    }
};

export default UserList;
