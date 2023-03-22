import React, { useState, useEffect } from 'react'
import styles from '../../styles/components/dashboard/notification/card.module.scss'
import { useRouter } from 'next/router'
import jwtDecode from 'jwt-decode'
import Cookies from 'js-cookie'
import { useMutation } from '@apollo/client'
import { updateNotificationStat } from '../../util/notifications/notification.mutation'
import { notificationAllQuery } from '../../util/notifications/notification.query'

export default function NotifCard({ createdAt, id, rec, title, status }: any) {
    const router = useRouter()
    const [ roles, setRoles ] = useState("")

    useEffect(() => {
        const cookies = Cookies.get("ghs_access_token")
        if (cookies) {
            const { role }: any = jwtDecode(cookies)
            setRoles(role)
        }
    }, [])


    const [ updateNoti ] = useMutation(updateNotificationStat)


    const onHandleUpdateNotificaiton = (e: any) => {
        e.preventDefault()
        updateNoti({
            variables: {
                notificationId: id
            },
            refetchQueries: [ {
                query: notificationAllQuery
            } ],
            onQueryUpdated: (ObservableQuery) => {
                return ObservableQuery.refetch()
            }
        })
    }

    return (
        <div onClick={onHandleUpdateNotificaiton} style={status === "unread" ? { backgroundColor: "#eee" } : {
            backgroundColor
                : "transparent"
        }} className={styles.notify}>
            {title === "New Applicant" ?
                <div onClick={() => {
                    router.push(`/dashboard/${roles}/applications`)
                }} className={styles.Notif}>
                    <div className={styles.notifSpan}>
                        <h2>{title}</h2>
                        <span>{createdAt}</span>
                    </div>
                </div> : null}
            {title === "New Job Post" ? <div onClick={() => {
                router.push(`/dashboard/${roles}/notification/${id}`)
            }} className={styles.Notif}>
                <div className={styles.notifSpan}>
                    {rec.map(({ profile }: any) => (
                        profile.map(({ firstname, lastname }: any) => (

                            <h2 key={firstname}> {title} from {firstname} {lastname}</h2>
                        ))
                    ))}
                    <span>{createdAt}</span>
                </div>
            </div> : null}
        </div >
    )
}
