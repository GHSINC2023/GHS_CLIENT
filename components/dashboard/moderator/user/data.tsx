import React, { useState, useEffect } from 'react'
import styles from '../../../../styles/components/dashboard/user/data.module.scss'
import { gql, useQuery } from '@apollo/client'
import { format } from 'date-fns'
import Image from 'next/image'
import Message from '../../../message/message'
import User from './user'
interface Filters {
    limit: number
    orders: string
    roles: string
}


const users = gql`query GetUserByRoles($limit: Int!, $offset: Int!, $role: String,  $order: orderedBy) {
    getUserByRoles(limit: $limit, offset: $offset, role: $role, , order: $order) {
      userID
      email
      role
      createdAt
      updatedAt
        profile {
            firstname
            lastname
            birthday
        }
        company {
             companyName
        }   
    }
  }`


async function copyClipboard(text: string) {
    if ('clipboard' in navigator) {
        return await navigator.clipboard.writeText(text)
    } else {
        return document.execCommand('copy', true, text)
    }
}



export default function UserData({ limit, orders, roles }: Filters) {

    const [ pages, setPages ] = useState(0)

    const [ isCopied, setCopied ] = useState(false)
    const [ profile, setProfile ] = useState("")

    const onCopyEmailAddress = (e: any) => {
        copyClipboard(e.currentTarget.value).then(() => {
            setCopied(true)
            setTimeout(() => {
                setCopied(false)
            }, 1500)
        }).catch(e => {
            console.log(e)
        })
    }


    const { loading, data } = useQuery(users, {
        variables: {
            limit: limit, offset: limit * pages, role: roles, order: orders
        }
    })


    return (
        <div className={styles.container}>
            {
                isCopied ? <div className={styles.copy}>
                    <Message status={'success'} label='Successfully Copied' message='' />
                </div> : null
            }
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
                <div className={styles.pages}>
                    <button disabled={!pages} onClick={() => setPages(() => pages - 1)}>
                        <Image src="/dashboard/arro-left-line.svg" alt="" height={20} width={20} />
                    </button>
                    <span>{pages + 1}</span>
                    <button disabled={loading ? true : data.getUserByRoles.length < limit} onClick={() => setPages(() => pages + 1)}>
                        <Image src="/dashboard/arro-left-line.svg" alt="" height={20} width={20} />
                    </button>
                </div>
            </div>
        </div>
    )
}
