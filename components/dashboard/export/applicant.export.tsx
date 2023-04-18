import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { CSVSort, CSVStatused } from '../../../util/values/filter'
import styles from '../../../styles/components/exports/application.export.module.scss'
import { applicationCSV } from '../../../util/export/applicantExport'
import { CSVLink } from 'react-csv'
import Message from '../../message/message'
import ApplicantView from './View/applicantview'
export default function ApplicantExport({ close }: any) {

    const dates = new Date()
    const [ status, setStatus ] = useState("")
    const [ start, setStart ] = useState("")
    const [ end, setEnd ] = useState("")
    const [ sort, setSort ] = useState("asc")
    const [ filename, setFilename ] = useState(`Applicants - ${dates.toDateString()}`)
    const [ message, setMessage ] = useState(false)

    const [ stats, setStats ] = useState(false)
    const [ or, setOr ] = useState(false)


    const [ createApplicaitonCSV, { data } ] = useMutation(applicationCSV, {
        variables: {
            status: status,
            start: start,
            end: end,
            order: sort
        },
        onCompleted: () => {
            setMessage(true)
        }
    })


    const [ open, setOpened ] = useState(false)



    useEffect(() => {
        setTimeout(() => {
            setMessage(false)
        }, 1500)
    }, [ message ])

    return (
        <div className={styles.container}>
            {data && message ?
                <div className={styles.message}>
                    <Message label={'Successfully Generate CSV'} status={'success'} message={''} />
                </div> : null}
            {
                open ? <div className={styles.endor}>
                    <ApplicantView data={data} close={setOpened} filename={filename} status={status} />
                </div> : null
            }
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
                        </h2>
                        <span>
                            {status === "approved" ? "Approved" : null}
                            {status === "declined" ? "Declined" : null}
                            {status === "waiting" ? "Waiting" : null}
                        </span>
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
                            <h2>Sort: </h2>
                            <span>
                                {sort === "asc" ? "Ascending" : "Descending"}
                            </span>
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


                {data ? <button className={styles.endorse} type="button" onClick={() => setOpened(() => !open)}>View Report</button> : <button disabled={!start || !end || !status} type='submit' className={styles.endorse} onClick={(e) => {
                    e.preventDefault()
                    createApplicaitonCSV()
                }}>
                    GENERATE REPORT
                </button>}

            </form>
        </div>
    )
}
