import React, { FC, useState } from 'react'
import PageWithLayout from '../../../../layout/page.layout'
import Dashboard from '../../../../layout/dashboard.layout'
import Head from 'next/head'
import styles from '../../../../styles/components/dashboard/archive/archive.module.scss'
import { ArchiveTab } from '../../../../util/values/filter'
import { useQuery } from '@apollo/client'
import { archiveByType } from '../../../../util/archive/archive.query'



const Archive: FC = () => {

    const [ status, setStatus ] = useState("post")

    const onChangeStatus = (e: any) => {
        setStatus(e.target.value)
    }


    const { loading, data } = useQuery(archiveByType, {
        variables: {
            type: status
        }
    })

    if (loading) return null
    return (
        <div className={styles.container}>
            <Head>
                <title>Archive</title>
            </Head>
            <div className={styles.header}>
                <h2>Dashboard / Administrator / Archive</h2>
            </div>
            <div className={styles.archive}>
                <div className={styles.tab}>
                    {ArchiveTab.map(({ name, value }) => (
                        <button onClick={onChangeStatus} className={value === status ? styles.active : ""} key={name} value={value}>{name}</button>
                    ))}
                </div>
            </div>
            <div className={styles.data}>
                {status === "post" ?
                    <table>
                        <thead>
                            <tr>
                                <th>Job Title</th>
                                <th>Posted By</th>
                                <th>Date Created</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.getArchivebyType.map(({ archiveID, job }: any) => (
                                job.map(({ jobPostID, title, createdAt, user }: any) => (
                                    <tr key={jobPostID}>
                                        <td>{title}</td>
                                        {user.map(({ profile }: any) => (
                                            profile.map(({ profileID, firstname, lastname }: any) => (
                                                <td key={profileID}>{firstname} {lastname}</td>
                                            ))
                                        ))}
                                        <td>{createdAt}</td>
                                    </tr>
                                ))
                            ))}
                        </tbody>
                    </table> :
                    null}
                {
                    status === "endorsed" ? <table>
                        <thead>
                            <th>Company Name</th>
                            <th>Application No.</th>
                            <th>Name</th>
                            <th>Job Apply</th>
                        </thead>
                        <tbody>
                            {data.getArchivebyType.map(({ archiveID, endorse }: any) => (
                                endorse.map(({ endorsement }: any) => (
                                    endorsement.map(({ applicants }: any) => (
                                        applicants.map(({ id, applicantProfile }: any) => (
                                            <tr key={archiveID}>
                                                <td>{id}</td>
                                                {
                                                    applicantProfile.map(({ profileID, firstname, lastname }: any) => (
                                                        <td key={profileID}>{firstname} {lastname}</td>
                                                    ))
                                                }
                                            </tr>
                                        ))
                                    ))
                                ))
                            ))}
                        </tbody>
                    </table> : null
                }
                {
                    status === "applicant" ?
                        <table>
                            <thead>
                                <th>Application No.</th>
                                <th>Name</th>
                                <th>Job Apply</th>
                                <th>Date Applied</th>
                            </thead>
                            <tbody>
                                {data.getArchivebyType.map(({ archiveID, applicants, createdAt }: any) => (
                                    applicants.map(({ applicantID, id, applicantProfile }: any) => (
                                        <tr key={applicantID}>
                                            <td>{id}</td>
                                            {
                                                applicantProfile.map(({ profileID, firstname, lastname }: any) => (
                                                    <td key={profileID}>{firstname} {lastname}</td>
                                                ))
                                            }
                                            <td>{createdAt}</td>
                                        </tr>
                                    ))
                                ))}
                            </tbody>
                        </table> : null
                }
            </div>
        </div >
    )
}



(Archive as PageWithLayout).layout = Dashboard

export default Archive