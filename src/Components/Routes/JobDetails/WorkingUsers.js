import React from "react";
import UserList from "./UserList";

const WorkingUsers = (props) => {
    return (
        <div className="px-4">
            <UserList type = "WORKING"/>
        </div>
    );
};

export default WorkingUsers;