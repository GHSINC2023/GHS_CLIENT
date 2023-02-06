import React, { useState, useEffect } from 'react'
import styles from '../../../../styles/components/dashboard/user/data.module.scss'
import { gql, useQuery } from '@apollo/client'
import { format } from 'date-fns'
import Image from 'next/image'

import User from './user'
import { getUserRoles } from '../../../../util/user/user.query'
interface Filters {
    limit: number
    orders: string
    roles: string
}



export default function UserData({ limit, orders, roles }: Filters) {

    const [ pages, setPages ] = useState(0)
    const [ profile, setProfile ] = useState("")


    const { loading, data, } = useQuery(getUserRoles, {
        variables: {
            limit: limit, offset: 0, role: roles, order: orders
        },
    })


    if (loading) null
    return (
        <div className={styles.container}>
            {
                profile ? <div className={styles.user}>
                    <User close={setProfile} open={profile} id={profile} />
                </div> : null
            }

            <div className={styles.tableContainer}>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Birthday</th>
                            {roles === "employer" ? <th>Company</th> : null}
                            <th>Date Created</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? null : data.getUserByRoles.map(({ userID, email, createdAt, profile, updatedAt, company }: any) => (
                            profile.map(({ firstname, lastname, birthday }: any) => (
                                <tr key={userID}>
                                    <td>{lastname}, {firstname}</td>
                                    <td>{format(new Date(birthday), "MMM dd, yyy")}</td>
                                    {roles === "employer" ? company.map(({ companyName }: any) => (
                                        <td key={companyName}>{companyName}</td>
                                    )) : null}
                                    <td>{format(new Date(createdAt), "MMM dd, yyy")}</td>
                                    <td>
                                        <button onClick={() => setProfile(() => userID)}>
                                            <Image src="/dashboard/eye-line.svg" alt="" height={20} width={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ))}
                    </tbody>
                </table>
                {loading ? null : data.getUserByRoles.length > limit ? <div className={styles.pages}>
                    <button disabled={!pages} onClick={() => setPages(() => pages - 1)}>
                        <Image src="/dashboard/arro-left-line.svg" alt="" height={20} width={20} />
                    </button>
                    <span>{pages + 1}</span>
                    <button disabled={loading ? true : data.getUserByRoles.length < limit} onClick={() => setPages(() => pages + 1)}>
                        <Image src="/dashboard/arro-left-line.svg" alt="" height={20} width={20} />
                    </button>
                </div> : null}
            </div>
        </div>
    )
}
