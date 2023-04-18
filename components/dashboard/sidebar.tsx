import React, { useEffect, useState } from 'react'
import styles from '../../styles/components/dashboard/sidebar.module.scss';
import { useRouter } from 'next/router';
import jwtDecode from 'jwt-decode'
import Cookies from 'js-cookie'
import { client } from '../../pages/_app';
import { useMutation } from '@apollo/client';
import { logoutLog } from '../../util/logs/log.mutation';
import Image from 'next/image'
import Notification from './notification';


export default function Sidebar() {
    const [ roles, setRoles ] = useState("")
    const [ userid, setuserid ] = useState("")

    const [ notif, setNotif ] = useState(false)
    useEffect(() => {
        const cookies = Cookies.get("ghs_access_token")
        if (cookies) {
            const { userID, role }: any = jwtDecode(cookies)
            setuserid(userID)
            setRoles(role)
        }
    }, [])




    const admin = [
        { name: "overview", url: `/dashboard/${roles}/overview` },
        { name: "post", url: `/dashboard/${roles}/post` },
        { name: "applicants", url: `/dashboard/${roles}/applications` },
        { name: "endorsement", url: `/dashboard/${roles}/endorsement` },
        { name: "user", url: `/dashboard/${roles}/user` },
        { name: "archive", url: `/dashboard/${roles}/archive` },
        { name: "settings", url: `/dashboard/${roles}/settings` }
    ]

    const recruiter = [
        { name: "overview", url: `/dashboard/${roles}/overview` },
        { name: "post", url: `/dashboard/${roles}/post` },
        { name: "applicants", url: `/dashboard/${roles}/applications` },
        { name: "endorsement", url: `/dashboard/${roles}/endorsement` },
        { name: "settings", url: `/dashboard/${roles}/settings` }
    ]
    const manager = [
        { name: "overview", url: `/dashboard/${roles}/overview` },
        { name: "post", url: `/dashboard/${roles}/post` },
        { name: "applicants", url: `/dashboard/${roles}/applications` },
        { name: "endorsement", url: `/dashboard/${roles}/endorsement` },
        { name: "user", url: `/dashboard/${roles}/user` },
        { name: "archive", url: `/dashboard/${roles}/archive` },
        { name: "settings", url: `/dashboard/${roles}/settings` }
    ]
    const moderator = [
        { name: "overview", url: `/dashboard/${roles}/overview` },
        { name: "post", url: `/dashboard/${roles}/post` },
        { name: "Applicants", url: `/dashboard/${roles}/applications` },
        { name: "User", url: `/dashboard/${roles}/user` },
        { name: "archive", url: `/dashboard/${roles}/archive` },
        { name: "settings", url: `/dashboard/${roles}/settings` }
    ]

    const employer = [
        { name: "endorse", url: `/dashboard/${roles}/endorse` },
        { name: "settings", url: `/dashboard/${roles}/settings` }
    ]
    const router = useRouter()


    const [ createLogoutLogs ] = useMutation(logoutLog, {
        variables: {
            userId: userid
        }
    })

    const handleLogoutnBtn = () => {
        createLogoutLogs()
        Cookies.remove("ghs_access_token")
        router.push("/")
    }
    return (
        <div className={styles.container}>
            <nav>
                <ul>
                    {roles === "administrator" ? admin.map(({ name, url }: any) => (
                        <li style={router.pathname.includes(url) ? { background: "#D02222" } : {}} onClick={() => router.push(url)} key={name}>
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
            {roles === "administrator" ? <div className={styles.notification}>
                <button onClick={() => setNotif(() => !notif)}>
                    <Image src="/dashboard/bell.svg" alt="" height={25} width={25} />
                </button>
            </div> : null}
            {roles === "moderator" ? <div className={styles.notification}>
                <button onClick={() => setNotif(() => !notif)}>
                    <Image src="/dashboard/bell.svg" alt="" height={25} width={25} />
                </button>
            </div> : null}
            {roles === "manager" ? <div className={styles.notification}>
                <button onClick={() => setNotif(() => !notif)}>
                    <Image src="/dashboard/bell.svg" alt="" height={25} width={25} />
                </button>
            </div> : null}
            {notif ?
                <div className={styles.notify}>
                    <Notification open={notif} close={setNotif} />
                </div> : null
            }
            <button onClick={handleLogoutnBtn}>
                <Image src="/dashboard/logout-line.svg" alt="" height={25} width={30} />
            </button>
        </div>
    )
}
