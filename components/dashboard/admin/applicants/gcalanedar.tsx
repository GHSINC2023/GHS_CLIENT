import React, { useState } from 'react'
import styles from '../../../../styles/components/dashboard/applicants/calendar.module.scss'
import { createScreenApplicant } from '../../../../util/applicaiton/application.mutation'
import { useMutation } from '@apollo/client'


export default function Gcalendar({ applicantID, userID }: any) {


    const [ cal, setCal ] = useState({
        start: "",
        end: ""
    })


    const [ createGoogleCalendar ] = useMutation(createScreenApplicant, {
        variables: {
            applicantId: applicantID,
            start: cal.start,
            end: cal.end,
            userId: userID
        }
    })


    const onHandleGoogleCalendar = (e: any) => {
        e.preventDefault();
        createGoogleCalendar()
    }
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button>
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
