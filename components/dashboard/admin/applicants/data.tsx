import React, { useState } from 'react'
import ApplicantCard from './card'
import styles from '../../../../styles/components/dashboard/applicants/data.module.scss'
import { useQuery } from '@apollo/client'
import { applicationQuery } from '../../../../util/applicaiton/application.query'
import { applicant, applicantProfile, applyJobPost } from '../../../../interface/applicant'
import { format } from 'date-fns'
export default function DataApplicants({ status, orders, limit }: any) {
    const [ pages, setPages ] = useState(0)
    const { loading, data } = useQuery(applicationQuery, {
        variables: {
            status: status,
            limit: limit,
            order: orders,
            offset: pages * limit
        },
        onError: error => {
            console.log(error.message)
        }
    })
    return (
        <div className={styles.container}>
            <div className={styles.gridContainer}>
                {loading ? "Loading" : data.getApplicationByStatus.map((
                    { applicantID, id, email, status, applicantProfile, applicantInterviewer, createdAt, applyJobPost, applicantUpload }: applicant
                ) => (
                    <ApplicantCard key={applicantID} status={status} date={format(new Date(createdAt), "MMMM dd, yyy")} apid={applicantID} id={id} email={email} profile={applicantProfile} interviewer={applicantInterviewer} job={applyJobPost} upload={applicantUpload} />
                ))}
            </div>
            {loading ? "Loading" : data.getApplicationByStatus.length >= limit ? <div className={styles.pages}>
                <button disabled={!pages} onClick={() => setPages(() => pages - 1)}>Prev</button>
                <button disabled={loading ? true : data.getJobByStatus.length < limit} onClick={() => setPages(() => pages + 1)}>Next</button>
            </div> : null}
        </div>
    )
}
