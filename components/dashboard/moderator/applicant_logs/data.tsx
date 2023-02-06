import React, { useState, useEffect } from 'react'
import ApplicantCard from './details'
import styles from '../../../../styles/components/dashboard/applicants/data.module.scss'
import { useQuery } from '@apollo/client'
import { applicationQuery } from '../../../../util/applicaiton/application.query'
import { applicant } from '../../../../interface/applicant'
import { format } from 'date-fns'
import Image from 'next/image'
import Interview from './interview'

export default function DataApplicants({ status, orders, limit }: any) {
    const [ pages, setPages ] = useState(0)
    const { loading, data } = useQuery(applicationQuery, {
        variables: {
            status: status,
            limit: limit,
            order: orders,
            offset: pages * limit
        },
        pollInterval: 1000,
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
                        {status === "rejected" ? null : <th>Action</th>}
                    </tr>
                </thead>

                <tbody>
                    {loading ? null : data.getApplicationByStatus.map((
                        { applicantID, id, applicantProfile, createdAt, applyJobPost }: applicant
                    ) => (
                        applicantProfile.map(({ firstname, lastname }: any) => (
                            applyJobPost.map(({ title }: any) => (
                                <tr key={applicantID}>
                                    <td>{firstname} {lastname}</td>
                                    <td>{id}</td>
                                    <td>{title}</td>
                                    <td>{format(new Date(createdAt), "MMM dd, yyyy")}</td>

                                </tr>
                            ))
                        ))
                    ))}
                </tbody>
            </table>
            {loading ? "Loading" : data.getApplicationByStatus.length >= limit ? <div className={styles.pages}>
                <button disabled={!pages} onClick={() => setPages(() => pages - 1)}>
                    <Image src="/icon/arrow-left-line.svg" alt="" height={20} width={20} />
                </button>
                <button disabled={loading ? true : data.getJobByStatus.length < limit} onClick={() => setPages(() => pages + 1)}>
                    <Image src="/icon/arrow-right-line.svg" alt="" height={20} width={20} />
                </button>
            </div> : null}
        </div>
    )
}
