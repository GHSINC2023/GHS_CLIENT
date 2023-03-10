import React, { useState, useEffect } from 'react'
import styles from '../../../../styles/components/dashboard/applicants/details.module.scss'
import Video from './video'
import { useMutation } from '@apollo/client'
import { updateApplicantStatus } from '../../../../util/applicaiton/application.mutation'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import Gcalendar from './gcalanedar'
import Message from '../../../message/message'

export default function ApplicantDetails({ close, apid, id, profile, email, interviewer, upload, status, job, date }: any) {

    const [ vid, setVideo ] = useState(false)
    const [ open, setOpened ] = useState(false)
    const [ gcl, setgcl ] = useState(false)
    const [ token, setToken ] = useState("")
    const [ message, setMessage ] = useState(false)

    const onClickFileBtn = (file: any) => {
        window.open(file)
    }

    useEffect(() => {
        const cookie = Cookies.get("ghs_access_token");
        if (cookie) {
            const { userID }: any = jwtDecode(cookie)
            setToken(userID)
        }
    }, [])

    const [ updateAppStats, { data, error } ] = useMutation(updateApplicantStatus, {

    })
    const upStatused = [
        { name: "Approved", value: "approved" },
        { name: "Rejected", value: "rejected" }
    ]


    const updateApp = (e: any) => {
        updateAppStats({
            variables: {
                applicantId: id,
                status: e.target.value,
                userId: token
            },
            onCompleted: data => {
                setMessage(true)
            }
        })
    }

    useEffect(() => {
        setTimeout(() => {
            setMessage(false)
        }, 1000)
    }, [])

    return (
        <div className={styles.container}>
            {gcl ?
                <div className={styles.calendar}>
                    <Gcalendar applicantID={id} userID={token} close={setgcl} />
                </div> : null
            }
            {data && message ? <div>
                <Message status='success' label='Successfully Updated' message='' />
            </div> : null}
            <div className={styles.header}>
                <button onClick={() => close("")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="" stroke="#D02222" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
            <div className={styles.body}>
                <div className={styles.aa}>
                    <h2>Personal Information</h2>
                    {status === "waiting" ? <div className={styles.options}>
                        <button onClick={() => {

                            setOpened(() => !open)
                            setgcl(false)
                        }}>
                            <div />
                            <div />
                            <div />
                        </button>
                        {open && status === "waiting" ?
                            <div className={styles.option}>
                                {interviewer.length === 0 ? null : <>
                                    <button onClick={() => setgcl(() => !gcl)}>Set an interview schedule</button>
                                    <hr />
                                </>}
                                {upStatused.map(({ name, value }) => (
                                    <button onClick={updateApp} key={name} value={value}>{name}</button>
                                ))}
                            </div> :
                            null
                        }
                    </div> : null}
                </div>
                <div className={styles.info}>
                    <div className={styles.upload}>
                        {upload.map(({ file, video }: any) => (
                            <>
                                {vid ? <div className={styles.video}>
                                    <Video video={video} close={setVideo} />
                                </div> : null}
                                <button onClick={() => onClickFileBtn(file)}>Resume</button>
                                <button onClick={() => setVideo(() => !vid)}>Video</button>
                            </>
                        ))}
                    </div>
                    <div className={styles.tableContainer}>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Application ID</th>
                                    <td>{apid}</td>
                                </tr>
                                <tr>
                                    <th>Status</th>
                                    <td>
                                        {status === "approved" ? "Approved" : null}
                                        {status === "rejected" ? "Rejected" : null}
                                        {status === "waiting" ? "Waiting" : null}
                                    </td>
                                </tr>
                                {profile.map(({ profielID, firstname, lastname }: any) => (
                                    <tr key={profielID}>
                                        <th>Name</th>
                                        <td>{lastname}, {firstname}</td>
                                    </tr>
                                ))}
                                {profile.map(({ profielID, phone }: any) => (
                                    <tr key={profielID}>
                                        <th>Phone</th>
                                        <td>{phone.includes(+63) ? phone.substring(3, 13) : phone}</td>
                                    </tr>
                                ))}
                                {profile.map(({ profileAddress }: any) => (
                                    profileAddress.map(({ addressID, city, province, zipcode, street }: any) => (
                                        <tr key={addressID}>
                                            <th>Address</th>
                                            <td>{street} {city} {province}, {zipcode}</td>
                                        </tr>
                                    ))
                                ))}
                                <tr>
                                    <th>Email</th>
                                    <td>{email}</td>
                                </tr>
                                <tr>
                                    <th>Interviewer</th>
                                    {interviewer.length === 0 ? <td>None</td> : interviewer.map(({ interviewerID, user }: any) => (
                                        user.map(({ profile }: any) => (
                                            profile.map(({ firstname, lastname }: any) => (
                                                <td key={interviewerID}>{firstname} {lastname}</td>
                                            ))
                                        ))
                                    ))}
                                </tr>
                                {job.map(({ title }: any) => (
                                    <tr key={title}>
                                        <th>Job Applied</th>
                                        <td>{title}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <th>Application Date</th>
                                    <td>{date}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div >
    )
}
