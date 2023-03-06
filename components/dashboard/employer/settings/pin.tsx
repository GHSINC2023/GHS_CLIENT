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
        pin: "" as unknown as string,
        repin: "" as unknown as string,
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
            setUserpin({
                pin: "" as unknown as string,
                repin: "" as unknown as string
            })
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

        setTimeout(() => {
            setMessage(false)
        }, 2000)

    }, [ message ])
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
                    onChange={e => {
                        setUserpin({ ...userPin, pin: e.target.value })
                    }}
                    maxLength={4} placeholder='Enter your pin' />
                <input type="password"
                    onChange={e => {
                        setUserpin({
                            ...userPin, repin: e.target.value
                        })

                    }}
                    value={userPin.repin} maxLength={4} placeholder='Re-Enter your pin' />
                <button disabled={!userPin.pin || !userPin.repin}>Submit</button>
            </form>
        </div>
    )
}
