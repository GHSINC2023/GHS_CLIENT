import React, { FC, useState, useEffect, useRef } from 'react'
import Dashboard from '../../../../layout/dashboard.layout'
import PageWithLayout from '../../../../layout/page.layout'
import Head from 'next/head'
import styles from '../../../../styles/components/dashboard/user/user.module.scss'
import { OrderDate, limits, MR, mod } from '../../../../util/values/filter'
import dynamic from 'next/dynamic'

const DataUser = dynamic(() => import("../../../../components/dashboard/manager/user/data"), {
    ssr: false
})
const User: FC = () => {
    const [ status, setStatus ] = useState("manager")



    const limitRef = useRef<HTMLDivElement>(null)
    const OrderRef = useRef<HTMLDivElement>(null)

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
                <title>User</title>
            </Head>
            <div className={styles.header}>
                <div className={styles.container}>
                    <h2>Users</h2>
                </div>
                <div className={styles.post}>
                    <div className={styles.tab}>
                        {mod.map(({ name, value }) => (
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
                    <DataUser roles={status} limit={limVal} orders={orders} />
                </div>
            </div>
        </div>
    )
}

(User as PageWithLayout).layout = Dashboard
export default User