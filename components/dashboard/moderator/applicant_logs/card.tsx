import React, { useState, useRef, useEffect } from 'react'
import styles from '../../../../styles/components/dashboard/applicants/card.module.scss'
import { applicantProfile } from '../../../../interface/applicant'
import { statused } from '../../../../util/values/filter'
import { updateApplicantStatus } from '../../../../util/applicaiton/application.mutation'
import ApplicantDetails from './details'
import dynamic from 'next/dynamic'
import { useMutation } from '@apollo/client'
import Message from '../../../message/message'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'

const Interview = dynamic(() => import('./interview'), {
    ssr: false
})
export default function Card({ profile, interviewer, job, email, id, apid, upload, status, date }: any) {

    const [ user, setUser ] = useState(false)
    const [ applicantID, setApplicantID ] = useState("")
    const [token, setToken] = useState("")
    const [ message, setMessage ] = useState(false)
    const [ interviewe, setInterviewe ] = useState(false)
    const handleOptionIDRef = useRef<HTMLDivElement>(null)

    const handleOptionClick = () => {
        setApplicantID(() => apid)
        if (apid === applicantID) {
            setApplicantID(() => "")
        }
    }


    useEffect(() => {
        const cookies = Cookies.get("ghs_access_token");
        if(cookies) {
            const { userID}: any = jwtDecode(cookies)
            setToken(userID)
        }
    }, [])
    useEffect(() => {
        const handleClick = (event: any) => {
            if (handleOptionIDRef.current && !handleOptionIDRef.current.contains(event.target)) {
                let clicks = 0;
                clicks++
                if (clicks === 1) {
                    setTimeout(() => {
                        setApplicantID("")
                    }, 100)
                }
            }
        }

        document.addEventListener("mousedown", handleClick)

        return () => {
            document.removeEventListener("mousedown", handleClick)
        }
    }, [ applicantID ])


    const [ applicantStatus, { data } ] = useMutation(updateApplicantStatus)

    const formUpdateApplicantStatus = (e: any) => {
        e.preventDefault()
        applicantStatus({
            variables: {
                status: e.target.value,
                applicantId: applicantID,
                userId: token
            },
            onCompleted: () => {
                setMessage(true)
            }
        })
    }

    useEffect(() => {
        setTimeout(() => {
            setMessage(false)
        }, 1500)
    }, [ message ])
    return (
        <div className={styles.card}>
            {user ? <div className={styles.details}>
                <ApplicantDetails apid={id} status={status} job={job} close={setUser} email={email} interviewer={interviewer} profile={profile} upload={upload} date={date} />
            </div> : null}
            {data && message ? <div className={styles.message}> <Message label='Successfully Updated' message='' status={'success'} /></div> : null}
            {
                interviewe ? <div className={styles.interv}>
                    <Interview appId={apid} close={setInterviewe} open={interviewe} />
                </div> : null
            }
            <div className={styles.head}>
                {profile.map(({ profileID, firstname, lastname }: applicantProfile) => (
                    <h2 key={profileID}>{lastname}, {firstname}</h2>
                ))}
                {status === "waiting" ?
                    interviewer.length === 0 ? null :
                        <div className={styles.options}>
                            <button onClick={handleOptionClick}>
                                <div />
                                <div />
                                <div />
                            </button>
                            {apid === applicantID ? <div ref={handleOptionIDRef} className={styles.update}>
                                {statused.map(({ name, value }) => (
                                    <button onClick={formUpdateApplicantStatus} key={name} value={value}>
                                        {name}
                                    </button>
                                ))}
                            </div> : null}

                        </div>
                    : null
                }
            </div>
            <div className={styles.body}>
                <div className={styles.id}>
                    <span>Applicant ID: </span>
                    <span>{id}</span>
                </div>
                <div className={styles.interviewer}>
                    <span>Interviewer</span>
                    {interviewer.length === 0 ? <button className={styles.interviewBtn} onClick={() => setInterviewe(() => !interviewe)}>Interview</button> :
                        interviewer.map(({ interviewerID, user }: any) => (
                            user.map(({ profile: prof }: any) => (
                                prof.map(({ profileID, firstname, lastname }: any) => (
                                    <span key={interviewerID}>{firstname} {lastname}</span>
                                ))
                            ))
                        ))}
                </div>
                <div className={styles.job}>
                    <span>Job Apply:</span>
                    {job.map(({ title }: any) => (
                        <span key={title}>{title}</span>
                    ))}
                </div>
            </div>
            <button type="button" className={styles.viewBtn} onClick={() => setUser(() => !user)}>View</button>
        </div >
    )
}
