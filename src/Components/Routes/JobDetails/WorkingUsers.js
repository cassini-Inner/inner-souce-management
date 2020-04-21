import React from "react";
import UserList from "./UserList";

const WorkingUsers = (props) => {
    return (
        <div className="px-4">
            <UserList type = "WORKING" jobId = {props.jobId}/>
        </div>
    );
};

export default WorkingUsers;