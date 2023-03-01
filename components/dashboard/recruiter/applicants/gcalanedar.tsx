import React, { useEffect, useState } from 'react'
import styles from '../../../../styles/components/dashboard/applicants/calendar.module.scss'
import { createScreenApplicant } from '../../../../util/applicaiton/application.mutation'
import { useMutation } from '@apollo/client'
import Message from '../../../message/message'

export default function Gcalendar({ applicantID, userID, close }: any) {


    const [ cal, setCal ] = useState({
        start: "",
        end: ""
    })

    const [ message, setMessage ] = useState(false)

    const [ createGoogleCalendar, { data } ] = useMutation(createScreenApplicant, {
        variables: {
            applicantId: applicantID,
            start: cal.start,
            end: cal.end,
            userId: userID
        },
        onCompleted: () => {
            setMessage(true)
        }
    })

    useEffect(() => {
        setInterval(() => {
            setMessage(false)
        }, 1000)
    }, [])

    const onHandleGoogleCalendar = (e: any) => {
        e.preventDefault();
        createGoogleCalendar()
    }
    return (
        <div className={styles.container}>
            {data && message ? <div className={styles.message
            }>
                <Message label='Successfully Link Created' message='' status='success' />
            </div> : null}
            <div className={styles.header}>
                <button onClick={() => close(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d02222" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
            <form>
                <div>
                    <label>Start</label>
                    <input value={cal.start} onChange={(e) => setCal({ ...cal, start: e.target.value })} type="datetime-local" />
                </div>
                <div>
                    <label>End</label>
                    <input value={cal.end} onChange={(e) => setCal({ ...cal, end: e.target.value })} type="datetime-local" />
                </div>
                <button onClick={onHandleGoogleCalendar}>Create link</button>
            </form>
        </div>
    )
}
