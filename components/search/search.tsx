import React from 'react'
import styles from '../../styles/components/search/search.module.scss'
import { useRouter } from 'next/router'
export default function Search({ datas }: any) {
    const router = useRouter();


    return (
        <div className={styles.container}>{
            datas?.getJobPostSearch.map(({ jobPostID, title, details }: any) => (
                <div onClick={() => router.push(`/jobs/${jobPostID}`)} className={styles.search} key={jobPostID}>
                    <h2>{title}</h2>
                    <div className={styles.jobtype} >
                    {details.map(({ jobType }: any) => (
                        jobType.map((name: any) => (
                                <span key={name}> {name}</span>
                        ))
                    ))}
                     </div>
                </div>
            ))
        }</div>
    )
}
