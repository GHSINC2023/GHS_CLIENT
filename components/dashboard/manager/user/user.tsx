import React, { useState, useEffect } from 'react'
import styles from '../../../../styles/components/dashboard/user/profile.module.scss'
import { useQuery, useMutation } from '@apollo/client'
import { getUserByProfileID } from '../../../../util/user/user.query'
import { resetUserPassword } from '../../../../util/user/user.mutation'
import { format } from 'date-fns'
import Message from '../../../message/message'

export default function User({ id, close }: any) {
    const [ tabValue, setTabValue ] = useState("about")
    const [ message, setMessage ] = useState(false)

    const { loading, data } = useQuery(getUserByProfileID, {
        variables: {
            userId: id
        }
    })

    const [ userResetPassword, { data: ResetSuccess } ] = useMutation(resetUserPassword)

    const onSubmitResetPassword = (e: any) => {
        e.preventDefault()
        userResetPassword({
            variables: {
                userId: id
            },
            onCompleted: data => {
                setMessage(true)
            }
        })
    }
    const onClickProfileHandler = () => {
        close(() => "")
    }
    const tabsValue = [
        { name: "About", value: "about" },
    ]

    const onClickTabValue = (e: any) => {
        setTabValue(() => e.target.value)
    }

    useEffect(() => {
        setTimeout(() => {
            setMessage(false)
        }, 1500)
    }, [ message ])
    return (
        <div className={styles.container}>
            {ResetSuccess && message ?
                <div className={styles.message} >
                    <Message status={'success'} label='Successfully Reset Password' message={''} />
                </div>
                : null
            }
            <div className={styles.box}>
                <div className={styles.header}>
                    <button onClick={onClickProfileHandler}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D02222" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <div className={styles.profile}>
                    {loading ? "Loading" : data.getUserByID.map(({ userID, email, role, createdAt, profile }: any) => (
                        profile.map(({ firstname, lastname, phone, birthday, profileAddress }: any) => (
                            <div className={styles.profileContainer} key={userID}>
                                <div className={styles.name}>
                                    <div className={styles.profileName}>
                                        <h2>{firstname} {lastname}</h2>
                                        <span>{role}</span>
                                    </div>
                                    <div className={styles.resetpass}>
                                        <button type="submit" onClick={onSubmitResetPassword}>Reset Password</button>
                                    </div>
                                </div>
                                <div className={styles.tabContainer}>
                                    <div className={styles.tab}>
                                        {tabsValue.map(({ name, value }) => (
                                            <button
                                                className={tabValue === value ? styles.active : ""} onClick={onClickTabValue} key={name} value={value}>{name}</button>
                                        ))}
                                    </div>
                                    {tabValue === "about" ?
                                        <div className={styles.about}>
                                            <div>
                                                <h4>Email: </h4>
                                                <span>{email}</span>
                                            </div>
                                            <div>
                                                <h4>Phone: </h4>
                                                <span>{phone}</span>
                                            </div>
                                            <div>
                                                <h4>Birthday: </h4>
                                                <span>{format(new Date(birthday), "MMMM dd yyyy")}</span>
                                            </div>
                                            <div>
                                                <h4>Date Created: </h4>
                                                <span>{format(new Date(createdAt), "MMMM dd yyyy")}</span>
                                            </div>
                                            <div>
                                                <h4>Address</h4>
                                                {profileAddress.map(({ addressID, street, zipcode, province, city }: any) => (
                                                    <span key={addressID}>{street}, {city}, {province}, {zipcode}</span>
                                                ))}
                                            </div>
                                        </div>
                                        : null
                                    }
                                </div>
                            </div>
                        ))
                    ))}
                </div>
            </div>
        </div>
    )
}
