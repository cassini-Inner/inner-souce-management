import React, { Fragment } from "react";
import UserList from "./UserList";
import Dropdown from "../../Common/Dropdown/Dropdown";

const Applications = () => {

    return(
        <Fragment>
            <div className = "my-6 flex-col px-2 mb-16">
                <div className = "flex mb-2">
                    <div className = "self-center flex-1 text-lg font-semibold">
                        Filter applications by type
                    </div>
                    <div className = "flex">
                        <Dropdown list = { ["Job & Milestones", "Job", "Milestones"] }/>
                    </div>
                </div>
                <div>
                    Since applicants can apply to specific milestones or complete job, you can filter applicants by application type.
                </div>
            </div>
            <div className = "flex-col my-6 px-2">
                <div className = "flex">
                    <div className = "flex-1 font-semibold">
                        Applicant
                    </div>
                    <div className = "flex font-semibold mr-40">
                        Application Type
                    </div>
                </div>
                <UserList />
            </div>
        </Fragment>
        
    );
}

export default Applications;