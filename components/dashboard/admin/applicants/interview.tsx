import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import styles from '../../.././../styles/components/dashboard/applicants/card.module.scss'
import { CreateInterviewer } from '../../../../util/interviewer/interviewer.mutation'
import jwtDecode from 'jwt-decode'
import Cookies from 'js-cookie'

export default function Interview({ appId, close }: any) {
    const [ token, setToken ] = useState("")
    useEffect(() => {
        const cookies = Cookies.get("ghs_access_token")
        if (cookies) {
            const { userID }: any = jwtDecode(cookies)
            setToken(userID)
        }
    }, [])
    const [ applicantInterview ] = useMutation(CreateInterviewer)


    const formInterview = (e: any) => {
        e.preventDefault()
        applicantInterview({
            variables: {
                userId: token,
                applicantId: appId
            },
            onCompleted: (data) => {
                if (data) {
                    close(() => "")
                }
            },
            onError: err => {
                console.log(err.message)
            }
        })

    }

    return (
        <div className={styles.interviewCard}>
            <h2>Interview</h2>
            <span>Do you want to interview this person?</span>
            <div className={styles.interviewBtn}>
                <button onClick={() => close("")}>Cancel</button>
                <button onClick={() => {
                    formInterview
                    close("")
                }}>Yes, Interview</button>
            </div>
        </div>
    )
}
