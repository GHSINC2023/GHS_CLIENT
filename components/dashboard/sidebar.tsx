import React, { useEffect, useState } from 'react'
import styles from '../../styles/components/dashboard/sidebar.module.scss';
import { useRouter } from 'next/router';
import jwtDecode from 'jwt-decode'
import Cookies from 'js-cookie';
import { client } from '../../pages/_app';


export default function Sidebar() {
    const [ roles, setRoles ] = useState("")

    useEffect(() => {
        const cookies = Cookies.get("ghs_access_token")
        if (cookies) {
            const { role }: any = jwtDecode(cookies)
            setRoles(role)
        }
    }, [])

    const admin = [
        { name: "overview", url: `/dashboard/${roles}/overview` },
        { name: "post", url: `/dashboard/${roles}/post` },
        { name: "endorsement", url: `/dashboard/${roles}/endorsement` },
        { name: "user", url: `/dashboard/${roles}/user` },
        { name: "applicants", url: `/dashboard/${roles}/applicants` },
        { name: "settings", url: `/dashboard/${roles}/settings` }
    ]

    const recruiter = [
        { name: "overview", url: `/dashboard/${roles}/overview` },
        { name: "post", url: `/dashboard/${roles}/post` },
        { name: "endorsement", url: `/dashboard/${roles}/endorsement` },
        { name: "applicants", url: `/dashboard/${roles}/applicants` },
        { name: "settings", url: `/dashboard/${roles}/settings` }
    ]
    const manager = [
        { name: "overview", url: `/dashboard/${roles}/overview` },
        { name: "post", url: `/dashboard/${roles}/post` },
        { name: "endorsement", url: `/dashboard/${roles}/endorsement` },
        { name: "user", url: `/dashboard/${roles}/user` },
        { name: "applicants", url: `/dashboard/${roles}/applicants` },
        { name: "settings", url: `/dashboard/${roles}/settings` }
    ]
    const moderator = [
        { name: "overview", url: `/dashboard/${roles}/overview` },
        { name: "post", url: `/dashboard/${roles}/post` },
        { name: "Applicant Logs", url: `/dashboard/${roles}/applicant_logs` },
        { name: "settings", url: `/dashboard/${roles}/settings` }
    ]

    const employer = [
        { name: "overview", url: `/dashboard/${roles}/overview` },
        { name: "endorse", url: `/dashboard/${roles}/endorse` },
        { name: "settings", url: `/dashboard/${roles}/settings` }
    ]
    const router = useRouter()


    const handleLogoutnBtn = () => {
        client.resetStore()
        Cookies.remove("ghs_access_token")
        router.push("/")
    }
    return (
        <div className={styles.container}>
            <nav>
                <ul>
                    {roles === "administrator" ? admin.map(({ name, url }: any) => (
                        <li onClick={() => router.push(url)} key={name}>
                            <span>{name}</span>
                        </li>
                    )) : null}
                    {roles === "manager" ? manager.map(({ name, url }: any) => (
                        <li onClick={() => router.push(url)} key={name}>
                            <span>{name}</span>
                        </li>
                    )) : null}
                    {roles === "moderator" ? moderator.map(({ name, url }: any) => (
                        <li onClick={() => router.push(url)} key={name}>
                            <span>{name}</span>
                        </li>
                    )) : null}
                    {roles === "recruiter" ? recruiter.map(({ name, url }: any) => (
                        <li onClick={() => router.push(url)} key={name}>
                            <span>{name}</span>
                        </li>
                    )) : null}
                    {roles === "employer" ? employer.map(({ name, url }: any) => (
                        <li onClick={() => router.push(url)} key={name}>
                            <span>{name}</span>
                        </li>
                    )) : null}
                </ul>
            </nav>
            <div className={styles.logout}>
                <button onClick={handleLogoutnBtn}>
                    Logout
                </button>
            </div>
        </div>
    )
}
