import React, { useEffect, useState } from 'react'
import styles from '../../../../styles/components/dashboard/settings/pin.module.scss'
import { changeUserPin } from '../../../../util/pin/pin.mutation'
import { useMutation } from '@apollo/client'
import Message from '../../../message/message'


interface Pin {
    pin: string,
    repin: string
}
export default function Pin({ userid }: any) {

    const [ userPin, setUserpin ] = useState<Pin>({
        pin: "",
        repin: "",
    })

    const [ message, setMessage ] = useState(false)

    const [ changedPin, { data, error } ] = useMutation(changeUserPin, {
        variables: {
            pin: userPin.pin,
            rePin: userPin.repin,
            userId: userid
        },
        onCompleted: () => {
            setMessage(true)
        },
        onError: () => {
            setMessage(true)
        }
    })

    const handleResetPin = (e: any) => {
        e.preventDefault();
        changedPin()
    }

    useEffect(() => {
        if (data) {
            setTimeout(() => {
                setMessage(false)
            }, 1000)
        }
    }, [ data ])
    return (
        <div className={styles.container}>
            {
                data && message ? <div className={styles.message}><Message label='Successfully Updated' message='' status='success' /></div> : null
            }
            {
                error && message ? <div className={styles.message}><Message label={`${error.message}`} message='' status='error' /></div> : null
            }
            <h2>Change Pin</h2>
            <form onSubmit={handleResetPin}>
                <input type="password" value={userPin.pin}
                    onChange={e => setUserpin({ ...userPin, pin: e.target.value })}
                    maxLength={4} placeholder='Enter your pin' />
                <input type="password"
                    onChange={e => setUserpin({ ...userPin, repin: e.target.value })}
                    value={userPin.repin} maxLength={4} placeholder='Re-Enter your pin' />
                <button disabled={!userPin.pin || !userPin.repin}>Submit</button>
            </form>
        </div>
    )
}
