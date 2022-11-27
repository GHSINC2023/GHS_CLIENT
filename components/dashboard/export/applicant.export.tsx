import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CSVSort, statused } from '../../../util/values/filter'
import styles from '../../../styles/components/exports/application.export.module.scss'
export default function ApplicantExport({ close }: any) {

    const dates = new Date()
    const [ status, setStatus ] = useState("")
    const [ start, setStart ] = useState("")
    const [ end, setEnd ] = useState("")
    const [ sort, setSort ] = useState("asc")
    const [ filename, setFilename ] = useState(`Applicants - ${dates.toDateString()}`)


    const [ stats, setStats ] = useState(false)
    const [ or, setOr ] = useState(false)



    

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
                        <h2>Status: {status === "approved" ? "Approved" : "Rejected"}</h2>
                    </div>
                    {stats ? <div className={styles.statusSelected}>
                        {statused.map(({ name, value }) => (
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
                    <input type="text" value={start} onChange={e => setStart(e.target.value)} placeholder='Start - YYYY-MM-DD' />
                    <input value={end} onChange={e => setEnd(e.target.value)} type="text" placeholder='End - YYYY-MM-DD' />
                </div>
                <button className={styles.endorse}>GENERATE REPORT</button>
            </form>
        </div>
    )
}
