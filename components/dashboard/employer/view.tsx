
import React, { useState, useEffect } from 'react'
import styles from '../../../styles/components/dashboard/endorse/view.module.scss'
import { getEndorseByIDs, } from '../../../util/endorse/endorse.query'
import { statused } from '../../../util/values/filter'
import { useMutation, useQuery } from '@apollo/client'
import { feedCreate } from '../../../util/feedback/feedback.mutation'
import { format } from 'date-fns'
import { updateEndorse } from '../../../util/endorse/endorse.mutation'

import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'

export default function View({ id: endorseID, userid, close }: any) {

    const [ token, setToken ] = useState("");



    useEffect(() => {
        const cookies = Cookies.get('ghs_access_token');
        if (cookies) {
            const { userID }: any = jwtDecode(cookies);

            setToken(userID)
        }
    }, [ token ])

    const { loading, data } = useQuery(getEndorseByIDs, {
        variables: {
            endorseId: endorseID
        },

    })

    console.log(endorseID)

    const [ feedbacks, setFeedback ] = useState("")
    const [ open, setOpened ] = useState(false)


    const [ createAFeedback ] = useMutation(feedCreate)

    const [ updateEndorseStatus ] = useMutation(updateEndorse)

    const onUpdateStatus = (e: any) => {
        e.preventDefault();
        updateEndorseStatus({
            variables: {
                endorseStatus: e.target.value,
                endorseId: endorseID,
                userId: token
            }
        })
    }

    if (loading) return null

    return (
        <div className={styles.container}>
            <div className={styles.updateContainer}>
                <button onClick={() => close(false)} className={styles.btn}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d02222" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
            <div className={styles.contain}>
                {loading ? "Loading" : data.getEndorseByID.map(({ endorseID, endorseStatus, createdAt, endorsement, feedback }: any) => (
                    endorsement.map(({ applicants }: any) => (
                        applicants.map(({ applicantProfile, applicantID, email }: any) => (
                            applicantProfile.map(({ firstname, lastname, phone, birthday, profileAddress }: any) => (
                                profileAddress.map(({ city, province, street, zipcode }: any) => (
                                    <div key={endorseID}>
                                        {console.log(applicantID)}
                                        <div className={styles.header}>
                                            <h2>Personal Information</h2>
                                            <div className={styles.options}>
                                                <button onClick={() => setOpened(() => !open)} className={styles.opBtn}>
                                                    <div />
                                                    <div />
                                                    <div />
                                                </button>
                                                {open ? <div className={styles.option}>
                                                    {statused.map(({ name, value }) => (
                                                        <button onClick={onUpdateStatus} key={name} value={value}>{name}</button>
                                                    ))}
                                                </div> : null}
                                            </div>
                                        </div>

                                        <div className={styles.table}>
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <th>Name</th>
                                                        <td>{lastname}, {firstname}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Email</th>
                                                        <td>{email}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Status</th>
                                                        <td>
                                                            {endorseStatus === "waiting" ? "Waiting" : null}
                                                            {endorseStatus === "approved" ? "Approved" : null}
                                                            {endorseStatus === "rejected" ? "Rejected" : null}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>Birthday</th>
                                                        <td>{format(new Date(birthday), "MMMM dd, yyyy")}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Phone</th>
                                                        <td>{phone}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Address</th>
                                                        <td>{street}, {city} {province}, {zipcode}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Date Endorsed</th>
                                                        <td>{format(new Date(createdAt), "MMMM dd, yyyy")}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        {
                                            feedback.length === 0 ?
                                                <div className={styles.feedback}>
                                                    <form onSubmit={(e) => {
                                                        e.preventDefault()
                                                        createAFeedback({
                                                            variables: {
                                                                feedback: feedbacks,
                                                                userId: userid,
                                                                endorseId: endorseID,
                                                                applicantId: applicantID
                                                            }
                                                        })
                                                    }}>
                                                        <textarea placeholder='Give a feedback...' onChange={e => setFeedback(e.target.value)} />
                                                        <button disabled={!feedbacks} type="submit">Submit</button>
                                                    </form>
                                                </div> :
                                                feedback.map(({ feedbackID, feedback, createdAt }: any) => (
                                                    <div className={styles.feedbacks} key={feedbackID}>
                                                        <div className={styles.dates}>
                                                            <h2>Feedback</h2>
                                                            <span>{format(new Date(createdAt), "MMMM dd yyyy")}</span>
                                                        </div>
                                                        <p>{feedback}</p>
                                                    </div>
                                                ))
                                        }
                                    </div>
                                ))
                            ))
                        ))
                    ))
                ))}

            </div>
        </div >
    )
}
