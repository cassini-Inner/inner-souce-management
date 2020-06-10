import React, { Fragment } from "react";
import UserList from "./UserList";
import Dropdown from "../../Common/Dropdown/Dropdown";
import { useState } from "react";
 
const Applications = (props) => {
    const initialDisplayHeaderState = true;
    const [ displayHeaderState, setFitlerDisplayState] = useState(initialDisplayHeaderState);
    return (
        <Fragment>
            {
                displayHeaderState
                    ?
                    <div className="mt-6 mb-8 px-2">
                        <div className="flex-col md:flex md:flex-row mb-2">
                            <div className="self-center flex-1 ">
                                <p className="text-sm font-semibold">Filter applications by type</p>
                                <p className="text-sm text-gray-600">
                                Since applicants can apply to specific milestones or complete job, you can filter applicants by application type.
                                </p>
                            </div>
                            <div className="flex">
                                <Dropdown list={["Job & Milestones", "Job", "Milestones"]} />
                            </div>
                        </div>
                    </div>
                    :
                    ""
            }
            <div className="flex-col my-6 px-2">
                <div className="flex text-sm ">
                    <div className="flex-1 font-semibold text-nebula-gray-600">
                        Applicants
                    </div>
                    {/*  Functionality to be added in version 2 
                    <div className="flex font-semibold mr-40 text-nebula-gray-600">
                        Application Type
                    </div> 
                    */}
                </div>
                <UserList type = "APPLICATIONS" jobId = {props.jobId} setFilterDisplay = {setFitlerDisplayState} />
            </div>
        </Fragment>

    );
};

export default Applications;
