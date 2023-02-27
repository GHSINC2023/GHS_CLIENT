import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { CSVSort, CSVStatused } from '../../../util/values/filter'
import styles from '../../../styles/components/exports/application.export.module.scss'
import { endorseCSV } from '../../../util/endorse/endorse.mutation'
import { CSVLink } from 'react-csv'
import Message from '../../message/message'
export default function EndorseExports({ close, userid }: any) {

    const dates = new Date()
    const [ status, setStatus ] = useState("")
    const [ start, setStart ] = useState("")
    const [ end, setEnd ] = useState("")
    const [ sort, setSort ] = useState("asc")
    const [ filename, setFilename ] = useState(`Enodrse - ${dates.toDateString()}`)

    const [ message, setMessage ] = useState(false)
    const [ stats, setStats ] = useState(false)
    const [ or, setOr ] = useState(false)


    const [ createApplicaitonCSV, { data } ] = useMutation(endorseCSV, {
        variables: {
            status: status,
            start: start,
            end: end,
            orders: sort,
            userID: userid
        },
        onCompleted: () => {
            setMessage(true)
        }
    })


    const headers = [
        { label: "Email", key: "Email" },
        { label: "Job Application", key: "JobApply" },
        { label: "Firstname", key: "Firstname" },
        { label: "Lastname", key: "Lastname" },
        { label: "Phone", key: "Phone" },
        { label: "Date Endorse", key: "endorse" }
    ]

    console.log(data ? data.getEndorseByCSV : null)
    const datas = data ? data.getEndorseByCSV.map(({ endorse }: any) => {
        return {
            Email: endorse[ 0 ].endorsement[ 0 ].applicants[ 0 ].email,
            JobApply: endorse[ 0 ].endorsement[ 0 ].applicants[ 0 ].applyJobPost[ 0 ].title,
            Firstname: endorse[ 0 ].endorsement[ 0 ].applicants[ 0 ].applicantProfile[ 0 ].firstname,
            Lastname: endorse[ 0 ].endorsement[ 0 ].applicants[ 0 ].applicantProfile[ 0 ].lastname,
            Phone: endorse[ 0 ].endorsement[ 0 ].applicants[ 0 ].applicantProfile[ 0 ].phone,
            endorse: endorse[ 0 ].createdAt,
        }


    }) : null

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
                            {status === "waiting" ? "Waiting" : null}</h2>
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
                        className={styles.csvgen}
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
