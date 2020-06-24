import { useCallback, useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_USER_NOTIFICATIONS } from "../../queries";
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
                const unreadCount = updatedNotifications.filter(
                    (element) => element.read === false).length;
                setNotificationData(
                    {
                        ...notificationData,
                        notifications: updatedNotifications,
                        loading: false,
                        unreadCount: unreadCount,
                        hasNextPage: data.ViewerNotifications.pageInfo.hasNextPage,
                        endCursor: data.ViewerNotifications.pageInfo.endCursor,
                    },
                );
            }
        },
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
