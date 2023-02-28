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
        onError: () => {
            setMessage(true)
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
        setTimeout(() => { setMessage(false) }, 1500)
    }, [ message ])


    return (
        <div className={styles.container}>
            <h2>Change Password</h2>
            {data && message ? <div className={styles.message}>
                <Message label='Successfully Password Update' message='' status='success' />
            </div> : null}
            {error && message ? <div className={styles.message}>
                <Message label='Password is not Matched' message='' status='error' />
            </div> : null}
            <form onSubmit={handleResetPass}>
                <label>New Password</label>
                <input type="password" value={pass.password}

                    onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Must contain at least one uppercase, lowercase, digit, and special character')}
                    onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
                    pattern="[a-zA-Z0-9]+[!@#$%^&_]"
                    required
                    onChange={e => setPass({ ...pass, password: e.target.value })}
                    placeholder='Enter your new password'
                />
                <label>Retype Password</label>
                <input type="password" value={pass.retype} onChange={e => setPass({ ...pass, retype: e.target.value })}
                    placeholder='Re-type your new password'
                />
                <button disabled={pass.password.length <= 6} type="submit">Change Password</button>
            </form>
        </div>
    )
}
