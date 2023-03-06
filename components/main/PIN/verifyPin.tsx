import React, { useEffect, useState } from 'react'
import styles from '../../../styles/components/main/pin.module.scss'
import { useMutation } from '@apollo/client'
import { LoginUsers } from '../../../util/auth/login'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import { useRouter } from 'next/router'
import Message from '../../message/message'

interface decodedToken {
    role: string
    userID: string
}


export default function VerifyPin({ email, password, close }: any) {
    const router = useRouter()

    const [ verifyPin, setVerifyPin ] = useState({
        one: "" as unknown as number,
        two: "" as unknown as number,
        three: "" as unknown as number,
        four: "" as unknown as number
    })

    const [ message, setMessage ] = useState(false)


    const [ usersLogin, { data, error } ] = useMutation(LoginUsers, {

    })

    useEffect(() => {
        setTimeout(() => {
            setMessage(false)
        }, 1500)

        if (error) {
            setTimeout(() => {
                close(false)
            }, 1500)
        }
    }, [ close, error, message ])


    useEffect(() => {
        if (!verifyPin.one || !verifyPin.two || !verifyPin.three || !verifyPin.four) return
        usersLogin({
            variables: {
                auth: {
                    email: email,
                    password: password,
                },
                pin: `${verifyPin.one.toString()}${verifyPin.two.toString()}${verifyPin.three.toString()}${verifyPin.four.toString()}`
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
                setMessage(true)
            },
            onError: err => {
                setMessage(true)
            }
        })
    }, [ close, email, password, router, usersLogin, verifyPin.four, verifyPin.one, verifyPin.three, verifyPin.two ])
    return (
        <div className={styles.container}>
            {data && message ?
                <div className={styles.message}>
                    <Message label={'Successfully Login'} message='' status='success' />
                </div> : null}
            {error && message ?
                <div className={styles.message}>
                    <Message label={`${error.message}`} message='' status='error' />
                </div> : null}
            <div className={styles.closeBtn}>
                <button onClick={() => close(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d02222" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
            <div className={styles.hel}>
                <h2>Enter your 4-Digit Pin</h2>
                <form>
                    <input type="text"
                        maxLength={1}
                        autoFocus
                        value={verifyPin.one} onChange={e => {
                            setVerifyPin({ ...verifyPin, one: parseInt(e.target.value) })

                            if (isNaN(parseInt(e.target.value))) {
                                setVerifyPin({ ...verifyPin, one: "" as unknown as number })
                            }
                        }} />
                    <input type="text" maxLength={1}
                        value={verifyPin.two} onChange={e => {
                            setVerifyPin({ ...verifyPin, two: parseInt(e.target.value) })
                            if (isNaN(parseInt(e.target.value))) {
                                setVerifyPin({ ...verifyPin, two: "" as unknown as number })
                            }
                        }}
                    />
                    <input type="text" maxLength={1}
                        value={verifyPin.three} onChange={e => {
                            setVerifyPin({ ...verifyPin, three: parseInt(e.target.value) })
                            if (isNaN(parseInt(e.target.value))) {
                                setVerifyPin({ ...verifyPin, three: "" as unknown as number })
                            }
                        }} />
                    <input type="text" maxLength={1}
                        value={verifyPin.four} onChange={e => {
                            setVerifyPin({ ...verifyPin, four: parseInt(e.target.value) })
                            if (isNaN(parseInt(e.target.value))) {
                                setVerifyPin({ ...verifyPin, four: "" as unknown as number })
                            }
                        }} />
                </form>
            </div>
        </div>
    )
}
