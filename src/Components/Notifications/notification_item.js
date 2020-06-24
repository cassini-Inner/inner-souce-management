import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import Avatar from "../Common/Avatar/Avatar";
import { getRelativeTime } from "../../HelperFunctions/TimeDiffMsg";
import { Briefcase, CheckCircle, MessageCircle } from "react-feather";

export const NotificationItem = ({
    photoUrl,
    senderName,
    jobTitle,
    jobId,
    timeCreated,
    type,
    read,
    id,
    markNotificationRead,
}) => {
    const notificationMessage = useMemo(() => {
        switch (type) {
        case "APPLICATION_CREATED": {
            return "applied for";
        }
        case "APPLICATION_ACCEPTED": {
            return "accepted your application for";
        }
        case "APPLICATION_REJECTED": {
            return "rejected your application for";
        }
        case "APPLICATION_WITHDRAWN": {
            return "withdrawed the application for";
        }
        case "APPLICATION_REMOVED": {
            return "removed you from";
        }
        case "COMMENT_ADDED": {
            return "commented on";
        }
        case "MILESTONE_COMPLETED": {
            return "marked a milestone completed in";
        }
        default: {
            return "";
        }
        }
    }, [type]);

    return (
        <Link to={"/jobDetails/" + jobId}>
            <div
                onClick={() => markNotificationRead(id)}
                className={"flex border-1 border-b p-4 items-center hover:bg-nebula-grey-300 " +
            (read ? "opacity-50 bg-nebula-grey-200" : "")}>
                <div className="flex flex-1 space-x-4">
                    <Avatar imagePath={photoUrl} className="h-10 w-10"/>
                    <div className="flex flex-col">
                        <p className="font-medium text-nebula-grey-800 text-sm">
                            {senderName} {notificationMessage} {jobTitle}
                        </p>
                        <p className="text-xs text-nebula-grey-600">
                            {getRelativeTime(timeCreated)}
                        </p>
                    </div>
                </div>
                <div
                    className="p-2 ml-2 my-auto bg-nebula-blue-light fill-current text-nebula-blue rounded-full"
                >
                    <NotificationIcons type={type} className="h-5 w-5"/>
                </div>
            </div>
        </Link>
    );
};

export const NotificationIcons = ({ type, className }) => {
    switch (type) {
    case "APPLICATION_CREATED": {
        return <Briefcase className={className}/>;
    }
    case "APPLICATION_ACCEPTED": {
        return <Briefcase className={className}/>;
    }
    case "APPLICATION_REJECTED": {
        return <Briefcase className={className}/>;
    }
    case "APPLICATION_WITHDRAWN": {
        return <Briefcase className={className}/>;
    }
    case "APPLICATION_REMOVED": {
        return <Briefcase className={className}/>;
    }
    case "COMMENT_ADDED": {
        return <MessageCircle className={className}/>;
    }
    case "MILESTONE_COMPLETED": {
        return <CheckCircle className={className}/>;
    }
    default: {
        return "";
    }
    }
};
