import React, { FC, useEffect, useState } from 'react'
import Dashboard from '../../../../layout/dashboard.layout'
import PageWithLayout from '../../../../layout/page.layout'
import Head from 'next/head'
import jwtDecode from 'jwt-decode'
import { useQuery } from '@apollo/client'
import { userLogs } from '../../../../util/logs/log.query'
import styles from '../../../../styles/components/dashboard/logs/logs.module.scss'
import { format } from 'date-fns'
import Cookies from 'js-cookie'

const Logs: FC = () => {

    const [ userid, setUserId ] = useState("")
    useEffect(() => {
        const cookies = Cookies.get("ghs_access_token");
        if (cookies) {
            const { userID }: any = jwtDecode(cookies)

            setUserId(userID)
        }
    }, [])
    const [ pages, setPages ] = useState(0)
    const limit = 10
    const { loading, data, error } = useQuery(userLogs, {
        variables: {
            userId: userid,
            limit,
            offset: pages * limit
        }
    })
    return (
        <div className={styles.container}>
            <Head>
                <title>Logs</title>
            </Head>
            <div className={styles.header}>
                <div className={styles.container}>
                    <h2>User Logs</h2>
                </div>
            </div>

            <div className={styles.tableContainer}>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Modified by</th>
                            <th>Date Modified</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? null : data.getUserLogs.map(({ logsID, title, modifiedBy, createdAt }: any) => (
                            <tr key={logsID}>
                                <td>{title}</td>
                                <td>{modifiedBy}</td>
                                <td>{format(new Date(createdAt), "MMMM dd, yyy")}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
        </div>
    )
}


(Logs as PageWithLayout).layout = Dashboard
export default Logs
