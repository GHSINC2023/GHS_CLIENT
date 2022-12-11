import React, { useState, useRef, useEffect } from 'react'
import styles from '../../styles/components/dashboard/header.module.scss'
import Image from 'next/image'
import { notificationQuery } from '../../util/notifications/notification.query'
import { useQuery } from '@apollo/client'
import Notification from './notification'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import { notifSub } from '../../util/notifications/notification.subscriptions'


export default function Header() {
    const ref = useRef<HTMLDivElement>(null)
    const [ notif, setNotif ] = useState(false)
    const [ roles, setRoles ] = useState("")
    useEffect(() => {
        const handleClick = (event: any) => {
            if (ref.current && !ref.current?.contains(event.target)) {
                let clicks = 0;
                clicks++;
                if (clicks === 1) {
                    setTimeout(() => {
                        clicks = 0;
                        setNotif(false)
                    }, 300)
                }

            }
        }

        document.body.addEventListener("mousedown", handleClick)

        return () => {
            document.body.removeEventListener("mousedown", handleClick)
        }
    }, [ notif ])

    useEffect(() => {
        const cookies = Cookies.get("ghs_access_token")
        if (cookies) {
            const { role }: any = jwtDecode(cookies)
            setRoles(role)
        }
    }, [])


    const { loading, data, error, subscribeToMore } = useQuery(notificationQuery)


    useEffect(() => {
        return subscribeToMore({
            document: notifSub,
            onError(error) {
                console.log(error.message)
            },
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const newNotif = subscriptionData.data.NotificationSubscriptions
                return Object.assign({}, {
                    getNotificationByStatus: [ ...prev.getNotificationByStatus, newNotif ]
                })
            }
        })
    }, [ subscribeToMore ])

    return (
        <div className={styles.container}>
            {
                roles === "administrator" ?
                    <div className={styles.NotifContainer}>
                        <button onClick={() => setNotif(() => !notif)}>
                            <Image src="/dashboard/bell-line.svg" alt="" height={30} width={30} />
                            {
                                loading ? null
                                    : data.getNotificationByStatus.length === 0 ? null :
                                        <div className={styles.badge}>
                                            <span>{data.getNotificationByStatus.length}</span>
                                        </div>
                            }

                        </button>
                        {notif ?
                            <div ref={ref} className={styles.notify}>
                                <Notification open={notif} close={setNotif} />
                            </div> : null
                        }
                    </div>
                    :
                    roles === "manager" ?
                        <div className={styles.NotifContainer}>
                            <button onClick={() => setNotif(() => !notif)}>
                                <Image src="/dashboard/bell-line.svg" alt="" height={30} width={30} />
                                {
                                    loading ? null
                                        : data.getNotificationByStatus.length === 0 ? null :
                                            <div className={styles.badge}>
                                                <span>{data.getNotificationByStatus.length}</span>
                                            </div>
                                }

                            </button>
                            {notif ?
                                <div ref={ref} className={styles.notify}>
                                    <Notification open={notif} close={setNotif} />
                                </div> : null
                            }
                        </div> :
                        roles === "moderator" ? <div className={styles.NotifContainer}>
                            <button onClick={() => setNotif(() => !notif)}>
                                <Image src="/dashboard/bell-line.svg" alt="" height={30} width={30} />
                                {
                                    loading ? null
                                        : data.getNotificationByStatus.length === 0 ? null :
                                            <div className={styles.badge}>
                                                <span>{data.getNotificationByStatus.length}</span>
                                            </div>
                                }

                            </button>
                            {notif ?
                                <div ref={ref} className={styles.notify}>
                                    <Notification open={notif} close={setNotif} />
                                </div> : null
                            }
                        </div> : null
            }
        </div>
    )
}
