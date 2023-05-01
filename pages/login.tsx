import React, { FC, useState, useEffect } from 'react'
import PageWithLayout from '../layout/page.layout'
import MainLayout from '../layout/main.layout'
import styles from '../styles/components/auth/login.module.scss'
import Head from 'next/head'
import PageOne from '../components/auth/page1'
import PageTwo from '../components/auth/page2'
import Verify from '../components/auth/verify'
import { useRouter } from 'next/router'


interface UserAuth {
    email: string
    password: string
}

const Login: FC = () => {

    const [ pages, setPages ] = useState(1)
    const [ message, setMessage ] = useState(false)
    const [ pin, setPin ] = useState(false)
    const [ users, setUsers ] = useState<UserAuth>({
        password: "",
        email: ""
    })

    const router = useRouter()




    useEffect(() => {
        const interval = setInterval(() => {
            setPages(pages + 1)
            if (pages === 2) {
                setPages(1)
            }
        }, 6000)


        return () => clearInterval(interval)
    }, [ pages ])


    useEffect(() => {
        setTimeout(() => {
            setMessage(false)
        }, 2000)
    }, [ message ])

    return (
        <div className={styles.container}>
            <Head>
                <title>Login</title>
            </Head>
            {pin ?
                <div className={styles.pin}>
                    <Verify email={users.email} password={users.password} close={setPin} />
                </div> :
                null}
            <div className={styles.bg}>
                {pages === 1 ? <PageOne /> : null}
                {pages === 2 ? <PageTwo /> : null}
                <div className={styles.acc}>

                </div>
            </div>
            <div className={styles.la}>
                <form>
                    <h2>Login into your Account</h2>
                    <input type="email" value={users.email} onChange={(e) => setUsers({ ...users, email: e.target.value })} placeholder='Email Address ' />
                    <input type="password" value={users.password} onChange={(e) => setUsers({ ...users, password: e.target.value })} placeholder='Password' />
                    <button disabled={!users.email.includes("@") || !users.password} type="button" onClick={() => setPin(() => !pin)}>Login</button>
                </form>
            </div>
        </div>
    )
}
(Login as PageWithLayout).layout = MainLayout
export default Login