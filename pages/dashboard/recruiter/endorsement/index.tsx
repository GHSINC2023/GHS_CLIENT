import React, { FC, useRef, useState, useEffect } from 'react'
import Dashboard from '../../../../layout/dashboard.layout'
import PageWithLayout from '../../../../layout/page.layout'
import Head from 'next/head'
import styles from '../../../../styles/components/dashboard/endorsement/endorsement.module.scss'
import Image from 'next/image'
import { endorsement_statusv2, OrderDate, limits } from '../../../../util/values/filter'
import Data from '../../../../components/dashboard/recruiter/endrosement/data'
import jwtDecode from 'jwt-decode'
import EndorseExport from '../../../../components/dashboard/export/endorsement.export'


const Endorsement: FC = ({ userid }: any) => {

    const limitRef = useRef<HTMLDivElement>(null)
    const OrderRef = useRef<HTMLDivElement>(null)
    const filterRef = useRef<HTMLDivElement>(null)


    const [ create, setCreate ] = useState(false)
    const [ limit, setLimit ] = useState(false)
    const [ order, setOrder ] = useState(false)
    const [ exports, setExport ] = useState(false)
    const [ status, setStatus ] = useState("Pending")
    const [ filter, setFilter ] = useState(false)
    const [ limVal, setLimitVal ] = useState(10)
    const [ orders, setOrders ] = useState("desc")

    const handleStatusClick = (e: any) => {
        setStatus(() => e.target.value)
        setFilter(() => false)
    }

    const handleLimitClick = (e: any) => {
        setLimitVal(() => parseInt(e.target.value))
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
            if (filterRef.current && !filterRef.current.contains(e.target)) {
                let clicks = 0;
                clicks++
                if (clicks === 1) {
                    setTimeout(() => {
                        setFilter(false)
                    }, 100)
                }
            }
        }

        document.addEventListener("mousedown", handleClick)
        return () => {
            document.addEventListener("mousedown", handleClick)
        }
    }, [ filter ])


    useEffect(() => {
        const handleClick = (e: any) => {
            if (OrderRef.current && !OrderRef.current.contains(e.target)) {
                let clicks = 0;
                clicks++;
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
                <title>Endorsement</title>
            </Head>
            {
                exports ? <div className={styles.endorsementExport}>
                    <EndorseExport close={setExport} />
                </div> : null
            }
            <div className={styles.header}>
                <div className={styles.container}>
                    <h2>Endorsement</h2>
                    <div className={styles.option}>
                        <div className={styles.cvsDiv}>
                            <button className={styles.csv}
                                onClick={() => setExport(() => !exports)}
                            >
                                <Image src="/dashboard/download.svg" alt="" height={20} width={20} /></button>
                            <span>Export CSV</span>
                        </div>

                    </div>
                </div>
                <div className={styles.endorsement}>
                    <div className={styles.filter}>
                        <button className={filter ? styles.active : styles.fillBtn} onClick={() => setFilter(() => !filter)}>{status}</button>
                        {filter ? <div ref={filterRef} className={styles.fill}>
                            <div className={styles.fillCon}>
                                {endorsement_statusv2.map((name) => (
                                    <button onClick={handleStatusClick} key={name} value={name}>{name}</button>
                                ))}
                            </div>
                        </div> : null}
                    </div>
                    <div className={styles.tkl}>
                        <div className={styles.take}>
                            <button className={limit ? styles.active : ""} onClick={() => setLimit(() => !limit)}>{limVal}</button>
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
                            <button className={order ? styles.active : ""} onClick={() => setOrder(() => !order)}>
                                {orders === "desc" ? "Newest" : "Oldest"}</button>
                            {
                                order ?
                                    <div ref={OrderRef} className={styles.valuesContainer}>
                                        {OrderDate.map(({ name, value }) => (
                                            <button onClick={() => {
                                                setOrders(() => value)
                                                setOrder(() => false)
                                            }} key={name} value={value}>{name}</button>
                                        ))}

                                    </div> : null
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ margin: "10px 0", padding: "0.5rem" }}>
                <Data status={status} limit={limVal} order={orders} />
            </div>
        </div >
    )
}


(Endorsement as PageWithLayout).layout = Dashboard

export default Endorsement


export const getServerSideProps = async (context: any) => {
    const cookies = context.req.cookies[ "ghs_access_token" ]
    const { userID }: any = jwtDecode(cookies)
    return {
        props: {
            userid: userID
        }
    }
}