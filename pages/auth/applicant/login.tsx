import React, { FC, useState, useEffect } from 'react'
import PageWithLayout from '../../../layout/page.layout'
import MainLayout from '../../../layout/main.layout'
import styles from '../../../styles/components/auth/login.module.scss'
import Head from 'next/head'
import PageOne from '../../../components/auth/page1'
import PageTwo from '../../../components/auth/page2'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import Message from '../../../components/message/message'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import { ApplicantLogs } from '../../../util/auth/login'
interface decodedToken {
    applicantID: string
}



const Login: FC = () => {

    const [ pages, setPages ] = useState(1)

    const [ message, setMessage ] = useState(false)
    const [ users, setUsers ] = useState({
        id: "",
        email: ""
    })

    const router = useRouter()


    const [ usersLogin, { data, error } ] = useMutation(ApplicantLogs)


    useEffect(() => {
        const interval = setInterval(() => {
            setPages(pages + 1)
            if (pages === 2) {
                setPages(1)
            }
        }, 6000)


        return () => clearInterval(interval)
    }, [ pages ])


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
                    setMessage(true)
                }
            },
            onError: err => {
                setMessage(true)
            }
        })
    }

    useEffect(() => {
        setTimeout(() => {
            setMessage(false)
        }, 2000)
    }, [ message ])

    return (
        <div className={styles.container}>
            <Head>
                <title>Login - Applicant</title>
            </Head>
            {data && message ? <div className={styles.message}>
                <Message label={`Successfully Login`} status={'success'} message={''} />
            </div> : null}
            {error && message ? <div className={styles.message}>
                <Message label={`${error?.message}`} status={'error'} message={''} />
            </div> : null}
            <div className={styles.bg}>
                {pages === 1 ? <PageOne /> : null}
                {pages === 2 ? <PageTwo /> : null}
                <div className={styles.acc}>

                </div>
            </div>
            <div className={styles.la}>
                <form onSubmit={loginFormSubmit}>
                    <h2>Login into your Account</h2>
                    <input type="text" value={users.id} onChange={(e) => setUsers({ ...users, id: e.target.value })} placeholder='Applicant No.' />
                    <input type="email" value={users.email} onChange={(e) => setUsers({ ...users, email: e.target.value })} placeholder='Email Address ' />
                    <button disabled={!users.email || !users.id} type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}
(Login as PageWithLayout).layout = MainLayout
export default Login