import React from 'react'
import styles from '../../styles/components/card/jobcard.module.scss'
import { details } from '../../interface/jobs.interface.query'
import { useRouter } from 'next/router'
export default function JobCard({ id, title, details, description }: any) {
    const router = useRouter()


    return (
        <div className={styles.container}>
            <h2>{title}</h2>
            <p>{description.substring(0, 100)}</p>
            {details.map(({ jobDetailsID, jobType, }: details) => (
                <div key={jobDetailsID} className={styles.details}>
                    {jobType.slice(0, 3).map((name) => (
                        <div key={name} className={styles.jobType}>{name}</div>
                    ))}
                </div>
            ))}
            <button onClick={() => router.push(`/jobs/${id}`)}>View Details</button>
        </div>
    )
}
