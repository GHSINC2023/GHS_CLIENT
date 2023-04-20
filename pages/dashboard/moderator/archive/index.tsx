import React, { FC, useEffect, useState } from 'react'
import PageWithLayout from '../../../../layout/page.layout'
import Dashboard from '../../../../layout/dashboard.layout'
import Head from 'next/head'
import styles from '../../../../styles/components/dashboard/archive/archive.module.scss'
import { ArchiveTab } from '../../../../util/values/filter'
import { useQuery, useLazyQuery } from '@apollo/client'
import { filterArchive } from '../../../../util/archive/archive.query'
import { format, subDays } from 'date-fns'
import ArchiveView from '../../../../components/dashboard/admin/archive/ArchiveView'
import ArchiveDelete from '../../../../components/dashboard/admin/archive/ArchiveDelete'

const Archive: FC = () => {

    const [ status, setStatus ] = useState("post")

    const [ id, setId ] = useState("")
    const [ delID, setDelID ] = useState("")
    const [ start, setStartDate ] = useState(format(new Date(subDays(Date.now(), 7),), "yyyy-MM-dd"))
    const [ end, setEndDate ] = useState(format(new Date(Date.now()), "yyyy-MM-dd"))

    const onChangeStatus = (e: any) => {
        setStatus(e.target.value)
    }



    const [ filterArch, { data: ArchData } ] = useLazyQuery(filterArchive)


    useEffect(() => {
        filterArch({
            variables: {
                type: status,
                start: start,
                end: end
            }
        })
    }, [ end, filterArch, start, status ])


    return (
        <div className={styles.container}>
            <Head>
                <title>Archive</title>
            </Head>
            {
                id ? <div className={styles.adc}>
                    <ArchiveView id={id} close={setId} />
                </div> : null
            }
            {
                delID ?
                    <div className={styles.adc}>
                        <ArchiveDelete id={delID} close={setDelID} />
                    </div> :
                    null
            }
            <div className={styles.header}>
                <div className={styles.container}>
                    <h2>Dashboard / Administrator / Archive</h2>
                    <div className={styles.sss}>
                        <div>
                            <label>Start</label>
                            <input type="date" value={start} onChange={e => setStartDate(e.target.value)} />
                        </div>
                        <div>
                            <label>End</label>
                            <input type="date" value={end} onChange={e => setEndDate(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className={styles.applicant}>
                    <div className={styles.tab}>
                        {ArchiveTab.map(({ name, value }) => (
                            <button onClick={onChangeStatus} className={value === status ? styles.active : ""} key={name} value={value}>{name}</button>
                        ))}
                    </div>
                </div>
            </div>
            {
                <div className={styles.data}>
                    {status === "post" ?
                        <table>
                            <thead>
                                <tr>
                                    <th>Job Title</th>
                                    <th>Posted By</th>
                                    <th>Date Created</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    ArchData?.getArchiveByDate.map(({ archiveID, job, createdAt }: any) => (
                                        job.map(({ jobPostID, title, users }: any) => (
                                            <tr key={archiveID}>
                                                <td>{title}</td>
                                                {users.map(({ profile }: any) => (
                                                    profile.map(({ profileID, firstname, lastname }: any) => (
                                                        <td key={profileID}>{firstname} {lastname}</td>
                                                    ))
                                                ))}
                                                <td>{format(new Date(createdAt), "MMMM dd, yyyy")}</td>
                                                <td className={styles.btn}>
                                                    <button onClick={(e) => {
                                                        setId(e.currentTarget.value)
                                                    }} value={archiveID}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                                            <path stroke="#D02222" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5c-6.307 0-9.367 5.683-9.91 6.808a.435.435 0 0 0 0 .384C2.632 13.317 5.692 19 12 19s9.367-5.683 9.91-6.808a.435.435 0 0 0 0-.384C21.368 10.683 18.308 5 12 5z" />
                                                            <circle cx="12" cy="12" r="3" stroke="#D02222" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                                        </svg>
                                                    </button>
                                                    <button onClick={(e) => {
                                                        setDelID(e.currentTarget.value)
                                                    }} value={archiveID}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                                            <path stroke="#D02222" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7v0a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v0M9 7h6M9 7H6m9 0h3m2 0h-2M4 7h2m0 0v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7" />
                                                        </svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ))
                                }
                            </tbody>
                        </table> :
                        null}
                    {
                        status === "endorsed" ? <table>
                            <thead>
                                <tr>
                                    <th>Company Name</th>
                                    <th>Application No.</th>
                                    <th>Name</th>
                                    <th>Job Apply</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ArchData?.getArchiveByDate.map(({ archiveID, endorse }: any) => (
                                    endorse.map(({ company, endorsement }: any) => (
                                        endorsement.map(({ applicants }: any) => (
                                            applicants.map(({ id, applyJobPost, applicantProfile }: any) => (
                                                <tr key={archiveID}>
                                                    {company.map(({ companyName }: any) => (
                                                        <td key={companyName}>{companyName}</td>
                                                    ))}
                                                    <td>{id}</td>
                                                    {
                                                        applicantProfile.map(({ profileID, firstname, lastname }: any) => (
                                                            <td key={profileID}>{firstname} {lastname}</td>
                                                        ))
                                                    }
                                                    {
                                                        applyJobPost.map(({ title }: any) => (
                                                            <td key={title}>{title}</td>
                                                        ))
                                                    }

                                                    <td className={styles.btn}>
                                                        <button onClick={(e) => {
                                                            setId(e.currentTarget.value)
                                                        }} value={archiveID}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                                                <path stroke="#D02222" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5c-6.307 0-9.367 5.683-9.91 6.808a.435.435 0 0 0 0 .384C2.632 13.317 5.692 19 12 19s9.367-5.683 9.91-6.808a.435.435 0 0 0 0-.384C21.368 10.683 18.308 5 12 5z" />
                                                                <circle cx="12" cy="12" r="3" stroke="#D02222" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                                            </svg>
                                                        </button>
                                                        <button onClick={(e) => {
                                                            setDelID(e.currentTarget.value)
                                                        }} value={archiveID}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                                                <path stroke="#D02222" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7v0a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v0M9 7h6M9 7H6m9 0h3m2 0h-2M4 7h2m0 0v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7" />
                                                            </svg>
                                                        </button>
                                                    </td>
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
                                    <tr>
                                        <th>Application No.</th>
                                        <th>Name</th>
                                        <th>Job Apply</th>
                                        <th>Date Applied</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ArchData?.getArchiveByDate.map(({ archiveID, applicants, createdAt }: any) => (
                                        applicants.map(({ applicantID, id, applyJobPost, applicantProfile }: any) => (
                                            <tr key={archiveID}>
                                                <td>{id}</td>

                                                {
                                                    applicantProfile.map(({ profileID, firstname, lastname }: any) => (
                                                        <td key={profileID}>{firstname} {lastname}</td>
                                                    ))
                                                }
                                                {
                                                    applyJobPost.map(({ title }: any) => (
                                                        <td key={title}>{title}</td>
                                                    ))
                                                }
                                                <td>{format(new Date(createdAt), "MMMM dd, yyyy")}</td>
                                                <td className={styles.btn}>
                                                    <button onClick={(e) => {
                                                        setId(e.currentTarget.value)
                                                    }} value={archiveID}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                                            <path stroke="#D02222" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5c-6.307 0-9.367 5.683-9.91 6.808a.435.435 0 0 0 0 .384C2.632 13.317 5.692 19 12 19s9.367-5.683 9.91-6.808a.435.435 0 0 0 0-.384C21.368 10.683 18.308 5 12 5z" />
                                                            <circle cx="12" cy="12" r="3" stroke="#D02222" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                                        </svg>
                                                    </button>
                                                    <button onClick={(e) => {
                                                        setDelID(e.currentTarget.value)
                                                    }} value={archiveID}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                                            <path stroke="#D02222" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7v0a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v0M9 7h6M9 7H6m9 0h3m2 0h-2M4 7h2m0 0v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7" />
                                                        </svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ))}
                                </tbody>
                            </table> : null
                    }
                </div>
            }
        </div >
    )
}



(Archive as PageWithLayout).layout = Dashboard

export default Archive