import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../../styles/components/main/headers.module.scss'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import { useRouter } from 'next/router'
export default function Header() {

    const [ token, setToken ] = useState("")
    const [ roles, setRoles ] = useState("")

    const router = useRouter()

    useEffect(() => {
        const cookies = Cookies.get("ghs_access_token")
        if (cookies) {
            const { role }: any = jwtDecode(cookies)
            setRoles(role)
            setToken(cookies)
        }
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <Image src="/logo/GHS.webp" alt="logo" height={50} width={200} />
            </div>
            {token ?
                <div className={styles.token}>
                    {roles === "employer" ? <Link href={`/dashboard/${roles}/endorse`}>Go To Dashboard</Link> : <Link href={`/dashboard/${roles}/overview`}>Go To Dashboard</Link>}
                </div> :

                <div className={styles.link}>
                    {router.pathname === "auth/login" ? null : <Link href="/auth/applicant/login">Login</Link>}
                    {router.pathname === "auth/applicant/login" ? null : <Link href="/auth/applicant/login">Login</Link>}
                </div>
            }


        </div>
    )
}
