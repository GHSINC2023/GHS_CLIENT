import React, { useState, useEffect } from 'react'
import styles from '../../styles/components/dashboard/notification/card.module.scss'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import Message from '../message/message'
import { jobStatusMutation } from '../../util/job/job.mutation'
import { statused } from '../../util/values/filter'
import jwtDecode from 'jwt-decode'
import Cookies from 'js-cookie'


interface Notif {
    id: string
    user: string
    createdAt: string
    close: any
    opens: any
    jobid: string
}


export default function NotifCard({ createdAt, id, jobid, user }: Notif) {
    const router = useRouter()
    const [ open, setOpened ] = useState(false)
    const [ message, setMessage ] = useState(false)
    const [ roles, setRoles ] = useState("")
    const [ updateJobPostNotificaiton, { data, } ] = useMutation(jobStatusMutation)

    useEffect(() => {
        const cookies = Cookies.get("ghs_access_token")
        if (cookies) {
            const { role }: any = jwtDecode(cookies)
            setRoles(role)
        }
    }, [])

    const updateJobStatus = (e: any) => {
        e.preventDefault()
        updateJobPostNotificaiton({
            variables: {
                jobPostId: jobid,
                status: e.target.value
            },
            onCompleted: data => {
                setMessage(true)
            },
            onError: (e) => {
                console.log(e.message)
            }
        })
    }

    useEffect(() => {
        setTimeout(() => {
            setMessage(false)
        }, 1500)
    }, [ message ])

    return (
        <div className={styles.notify}>
            {data && message ? <div className={styles.message}>
                <Message label={'Successfully Updated'} status={'success'} message={''} />
            </div> : null}
            <div onClick={() => router.push(`/dashboard/${roles}/notification/${id}`)} className={styles.Notif}>
                <div className={styles.notifSpan}>
                    <h2>New Job Post from {user}</h2>
                    <span>{createdAt}</span>
                </div>
            </div>
            <div className={styles.bnt}>
                <button className={styles.opt} onClick={() => setOpened(() => !open)}>
                    <div className={styles.optCircle} />
                    <div className={styles.optCircle} />
                    <div className={styles.optCircle} />
                </button>
            </div>
            {open ?
                <div className={styles.optionNotif}>
                    {statused.map(({ name, value }) => (
                        <button onClick={updateJobStatus} className={styles.notifBtn} key={name} value={value}>{name}</button>
                    ))}
                </div> :
                null
            }
        </div>
    )
}
