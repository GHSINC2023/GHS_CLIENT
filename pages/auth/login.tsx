import React, { useState } from 'react'
import Head from 'next/head'
import styles from '.././../styles/components/main/login.module.scss'
import { useMutation } from '@apollo/client'
import { LoginUsers } from '../../util/auth/login'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'

interface decodedToken {
    role: string
    userID: string
}

export default function Login() {
    const router = useRouter()

    const [ usersLogin, { error } ] = useMutation(LoginUsers)
    const [ users, setUsers ] = useState({
        email: "",
        password: ""
    })


    const loginFormSubmit = (e: any) => {
        e.preventDefault()
        usersLogin({
            variables: {
                auth: {
                    email: users.email,
                    password: users.password
                }
            },
            onCompleted: data => {
                if (data) {
                    const token = Cookies.set("ghs_access_token", data.login.token, {
                        secure: true,
                        sameSite: "none",
                        path: "/",
                        expires: 60 * 60 * 24 * 7
                    })
                    if (token) {
                        const { userID, role }: decodedToken = jwtDecode(token)
                        console.log(role)
                        if (role === "administrator") {
                            router.push(`/dashboard/administrator/overview`)
                        }

                        if (role === "recruiter") {
                            router.push(`/dashboard/recruiter/overview`)
                        }
                        if (role === "manager") {
                            router.push(`/dashboard/manager/overview`)
                        }
                        if (role === "moderator") {
                            router.push(`/dashboard/moderator/overview`)
                        }
                        if (role === "employer") {
                            router.push(`/dashboard/employer/endorse`)
                        }
                    }
                }
            },
            onError: err => {
                console.log(err.message)
            }
        })
    }
    return (
        <div className={styles.container}>
            <Head>
                <title>Login</title>
            </Head>
            <div className={styles.bground} />
            <div className={styles.login}>
                <form onSubmit={loginFormSubmit}>

                    <div className={styles.titleContainer}>
                        <h2>Login</h2>
                        {error ? <div>{error.message}</div> : null}
                    </div>
                    <input type="email" value={users.email} onChange={e => setUsers({ ...users, email: e.target.value })} placeholder='Email Address' />
                    <input type="password" value={users.password} onChange={e => setUsers({ ...users, password: e.target.value })} placeholder='Password' />
                    <button type='submit'>Login</button>
                </form>
            </div>
        </div>
    )
}
