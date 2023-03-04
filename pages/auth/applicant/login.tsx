import React, { useState } from 'react'
import Head from 'next/head'
import styles from '../../../styles/components/applicant/login.module.scss'
import { useMutation } from '@apollo/client'
import { ApplicantLogs } from '../../../util/auth/login'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import Message from '../../../components/message/message'

interface decodedToken {
    applicantID: string
}

export default function Login() {
    const router = useRouter()

    const [ usersLogin, { data, error } ] = useMutation(ApplicantLogs)
    const [ message, setMessage ] = useState(false)
    const [ users, setUsers ] = useState({
        id: "",
        email: ""
    })


    const loginFormSubmit = (e: any) => {
        e.preventDefault()
        usersLogin({
            variables: {
                email: users.email,
                viewMyApplicationId: users.id
            },
            onCompleted: data => {
                if (data) {
                    const cookie = Cookies.set("ghs_access_applicant", data.viewMyApplication.token, {
                        secure: true,
                        sameSite: "none",
                        expires: 60 * 60 * 24
                    })
                    if (cookie) {
                        const { applicantID }: decodedToken = jwtDecode(cookie)
                        router.push(`/applicants/${applicantID}`)
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
            {data && message ? <div className={styles.message}>
                <Message label={`${error?.message}`} status={'error'} message={''} />
            </div> : null}
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
                    <input type="text" value={users.id} onChange={e => setUsers({ ...users, id: e.target.value })} placeholder='Applicant No.' />
                    <input type="email" value={users.email} onChange={e => setUsers({ ...users, email: e.target.value })} placeholder='Email Address' />

                    <button type='submit'>Login</button>
                </form>
            </div>
        </div>
    )
}
