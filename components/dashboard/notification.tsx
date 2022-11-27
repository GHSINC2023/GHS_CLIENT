import React from 'react'
import NotifCard from '../card/notifcard'
import styles from '../../styles/components/dashboard/notification/notification.module.scss'
import { useQuery } from '@apollo/client'
import { format } from 'date-fns'
import { notificationQuery } from '../../util/notifications/notification.query'


export default function Notification({ open, close }: any) {

    const { loading, data, error } = useQuery(notificationQuery)

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Notifications</h2>
            <div className={styles.notifHolder}>
                {loading ? "Loading" : data.getNotificationByStatus.map(({ notificationID, createdAt, user, notificationJob }: any) => (
                    user.map(({ profile }: any) => (
                        profile.map(({ firstname, lastname }: any) => (
                            notificationJob.map(({ jobPostID }: any) => (
                                <NotifCard jobid={jobPostID} opens={open} close={close} id={notificationID} key={notificationID} createdAt={format(new Date(createdAt), "MMM dd, yyyy")} user={`${firstname} ${lastname}`} />
                            ))
                        ))
                    ))
                ))}
            </div>
        </div>
    )
}
