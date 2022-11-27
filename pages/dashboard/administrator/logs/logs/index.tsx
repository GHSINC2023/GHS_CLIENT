import React, { FC, useState } from 'react'
import Dashboard from '../../../../../layout/dashboard.layout'
import PageWithLayout from '../../../../../layout/page.layout'
import Head from 'next/head'
import jwtDecode from 'jwt-decode'
import { useQuery } from '@apollo/client'
import { userLogs } from '../../../../../util/logs/log.query'
import styles from '../../../../styles/components/dashboard/logs/logs.module.scss'
import { format } from 'date-fns'

const Logs: FC = ({ userid }: any) => {
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
            <div className={styles.tableContainer}>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Modified by</th>
                            <th>Date Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? "Loading" : data.getUserLogs.map(({ logsID, title, modifiedBy, createdAt }: any) => (
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



export const getServerSideProps = async (context: any) => {
    let users
    const cookies = context.req.headers.cookie
    if (cookies) {
        const { userID }: any = jwtDecode(cookies)
        users = userID
    }
    return {
        props: {
            userid: users
        }
    }
}