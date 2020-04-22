import React, { Fragment } from "react";
import UserList from "./UserList";
import Dropdown from "../../Common/Dropdown/Dropdown";
import { useState } from "react";
 
const Applications = (props) => {
    const initialDisplayHeaderState = true;
    const [ displayHeaderState, setDisplayState] = useState(initialDisplayHeaderState);
    if(displayHeaderState) {
        return (
            <Fragment>
                <div className="mt-6 mb-8 flex-col px-2">
                    <div className="flex mb-2">
                        <div className="self-center flex-1 ">
                            <p className="text-base font-semibold">Filter applications by type</p>
                            <p className="text-sm text-gray-700">
                                Since applicants can apply to specific milestones or complete job, you can filter applicants by application type.
                            </p>
                        </div>
                        <div className="flex">
                            <Dropdown list={["Job & Milestones", "Job", "Milestones"]} />
                        </div>
                    </div>

                </div>
                <div className="flex-col my-6 px-2">
                    <div className="flex text-sm ">
                        <div className="flex-1 font-semibold text-nebula-gray-600">
                            Applicant
                        </div>

                        {/*  Functionality to be added in version 2 
                        <div className="flex font-semibold mr-40 text-nebula-gray-600">
                            Application Type
                        </div> 
                        */}
                    
                    </div>
                    <UserList type = "APPLICATIONS" jobId = {props.jobId} setDisplayState = {setDisplayState} />
                </div>
            </Fragment>

        );
    }
    else{
        return(<div className="ml-2 mt-2">No applicants</div>)
    }
};

export default Applications;
