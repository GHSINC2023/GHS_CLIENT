import React, { useRef, useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import Message from '../message/message'
import styles from '../../styles/components/auth/verify.module.scss'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { LoginUsers } from '../../util/auth/login'
import Image from 'next/image'


interface decodedToken {
    role: string
    userID: string
}


export default function Verify({ close, email, password }: any) {

    const router = useRouter()

    const [ verifyPin, setVerifyPin ] = useState({
        one: "",
        two: "",
        three: "",
        four: ""
    })


    const onTapOne = useRef<HTMLInputElement>(null)
    const onTapTwo = useRef<HTMLInputElement>(null)
    const onTapThree = useRef<HTMLInputElement>(null)
    const onTapFour = useRef<HTMLInputElement>(null)
    const [ message, setMessage ] = useState(false)

    const [ usersLogin, { data, error } ] = useMutation(LoginUsers)

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
    return (
        <div className={styles.container}>
            {data && message ? <div className={styles.message}>
                <Message label={`Successfully Login`} status={'success'} message={''} />
            </div> : null}
            {error && message ? <div className={styles.message}>
                <Message label={`${error.message}`} status={'error'} message={''} />
            </div> : null}
            <div className={styles.header}>
                <button onClick={() => close(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d02222" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
            <div className={styles.nm}>
                <h2>Enter your pin</h2>
                <form>
                    <input type="text"
                        maxLength={1}
                        autoFocus
                        ref={onTapOne}
                        value={verifyPin.one} onChange={e => {
                            setVerifyPin({ ...verifyPin, one: e.target.value })
                            if (e.target.value.length === 1) {
                                onTapTwo.current?.focus()
                            }
                        }} />
                    <input type="text" maxLength={1}
                        ref={onTapTwo}
                        value={verifyPin.two} onChange={e => {
                            setVerifyPin({ ...verifyPin, two: e.target.value })
                            if (e.target.value.length === 1) {
                                onTapThree.current?.focus()
                            }
                            if (e.target.value.length === 0) {
                                onTapOne.current?.focus()
                            }
                        }}
                    />
                    <input type="text" maxLength={1}
                        ref={onTapThree}
                        value={verifyPin.three} onChange={e => {
                            setVerifyPin({ ...verifyPin, three: e.target.value })
                            if (e.target.value.length === 1) {
                                onTapFour.current?.focus()
                            }
                            if (e.target.value.length === 0) {
                                onTapTwo.current?.focus()
                            }
                        }} />
                    <input type="text" maxLength={1}
                        ref={onTapFour}
                        value={verifyPin.four} onChange={e => {
                            setVerifyPin({ ...verifyPin, four: e.target.value })
                            if (e.target.value.length === 0) {
                                onTapThree.current?.focus()
                            }
                        }} />
                </form>
            </div>
        </div>
    )
}
