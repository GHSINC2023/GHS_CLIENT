import React, { FC, useState, useRef, useEffect } from 'react'
import Head from 'next/head'
import PageWithLayout from '../../../../layout/page.layout'
import Dashboard from '../../../../layout/dashboard.layout'
import styles from '../../../../styles/components/dashboard/post/post.module.scss'
import Image from 'next/image'
import { JobStatus, limits, OrderDate } from '../../../../util/values/filter'
import dynamic from 'next/dynamic'
import Create from '../../../../components/dashboard/admin/post/create'
import jwtDecode from 'jwt-decode'


const DatPost = dynamic(() => import("../../../../components/dashboard/admin/post/data"), {
    ssr: false
})


const Post: FC = ({ userid }: any) => {
    const [ status, setStatus ] = useState("inProgress")
    const [ limVal, setLimitVal ] = useState(10)
    const [ orders, setOrders ] = useState("desc")
    const [ limit, setLimit ] = useState(false)
    const [ order, setOrder ] = useState(false)

    const [ create, setCreate ] = useState(false)

    const handleStatusClick = (e: any) => {
        setStatus(() => e.target.value)
    }
    const handleLimitClick = (e: any) => {
        setLimitVal(() => parseInt(e.target.value))
        setLimit(() => !limit)
    }

    const limitRef = useRef<HTMLDivElement>(null)
    const OrderRef = useRef<HTMLDivElement>(null)


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
                <title>Job Post</title>
            </Head>
            {create ?
                <div className={styles.create}>
                    <Create userid={userid} close={setCreate} />
                </div> : null}
            <div className={styles.header}>
                <div className={styles.container}>
                    <h2>Dashboard / Administrator / Job Post</h2>
                    <div className={styles.option}>
                        <button onClick={() => setCreate(() => !create)} >
                            <Image src="/dashboard/plus-line.svg" alt="" height={20} width={20} />
                        </button>
                        <span>
                            Create
                        </span>
                    </div>
                </div>
                <div className={styles.post}>
                    <div className={styles.tab}>
                        {JobStatus.map(({ name, value }) => (
                            <button onClick={handleStatusClick} className={value === status ? styles.active : ""} key={name} value={value}>{name}</button>
                        ))}
                    </div>
                    <div className={styles.tkl}>
                        <div className={styles.take}>
                            <button className={order ? styles.active : ""} onClick={() => setLimit(() => !limit)}>{limVal}</button>
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
                                            <button onClick={() => setOrders(() => value)} key={name} value={value}>{name}</button>
                                        ))}

                                    </div> : null
                            }
                        </div>
                    </div>
                </div>
                <div style={{ margin: "10px 0", padding: "0.5rem" }}>
                    <DatPost status={status} limit={limVal} order={orders} />
                </div>
            </div>
        </div>
    )
}


export const getServerSideProps = async (context: any) => {
    const cookies = context.req.cookies[ "ghs_access_token" ]
    const { userID }: any = jwtDecode(cookies)
    return {
        props: {
            userid: userID
        }
    }
}

(Post as PageWithLayout).layout = Dashboard

export default Post