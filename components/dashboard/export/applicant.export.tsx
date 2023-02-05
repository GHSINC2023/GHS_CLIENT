import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CSVSort, CSVStatused } from '../../../util/values/filter'
import styles from '../../../styles/components/exports/application.export.module.scss'
import { applicationCSV } from '../../../util/export/applicantExport'
import { CSVLink } from 'react-csv'
export default function ApplicantExport({ close }: any) {

    const dates = new Date()
    const [ status, setStatus ] = useState("")
    const [ start, setStart ] = useState("")
    const [ end, setEnd ] = useState("")
    const [ sort, setSort ] = useState("asc")
    const [ filename, setFilename ] = useState(`Applicants - ${dates.toDateString()}`)


    const [ stats, setStats ] = useState(false)
    const [ or, setOr ] = useState(false)


    const [ createApplicaitonCSV, { data } ] = useMutation(applicationCSV, {
        variables: {
            status: status,
            start: start,
            end: end,
            order: sort
        }
    })


    const headers = [
        { label: "ApplicationID", key: "ApplicationID" },
        { label: "Email", key: "Email" },
        { label: "Job Apply", key: "JobApply" },
        { label: "Firstname", key: "Firstname" },
        { label: "Lastname", key: "Lastname" },
        { label: "Phone", key: "Phone" },
        { label: "Address", key: "Address" },
        { label: "Resume", key: "Resume" },
        { label: "Intro", key: "intro" },
        { label: "Date Applied", key: "applied" }

    ]
    const datas = data ? data.generateApplicantCSV.map(({ id, createdAt, email, applyJobPost, applicantProfile, applicantUpload }: any) => {
        return {
            ApplicationID: id,
            Email: email,
            JobApply: applyJobPost[ 0 ].title,
            Firstname: applicantProfile[ 0 ].firstname,
            Lastname: applicantProfile[ 0 ].lastname,
            Phone: `=""${applicantProfile[ 0 ].phone}""`,
            Address: `${applicantProfile[ 0 ].profileAddress[ 0 ].street}, ${applicantProfile[ 0 ].profileAddress[ 0 ].city},${applicantProfile[ 0 ].profileAddress[ 0 ].province}, ${applicantProfile[ 0 ].profileAddress[ 0 ].zipcode}`,
            Resume: applicantUpload[ 0 ].file,
            intro: applicantUpload[ 0 ].video,
            applied: createdAt
        }

    }) : null

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Export - Applicants</h2>
                <button onClick={() => close(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d02222" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
            <form>
                <input type="text" value={filename} onChange={e => setFilename(e.target.value)} />
                <div className={styles.selectStatus}>
                    <div onClick={() => setStats(() => !stats)} className={styles.statusHead}>
                        <h2>Status:
                            {status === "approved" ? "Approved" : null}
                            {status === "rejected" ? "Rejected" : null}
                            {status === "waiting" ? "" : null}</h2>
                    </div>
                    {stats ? <div className={styles.statusSelected}>
                        {CSVStatused.map(({ name, value }) => (
                            <button onClick={(e) => {
                                setStatus(e.currentTarget.value)
                                setStats(false)
                            }} key={name} value={value}>{name}</button>
                        ))}
                    </div> : null}
                </div>
                <div className={styles.limSort}>
                    <div className={styles.selectSort}>
                        <div onClick={() => setOr(() => !or)} className={styles.sortHead}>
                            <h2>Sort: {sort === "asc" ? "Ascending" : "Descending"}</h2>
                        </div>
                        {or ? <div className={styles.selectsort}>
                            {CSVSort.map(({ name, value }) => (
                                <button type="button" onClick={(e) => {
                                    setSort(e.currentTarget.value)
                                    setOr(false)
                                }} key={name} value={value}>{name}</button>
                            ))}
                        </div> : null}
                    </div>
                </div>
                <div className={styles.dates}>
                    <input type="date" value={start} onChange={e => setStart(e.target.value)} placeholder='Start - YYYY-MM-DD' />
                    <input value={end} onChange={e => setEnd(e.target.value)} type="date" placeholder='End - YYYY-MM-DD' />
                </div>
                {data ?
                    <CSVLink data={datas}
                        headers={headers}
                        style={{ width: "100%", textAlign: "center", border: "1px solid #D02222", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "5px" }}
                        filename={filename}>Download</CSVLink> :
                    <button disabled={!start || !end || !status} type="submit"
                        onClick={(e) => {
                            e.preventDefault()
                            createApplicaitonCSV()
                        }}
                        className={styles.endorse}>GENERATE REPORT</button>}

            </form>
        </div>
    )
}
