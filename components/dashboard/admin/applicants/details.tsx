import React, { useState } from 'react'
import styles from '../../../../styles/components/dashboard/applicants/details.module.scss'
import { useRouter } from 'next/router'
import Video from './video'
export default function ApplicantDetails({ close, apid, profile, email, interviewer, upload, status, job, date }: any) {

    const [ vid, setVideo ] = useState(false)
    const router = useRouter()

    const onClickFileBtn = (file: any) => {
        window.open(file)
    }


    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button onClick={() => close(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="" stroke="#D02222" stroke-width="3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
            <div className={styles.body}>
                <h2>Personal Information</h2>
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
                                    <td>{status}</td>
                                </tr>
                                {profile.map(({ profielID, firstname, lastname }: any) => (
                                    <tr key={profielID}>
                                        <th>Name</th>
                                        <td>{lastname}, {firstname}</td>
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
