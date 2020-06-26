import React from "react";
import UserCard from "./UserCard";

const UserCardsGrid = (props) => {
    if (props.users != null) {
        const maxCount = props.users.length;
        const users = props.users.slice(0, maxCount);
        return (
            <div className="mb-10 mt-4">
                <div className="grid grid-cols-1 row-gap-4 md:grid-cols-2 md:col-gap-4 md:row-gap-4">
                    {users.map((user) => {
                        return <UserCard user={user} key={user.id} />;
                    })}
                </div>
            </div>
        );
    }
    else {
        return (<p className="mt-2">No users found matching the query!</p>);
    }
};


export default (UserCardsGrid);

