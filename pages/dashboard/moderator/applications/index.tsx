import React, { FC, useEffect, useRef, useState } from 'react'
import PageWithLayout from '../../../../layout/page.layout'
import Dashboard from '../../../../layout/dashboard.layout'
import Head from 'next/head'
import styles from '../../../../styles/components/dashboard/applicantLogs/applicantlogs.module.scss'
import { OrderDate, applicantsStatus, limits } from '../../../../util/values/filter'
import Image from 'next/image'
import ApplicantExport from '../../../../components/dashboard/export/applicant.export'
import dynamic from 'next/dynamic'
const ApplicantData = dynamic(() => import("../../../../components/dashboard/moderator/applicant_logs/data"), {
    ssr: false
})
const ApplicantLogs: FC = () => {

    const limitRef = useRef<HTMLDivElement>(null)
    const OrderRef = useRef<HTMLDivElement>(null)
    const [ status, setStatus ] = useState("waiting")
    const [ exports, setExport ] = useState(false)
    const [ limit, setLimit ] = useState(false)
    const [ limVal, setLimitVal ] = useState(10)
    const [ orders, setOrders ] = useState("desc")

    const [ order, setOrder ] = useState(false)
    const handleStatusClick = (e: any) => {
        setStatus(() => e.target.value)
    }
    const handleLimitClick = (e: any) => {
        setLimitVal(() => parseInt(e.target.value))
        setLimit(() => !limit)
    }

    useEffect(() => {
        const handleClick = (e: any) => {
            if (limitRef.current && !limitRef.current.contains(e.target)) {
                let clicks = 0;
                clicks++;
                if (clicks === 1) {
                    setTimeout(() => {
                        setLimit(false)
                    }, 100)
                }
            }
        }

        document.addEventListener("mousedown", handleClick)

        return () => {
            document.removeEventListener("mousedown", handleClick)
        }
    }, [ limit ])

    useEffect(() => {
        const handleClick = (e: any) => {
            if (OrderRef.current && !OrderRef.current.contains(e.target)) {
                let clicks = 0;
                clicks++
                if (clicks === 1) {
                    setTimeout(() => {
                        setOrder(false)
                    }, 100)
                }
            }
        }

        document.addEventListener("mousedown", handleClick)
        return () => {
            document.removeEventListener("mousedown", handleClick)
        }
    }, [ order ])

    return (
        <div className={styles.container}>
            <Head>
                <title>Applicant Logs</title>
            </Head>
            {
                exports ? <div className={styles.export}>
                    <ApplicantExport close={setExport} />
                </div> : null
            }
            <div className={styles.header}>
                <div className={styles.header}>
                    <div className={styles.container}>
                        <h2>Dashboard / Moderator / Applicants</h2>
                        <div className={styles.option}>
                            <button onClick={() => setExport(() => !exports)} className={styles.csv}>
                                <Image src="/dashboard/download.svg" alt="" height={20} width={20} />
                            </button>
                            <span>Export Applicant</span>
                        </div>
                    </div>
                </div>
                <div className={styles.applicant}>
                    <div className={styles.tab}>
                        {applicantsStatus.map(({ name, value }) => (
                            <button onClick={handleStatusClick} className={value === status ? styles.active : ""} key={name} value={value}>{name}</button>
                        ))}
                    </div>
                    <div className={styles.tkl}>
                        <div className={styles.take}>
                            <button onClick={() => setLimit(() => !limit)}>{limVal}</button>
                            {
                                limit ?
                                    <div ref={limitRef} className={styles.valuesContainer}>
                                        {limits.map((name) => (
                                            <button onClick={handleLimitClick} key={name} value={name}>{name}</button>
                                        ))}

                                    </div> : null
                            }
                        </div>
                        <div className={styles.order}>
                            <button onClick={() => setOrder(() => !order)}>
                                {orders === "desc" ? "Newest" : "Oldest"}</button>
                            {
                                order ?
                                    <div ref={OrderRef} className={styles.valuesContainer}>
                                        {OrderDate.map(({ name, value }) => (
                                            <button className={order ? styles.active : ""} onClick={() => {
                                                setOrders(() => value)
                                                setOrder(() => false)
                                            }} key={name} value={value}>{name}</button>
                                        ))}

                                    </div> : null
                            }
                        </div>
                    </div>
                </div>
                <div style={{ margin: "10px 0", padding: "0.5rem" }}>
                    <ApplicantData status={status} orders={orders} limit={limVal} />
                </div>
            </div>

        </div>
    )
}


(ApplicantLogs as PageWithLayout).layout = Dashboard

export default ApplicantLogs