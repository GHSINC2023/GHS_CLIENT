import React, { useEffect, useState } from 'react'
import styles from '../../../../styles/components/dashboard/settings/pin.module.scss'
import { changeUserPin } from '../../../../util/pin/pin.mutation'
import { useMutation } from '@apollo/client'
import Message from '../../../message/message'


interface Pin {
    pin: number,
    repin: number
}
export default function Pin({ userid }: any) {

    const [ userPin, setUserpin ] = useState<Pin>({
        pin: "" as unknown as number,
        repin: "" as unknown as number,
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
                pin: "" as unknown as number,
                repin: "" as unknown as number
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
                        setUserpin({ ...userPin, pin: parseInt(e.target.value) })
                        if (isNaN(parseInt(e.target.value))) {
                            setUserpin({ ...userPin, pin: "" as unknown as number })
                        }
                    }}
                    maxLength={4} placeholder='Enter your pin' />
                <input type="password"
                    onChange={e => {
                        setUserpin({
                            ...userPin, repin: parseInt(e.target.value)
                        })
                        if (isNaN(parseInt(e.target.value))) {
                            setUserpin({ ...userPin, repin: "" as unknown as number })
                        }
                    }}
                    value={userPin.repin} maxLength={4} placeholder='Re-Enter your pin' />
                <button disabled={!userPin.pin || !userPin.repin}>Submit</button>
            </form>
        </div>
    )
}
