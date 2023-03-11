import React, { useState } from 'react'
import styles from '../../../styles/components/dashboard/endorse/data.module.scss'
import { useQuery } from '@apollo/client'
import { getEndorseByCompany } from '../../../util/endorse/endorse.query'
import { format } from 'date-fns'
import Image from 'next/image'
import View from './view'

export default function EndorseData({ userid, status, limit, orders }: any) {

    const [ pages, setPages ] = useState(0);
    const [ view, setView ] = useState(false)
    const [ id, setId ] = useState("")

    const { loading, data, error } = useQuery(getEndorseByCompany, {
        variables: {
            status: status,
            limit: limit,
            userId: userid,
            order: orders,
            offset: pages * limit
        }
    })


    return (
        <div className={styles.container}>
            {
                view ?
                    <div className={styles.view}>
                        <View id={id} userid={userid} close={setView} />
                    </div> :
                    null
            }
            <div className={styles.tableContainer}>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email Address</th>
                            <th>Phone</th>
                            <th>Endorsed Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? null : data.getEndorseByStatus.map(({ endorseID, endorsement, createdAt }: any) => (
                            endorsement.map(({ applicants }: any) => (
                                applicants.map(({ applicantProfile, email }: any) => (
                                    applicantProfile.map(({ firstname, lastname, phone }: any) => (
                                        <tr key={endorseID}>
                                            <td>{lastname}, {firstname}</td>
                                            <td>{email}</td>
                                            <td>{phone.includes('+63') ? phone.substring(3, 13) : phone}</td>
                                            <td>{format(new Date(createdAt), "MMM dd, yyyy")}</td>
                                            <td className={styles.btn}>
                                                <button onClick={() => {
                                                    setView(() => !view)
                                                    setId(endorseID)
                                                }}>
                                                    <Image src="/dashboard/eye-line.svg" alt="" height={25} width={25} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ))
                            ))
                        ))}
                    </tbody>
                </table>
                <div className={styles.pages}>
                    <button disabled={!pages} onClick={() => setPages(() => pages - 1)}>
                        <Image src="/dashboard/arrow-left-line.svg" alt="" height={20} width={20} />
                    </button>
                    <span>{pages + 1}</span>
                    <button disabled={loading ? true : data.getEndorseByStatus.length < limit || data.getJobByStatus.length === 0} onClick={() => setPages(() => pages + 1)}>
                        <Image src="/dashboard/arrow-right-line.svg" alt="" height={20} width={20} />
                    </button>
                </div>
            </div>
        </div>
    )
}
