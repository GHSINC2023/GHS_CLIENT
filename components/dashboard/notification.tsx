import React, { useEffect } from 'react'
import NotifCard from '../card/notifcard'
import styles from '../../styles/components/dashboard/notification/notification.module.scss'
import { useQuery } from '@apollo/client'
import { format } from 'date-fns'
import { notificationQuery } from '../../util/notifications/notification.query'


export default function Notification({ open, close }: any) {

    const { loading, data, error } = useQuery(notificationQuery, {
        pollInterval: 1000,
        fetchPolicy: "cache-and-network",
    })
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Notifications</h2>
            <div className={styles.notifHolder}>
                {loading ? null : data.getNotificationByStatus.map(({ notificationID, title, createdAt, user, notificationJob, userApplications }: any) => (
                    <NotifCard key={notificationID} id={notificationID} title={title}
                        applicants={userApplications} rec={user} createdAt={format(new Date(createdAt), "MMMM dd, yyyy")} />
                ))}
            </div>
        </div>
    )
}
