import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { EndorsementMutation } from '../../../util/export/endorsementExport'
import styles from '../../../styles/components/exports/endorsement.export.module.scss'
import { CSVSort, endorsement_status } from '../../../util/values/filter'
import Message from '../../message/message'
import Endorsement from './View/endrosement'



export default function EndorseExport({ close }: any) {


    const dates = new Date()
    const [ status, setStatus ] = useState("")
    const [ start, setStart ] = useState("")
    const [ end, setEnd ] = useState("")
    const [ sort, setSort ] = useState("asc")
    const [ filename, setFilename ] = useState(`Endorsement - ${dates.toDateString()}`)

    const [ message, setMessage ] = useState(false)
    const [ stats, setStats ] = useState(false)
    const [ or, setOr ] = useState(false)
    const [ open, setOpened ] = useState(false)


    const [ createEndorsementCSV, { data } ] = useMutation(EndorsementMutation, {
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


    useEffect(() => {
        setTimeout(() => { setMessage(false) }, 2000)
    }, [ message ])
    return (
        <div className={styles.container}>
            {data && message ?
                <div className={styles.message}>
                    <Message label={'Successfully Generate CSV'} status={'success'} message={''} />
                </div> : null}
            <div>
                {
                    open ? <div className={styles.endor}>
                        <Endorsement data={data} close={setOpened} filename={filename} status={status} />
                    </div> : null
                }
                <div className={styles.header}>
                    <h2>Export - Endorsements</h2>
                    <button onClick={() => close(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d02222" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <form>
                    <input value={filename} onChange={e => setFilename(e.target.value)} placeholder='' />
                    <div className={styles.select}>
                        <div onClick={() => setStats(() => !stats)} className={styles.selectHead}>
                            <h2>Status: {status}</h2>
                        </div>
                        {stats ? <div className={styles.selectStatus}>
                            {endorsement_status.map((name) => (
                                <button type="button" onClick={(e) => {
                                    setStatus(e.currentTarget.value)
                                    setStats(false)
                                }} className={styles.statusBtn} value={name} key={name}>{name}</button>
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

                    {data ? <button className={styles.endorse} type="button" onClick={() => setOpened(() => !open)}>View Report</button> : <button disabled={!start || !end || !status} type='submit' className={styles.endorse} onClick={(e) => {
                        e.preventDefault()
                        createEndorsementCSV()
                    }}>
                        GENERATE REPORT
                    </button>}
                </form>
            </div >
        </div >
    )
}
