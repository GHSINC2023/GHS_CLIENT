import React, { useState } from 'react'
import styles from '../../../../styles/components/dashboard/settings/changePass.module.scss'

import { useMutation } from '@apollo/client'
import { userPass } from '../../../../util/account/profile.mutation'


interface Password {
    retype: string
    password: string
}


export default function CPass({ userid }: any) {

    const [ pass, setPass ] = useState<Password>({
        retype: "",
        password: ""
    })


    const [ resetPass ] = useMutation(userPass, {
        variables: {

            userId: userid,
            retype: pass.retype,
            password: pass.password

        }
    })


    const handleResetPass = (e: any) => {
        e.preventDefault()
        resetPass()
    }

    return (
        <div className={styles.container}>
            <h2>Change Password</h2>
            <form onSubmit={handleResetPass}>
                <label>New Password</label>
                <input type="text" value={pass.password} onChange={e => setPass({ ...pass, password: e.target.value })}
                    placeholder='Enter your new password'
                />
                <label>Retype Password</label>
                <input type="text" value={pass.password} onChange={e => setPass({ ...pass, password: e.target.value })}
                    placeholder='Re-type your new password'
                />
                <button type="submit">Change Password</button>
            </form>
        </div>
    )
}
