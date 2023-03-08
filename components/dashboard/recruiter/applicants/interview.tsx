import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import styles from '../../.././../styles/components/dashboard/applicants/card.module.scss'
import { CreateInterviewer } from '../../../../util/interviewer/interviewer.mutation'
import jwtDecode from 'jwt-decode'
import Cookies from 'js-cookie'
import Message from '../../../message/message'
export default function Interview({ appId, close }: any) {
    const [ token, setToken ] = useState("")
    const [ message, setMessage ] = useState(false)
    useEffect(() => {
        const cookies = Cookies.get("ghs_access_token")
        if (cookies) {
            const { userID }: any = jwtDecode(cookies)
            setToken(userID)
        }
    }, [])
    const [ applicantInterview, { data, error } ] = useMutation(CreateInterviewer)


    const formInterview = (e: any) => {
        e.preventDefault()
        applicantInterview({
            variables: {
                userId: token,
                applicantId: appId
            },
            onCompleted: (data) => {
                setMessage(true)
            },
            onError: err => {
                console.log(err.message)
            }
        })

    }
    useEffect(() => {
        setTimeout(() => {
            setMessage(true)
        }, 2000)
    }
        , [ message ])
    return (
        <div className={styles.interviewCard}>
            {data && message ? < div > <Message label={'Successfully Interviewed'} status={'success'} message={''} /> </div> : null
            }
            <h2>Interview</h2>
            <span>Do you want to interview this person?</span>
            <div className={styles.interviewBtn}>
                <button onClick={() => close("")}>Cancel</button>
                <button onClick={(e) => {
                    formInterview(e)
                    close("")
                }}>Yes, Interview</button>
            </div>
        </div >
    )
}
