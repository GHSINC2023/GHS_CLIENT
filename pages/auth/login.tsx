import React, { useState } from 'react'
import Head from 'next/head'
import styles from '.././../styles/components/main/login.module.scss'
import VerifyPin from '../../components/main/PIN/verifyPin'


interface UserAuth {
    email: string
    password: string
}
export default function Login() {
    const [ users, setUsers ] = useState<UserAuth>({
        email: "",
        password: "",
    })

    const [ isPin, setPin ] = useState(false)


    return (
        <div className={styles.container}>
            <Head>
                <title>Login</title>
            </Head>
            {isPin ?
                <div className={styles.pin}>
                    <VerifyPin email={users.email} password={users.password} close={setPin} />
                </div> : null
            }
            <div className={styles.bground} />
            <div className={styles.login}>
                <form>
                    <div className={styles.titleContainer}>
                        <h2>Login</h2>
                    </div>
                    <input type="email" value={users.email} onChange={e => setUsers({ ...users, email: e.target.value })} placeholder='Email Address' />
                    <input type="password" value={users.password} onChange={e => setUsers({ ...users, password: e.target.value })} placeholder='Password' />
                    <button disabled={!users.email || !users.password || !users.email.includes("@")} onClick={() => setPin(() => !isPin)} type="button">Login</button>
                </form>
            </div>
        </div>
    )
}
