import React, { useState, useEffect } from 'react'
import styles from '../../styles/components/dashboard/notification/card.module.scss'
import { useRouter } from 'next/router'
import jwtDecode from 'jwt-decode'
import Cookies from 'js-cookie'

export default function NotifCard({ createdAt, id, rec, title }: any) {
    const router = useRouter()
    const [ roles, setRoles ] = useState("")

    useEffect(() => {
        const cookies = Cookies.get("ghs_access_token")
        if (cookies) {
            const { role }: any = jwtDecode(cookies)
            setRoles(role)
        }
    }, [])


    return (
        <div className={styles.notify}>
            {title === "New Applicant" ? <div onClick={() => {
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
