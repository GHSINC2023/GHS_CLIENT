import React from 'react'
import NotifCard from '../card/notifcard'
import styles from '../../styles/components/dashboard/notification/notification.module.scss'
import { useQuery } from '@apollo/client'
import { format } from 'date-fns'
import { notificationAllQuery } from '../../util/notifications/notification.query'


export default function Notification({ open, close }: any) {

    const { loading, data } = useQuery(notificationAllQuery, {
        pollInterval: 1000,
        fetchPolicy: "cache-and-network",
    })
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Notifications</h2>
            <div className={styles.notifHolder}>
                {loading ? null : data.getAllNotification.map(({ notificationID, title, createdAt, user, notificationJob, notificationStatus, userApplications }: any) => (
                    <NotifCard key={notificationID} id={notificationID} title={title}
                        applicants={userApplications} status={notificationStatus} rec={user} createdAt={format(new Date(createdAt), "MMMM dd, yyyy")} />
                ))}
            </div>
        </div>
    )
}
