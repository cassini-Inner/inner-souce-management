import React, { useCallback, useRef } from "react";
import LoadingIndicator from "../Common/LoadingIndicator/LoadingIndicator";
import { NotificationItem } from "./notification_item";

export const NotificationList = ({ loading, notifications, hasNextPage, loadMoreNotifications, markNotificationRead }) => {
    const observer = useRef();
    const loadMoreRef = useCallback(node => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !loading && hasNextPage) {
                loadMoreNotifications();
            }
        });
        if (node) observer.current.observe(node);
    }, [notifications]);

    return (<div>
        {notifications &&
        notifications.map(
            (notification, index) =>
                <NotificationItem
                    key={index}
                    jobId={notification.job.id}
                    jobTitle={notification.job.title}
                    photoUrl={notification.sender.photoUrl}
                    senderName={notification.sender.name}
                    timeCreated={notification.timeCreated}
                    type={notification.type}
                    read={notification.read}
                    markNotificationRead={markNotificationRead}
                    id={notification.id}
                />,
        )

        }
        <div ref={loadMoreRef}>
            {hasNextPage &&
            <LoadingIndicator/>
            }
        </div>
    </div>);
};
