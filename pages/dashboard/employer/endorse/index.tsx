import React, { FC, useState, useRef, useEffect } from 'react'
import Dashboard from '../../../../layout/dashboard.layout'
import PageWithLayout from '../../../../layout/page.layout'
import styles from '../../../../styles/components/dashboard/endorse/endorse.module.scss'
import Head from 'next/head'
import Image from 'next/image'
import { endorseStatused, limits, OrderDate } from '../../../../util/values/filter'
import EndorseData from '../../../../components/dashboard/employer/data'
import jwtDecode from 'jwt-decode'

const Endorse: FC = ({ userid }: any) => {

    const limitRef = useRef<HTMLDivElement>(null)
    const OrderRef = useRef<HTMLDivElement>(null)

    const [ statused, setStatused ] = useState("waiting")
    const [ limit, setLimit ] = useState(false)
    const [ order, setOrder ] = useState(false)
    const [ orders, setOrders ] = useState("desc")
    const [ limVal, setLimitVal ] = useState(10)

    const onChangeStatusedEvent = (e: any) => {
        setStatused(e.target.value)
    }


    const handleLimitClick = (e: any) => {
        setLimitVal(parseInt(e.target.value))
        setLimit(false)
    }

    useEffect(() => { }, [])

    useEffect(() => { }, [])
    return (
        <div className={styles.container}>
            <Head>
                <title>Endorse</title>
            </Head>
            <div className={styles.header}>
                <div className={styles.title}>
                    <h2>Endorse</h2>
                </div>
                <div className={styles.options}>
                    <button>
                        <Image src="/dashboard/download.svg" alt="" height={20} width={20} />
                    </button>
                    <span>Export CSV</span>
                </div>
            </div>
            <div className={styles.tabs}>
                <div className={styles.tab}>
                    {endorseStatused.map(({ name, value }) => (
                        <button onClick={onChangeStatusedEvent} className={statused === value ? styles.active : ""} key={name} value={value}>
                            {name}
                        </button>
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
                <EndorseData userid={userid} status={statused} limit={limVal} orders={orders} />
            </div>
        </div >
    )
}


(Endorse as PageWithLayout).layout = Dashboard

export default Endorse



export const getServerSideProps = async (context: any) => {
    const cookies = context.req.headers.cookie
    const { userID }: any = jwtDecode(cookies)
    return {
        props: {
            userid: userID
        }
    }
}