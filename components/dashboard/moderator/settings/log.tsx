import React, { useState } from 'react'
import styles from '../../../../styles/components/dashboard/settings/activityLog.module.scss'
import { useQuery } from '@apollo/client'
import { getUserLog } from '../../../../util/account/profile.query'
import { format } from 'date-fns'
import Image from 'next/image'
export default function Log({ userid }: any) {

    const [ pages, setPages ] = useState(0)
    const { loading, data, error } = useQuery(getUserLog, {
        variables: {
            limit: 10, offset: pages * 10, userId: userid
        }
    })

    return (
        <div className={styles.container}>
            <h2>Activity Log</h2>
            <div className={styles.cdvi}>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Modified By</th>
                            <th>Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? null : data.getUserLogs.map(({ logsID, modifiedBy, title, createdAt }: any) => (
                            <tr key={logsID}>
                                <td>{title}</td>
                                <td>{modifiedBy}</td>
                                <td>{format(new Date(createdAt), "MMMM dd, yyyy h:mm:ss a")}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={styles.pages}>
                <button disabled={!pages} onClick={() => setPages(pages - 1)}>
                    <Image src="/dashboard/arrow-left-line.svg" alt="" height={20} width={20} />
                </button>
                <span>{pages + 1}</span>
                <button disabled={loading ? false : data.getUserLogs.length < 10 || data.getUserLogs.length === 0} onClick={() => setPages(pages + 1)}>
                    <Image src="/dashboard/arrow-right-line.svg" alt="" height={20} width={20} />
                </button>
            </div>
        </div>
    )
}
