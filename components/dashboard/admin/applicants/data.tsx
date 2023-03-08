import React, { useState, useEffect } from 'react'
import ApplicantCard from './details'
import styles from '../../../../styles/components/dashboard/applicants/data.module.scss'
import { useQuery } from '@apollo/client'
import { applicationQuery } from '../../../../util/applicaiton/application.query'
import { applicant } from '../../../../interface/applicant'
import { format } from 'date-fns'
import Image from 'next/image'
import Interview from './interview'

export default function DataApplicants({ status, orders, limit, dataSearch }: any) {
    const [ pages, setPages ] = useState(0)

    const { loading, data } = useQuery(applicationQuery, {
        variables: {
            status: status,
            limit: limit,
            order: orders,
            offset: pages * limit
        },
        pollInterval: 1000,
        onCompleted: () => {
            setID("")
        },
        onError: error => {
            console.log(error.message)
        }
    })
    const [ ids, setID ] = useState("")
    const [ interviewe, setInterview ] = useState("")
    return (
        <div className={styles.container}>

            {loading ? null : data.getApplicationByStatus.map((
                { applicantID, id, email, status, applicantProfile, applicantInterviewer, createdAt, applyJobPost, applicantUpload }: applicant) => (
                ids === applicantID ? <div className={styles.app}>
                    <ApplicantCard key={id} status={status} date={format(new Date(createdAt), "MMMM dd, yyy")} apid={id} id={applicantID} email={email} profile={applicantProfile} interviewer={applicantInterviewer} job={applyJobPost} upload={applicantUpload} close={setID} />
                </div> : null
            ))}
            {
                interviewe ?
                    <div className={styles.interviews}>
                        <Interview appId={interviewe} close={setInterview} />
                    </div> : null
            }
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Applicant ID</th>
                        <th>Job Apply</th>
                        <th>Application Date</th>
                        <th>Interview By</th>
                        {status === "rejected" ? null : <th>Action</th>}
                    </tr>
                </thead>
                <tbody>
                    {dataSearch ? dataSearch?.searchApplicantID.map(({ applicantID, id, applicantInterviewer, applicantProfile, createdAt, applyJobPost }: applicant) => (
                        applicantProfile.map(({ firstname, lastname }) => (
                            applyJobPost.map(({ title }) => (
                                <tr key={applicantID}>
                                    <td>{firstname} {lastname}</td>
                                    <td>{id}</td>
                                    <td>{title}</td>
                                    <td>{format(new Date(createdAt), "MMM dd, yyyy")}</td>
                                    {applicantInterviewer.length === 0 ?
                                        <td className={styles.int}>

                                            <button onClick={() => setInterview(applicantID)} className={styles.interview}>Interview</button>
                                        </td> : applicantInterviewer.map(({ user }: any) => (
                                            user.map(({ profile }: any) => (
                                                profile.map(({ profileID, firstname, lastname }: any) => (
                                                    <td key={profileID}>{firstname} {lastname}</td>
                                                ))
                                            ))
                                        ))}
                                    {
                                        status === "rejected" ? null :
                                            <td className={styles.buttons}>
                                                <button onClick={() => setID(() => applicantID)}>
                                                    <Image src="/dashboard/eye-line.svg" alt="" height={25} width={25} />
                                                </button>
                                            </td>
                                    }
                                </tr>
                            ))
                        ))
                    )) : loading ? null : data.getApplicationByStatus.map((
                        { applicantID, id, applicantInterviewer, applicantProfile, createdAt, applyJobPost }: applicant
                    ) => (
                        applicantProfile.map(({ firstname, lastname }) => (
                            applyJobPost.map(({ title }) => (
                                <tr key={applicantID}>
                                    <td>{firstname} {lastname}</td>
                                    <td>{id}</td>
                                    <td>{title}</td>
                                    <td>{format(new Date(createdAt), "MMM dd, yyyy")}</td>
                                    {applicantInterviewer.length === 0 ?
                                        <td className={styles.int}>

                                            <button onClick={() => setInterview(applicantID)} className={styles.interview}>Interview</button>
                                        </td> : applicantInterviewer.map(({ user }: any) => (
                                            user.map(({ profile }: any) => (
                                                profile.map(({ profileID, firstname, lastname }: any) => (
                                                    <td key={profileID}>{firstname} {lastname}</td>
                                                ))
                                            ))
                                        ))}
                                    {
                                        status === "rejected" ? null :
                                            <td className={styles.buttons}>
                                                <button onClick={() => setID(() => applicantID)}>
                                                    <Image src="/dashboard/eye-line.svg" alt="" height={25} width={25} />
                                                </button>
                                            </td>
                                    }
                                </tr>
                            ))
                        ))
                    ))}
                </tbody>
            </table>
            <div className={styles.pages}>
                <button disabled={!pages} onClick={() => setPages(() => pages - 1)}>
                    <Image src="/dashboard/arrow-left-line.svg" alt="" height={20} width={20} />
                </button>
                <span>{pages + 1}</span>
                <button disabled={loading ? true : data.getApplicationByStatus.length < limit || data.getApplicationByStatus.length === 0} onClick={() => setPages(() => pages + 1)}>
                    <Image src="/dashboard/arrow-right-line.svg" alt="" height={20} width={20} />
                </button>
            </div>
        </div>
    )
}
