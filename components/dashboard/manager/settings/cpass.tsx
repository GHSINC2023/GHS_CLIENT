import React, { useState, useEffect } from 'react'
import styles from '../../../../styles/components/dashboard/settings/changePass.module.scss'

import { useMutation } from '@apollo/client'
import { userPass } from '../../../../util/account/profile.mutation'
import Message from '../../../message/message'


interface Password {
    retype: string
    password: string
}


export default function CPass({ userid }: any) {

    const [ pass, setPass ] = useState<Password>({
        retype: "",
        password: ""
    })

    const [ message, setMessage ] = useState(false)

    const [ resetPass, { data, error } ] = useMutation(userPass, {
        variables: {

            userId: userid,
            retype: pass.retype,
            password: pass.password
        },
        onCompleted: () => {
            setMessage(true)
        }
    })


    const handleResetPass = (e: any) => {
        e.preventDefault()
        resetPass()
    }

    useEffect(() => {
        setTimeout(() => { setMessage(false) }, 1000)
    }, [])

    return (
        <div className={styles.container}>
            <h2>Change Password</h2>
            {data && message ? <div className={styles.message}>
                <Message label='Successfully Password Update' message='' status='success' />
            </div> : null}
            {error?.message === "Password is not Matched" && message ? <div className={styles.message}>
                <Message label='Password is not Matched' message='' status='error' />
            </div> : null}
            <form onSubmit={handleResetPass}>
                <label>New Password</label>
                <input type="password" value={pass.password} pattern="^(?=.*[A-Z])(?=.*\d)(?=.*[$!#$%^&*])[A-Za-z\d$!#$%^&*]+$"
                    maxLength={8} onChange={e => setPass({ ...pass, password: e.target.value })}
                    placeholder='Enter your new password'
                />
                <label>Retype Password</label>
                <input type="password" value={pass.retype} onChange={e => setPass({ ...pass, retype: e.target.value })}
                    placeholder='Re-type your new password'
                />
                <button type="submit">Change Password</button>
            </form>
        </div>
    )
}
