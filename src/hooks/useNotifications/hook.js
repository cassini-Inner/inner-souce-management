import { useCallback, useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_USER_NOTIFICATIONS, GET_UNREAD_NOTIFICATIONS_COUNT } from "../../queries";
import {
    MARK_ALL_NOTIFICATIONS_READ,
    MARK_NOTIFICATION_READ,
} from "../../mutations";

const NOTIFICATION_LOAD_LIMIT = 10;

export function useNotifications () {
    const [notificationData, setNotificationData] = useState(
        {
            notifications: [], 
            unreadCount: 0,
            endCursor: "",
            hasNextPage: true,
            loading: true,
        },
    );

    const [getNotifications] = useLazyQuery(GET_USER_NOTIFICATIONS, {
        fetchPolicy: "cache-and-network",
        onCompleted: (data) => {
            if (data.ViewerNotifications && data.ViewerNotifications.edges) {
                const fetchedNotifications = data.ViewerNotifications.edges.map(
                    (edge) => edge.node,
                );
                const updatedNotifications = [...notificationData.notifications];
                updatedNotifications.push(...fetchedNotifications);
                setNotificationData(
                    {
                        ...notificationData,
                        notifications: updatedNotifications,
                        loading: false,
                        hasNextPage: data.ViewerNotifications.pageInfo.hasNextPage,
                        endCursor: data.ViewerNotifications.pageInfo.endCursor,
                    },
                );
            }
        },
    });

    const [getUnreadNotificationCount] = useLazyQuery(GET_UNREAD_NOTIFICATIONS_COUNT, {
        fetchPolicy: "cache-and-network",
        onCompleted: (data) => {
            setNotificationData(
                {
                    ...notificationData,
                    loading: false,
                    unreadCount: data.ViewerNotifications.unreadCount,
                },
            );
        }
    });

    const [markAllRead] = useMutation(
        MARK_ALL_NOTIFICATIONS_READ,
        {
            onCompleted: (data) => {
                const updatedList = [
                    ...notificationData.notifications.map((notification) => {
                        return {
                            ...
                            notification,
                            read: true,
                        };
                    })];
                setNotificationData({
                    ...notificationData,
                    notifications: updatedList,
                    unreadCount: 0,
                });
            },
        },
    );

    const [markNotificationReadMutation] = useMutation(
        MARK_NOTIFICATION_READ,
        {
            onCompleted: (data) => {
                const updatedList = [
                    ...notificationData.notifications.map((notification) => {
                        return {
                            ...notification,
                            read: notification.id ===
                          data.markViewerNotificationsRead[0].id
                                ? true
                                : notification.read,
                        };
                    })];
                setNotificationData({
                    ...notificationData,
                    notifications: updatedList,
                    unreadCount: notificationData.unreadCount -
                    data.markViewerNotificationsRead.length,
                });
            },
        },
    );
    
    const markNotificationRead = (notificationId) => {
        markNotificationReadMutation({
            variables: {
                ids: [notificationId],
            },
        }).catch((e) => console.log(e));
    };

    const refreshNotifications = useCallback(
        () => {
            setNotificationData({
                ...notificationData,
                notifications: [],
            });
            getUnreadNotificationCount({variables: { limit: 1 }});
            getNotifications({ variables: { limit: NOTIFICATION_LOAD_LIMIT } });
        }, []);

    const loadMoreNotifications = useCallback(() => {
        getNotifications(
            {
                variables: {
                    after: notificationData.endCursor,
                    limit: NOTIFICATION_LOAD_LIMIT,
                },
            },
        );
    }, [notificationData]);

    useEffect(() => {
        setNotificationData({
            ...notificationData,
            loading: true,
        });
        getUnreadNotificationCount({variables: { limit: 1 }});
        getNotifications({ variables: { limit: NOTIFICATION_LOAD_LIMIT } });
        return () => {};
    }, []);
    return {
        ...notificationData,
        loadMoreNotifications,
        markAllRead,
        refreshNotifications,
        markNotificationRead,
    };
}
