import React, { useEffect, useState } from 'react'
import styles from '../../../styles/components/main/application/otp.module.scss'
import { useMutation } from '@apollo/client'
import { createOTPS, verifyMyOTP } from '../../../util/OTP/otp.mutation'
import Message from '../../message/message'

export default function OTPS({ email, applicantForm, close }: any) {

    const [ timer, setTimer ] = useState(180)
    const [ message, setMessage ] = useState(false)
    const [ one, setOne ] = useState("")
    const [ two, setTwo ] = useState("")
    const [ three, setThree ] = useState("")
    const [ four, setFour ] = useState("")
    const [ five, setFive ] = useState("")
    const [ six, setSix ] = useState("")


    const [ resendNewOTP ] = useMutation(createOTPS, {
        variables: {
            email: email
        }
    })
    const [ verifyMyOTPs, { data, error } ] = useMutation(verifyMyOTP, {

        onCompleted: () => {
            applicantForm()
            setMessage(true)
        },
        onError: (e) => {
            setMessage(true)
        }
    })
    useEffect(() => {
        if (!timer) return
        const interv = setInterval(() => {
            setTimer(() => timer - 1)
        }, 2500)

        return () => clearInterval(interv)
    }, [ timer ])


    useEffect(() => {
        setTimeout(() => {
            setMessage(false)
        }, 2000)
    }, [ close, message ])


    const handleCreateNewOTP = (e: any) => {
        e.preventDefault()
        resendNewOTP()
    }

    useEffect(() => {

        if (!one || !two || !three || !four || !five || !six) return
        verifyMyOTPs({
            variables: {
                otp: `${one}${two}${three}${four}${five}${six}`
            },
        })

    }, [ five, four, one, six, three, two, verifyMyOTPs ])
    return (
        <div className={styles.otpContainer}>
            <div className={styles.header}>
                <h2>OTP Verification</h2>
                <span>Enter your code that sent into your email {email} </span>
            </div>
            {data && message ? <div className={styles.message}>
                <Message label="Applicant Successful" message='' status='success' />
            </div> : null}
            {error && message ? <div className={styles.message}>
                <Message label={error.message} message='' status='error' />
            </div> : null}
            <div className={styles.enterOTP}>

                <form id="form" onSubmit={handleCreateNewOTP}>
                    <input type="text" inputMode='numeric'
                        value={one}
                        onChange={e => setOne(e.target.value)}
                        autoComplete='one-time-code' maxLength={1} />
                    <input type="text" inputMode='numeric'
                        value={two}
                        onChange={e => setTwo(e.target.value)}
                        autoComplete='one-time-code' maxLength={1} />
                    <input type="text" inputMode='numeric'
                        value={three}
                        onChange={e => setThree(e.target.value)}
                        autoComplete='one-time-code' maxLength={1} />
                    <input type="text" inputMode='numeric'
                        value={four}
                        onChange={e => setFour(e.target.value)}
                        autoComplete='one-time-code' maxLength={1} />
                    <input type="text" inputMode='numeric'
                        value={five}
                        onChange={e => setFive(e.target.value)}
                        autoComplete='one-time-code' maxLength={1} />
                    <input type="text" inputMode='numeric'
                        value={six}
                        onChange={e => setSix(e.target.value)}
                        autoComplete='one-time-code' maxLength={1} />
                </form>
            </div>
            <div className={styles.rsendOTP}>
                {timer === 0 ? null : <span>{timer}s</span>}
                {timer !== 0 ? null :
                    <>
                        <span>Didn{"'"}t receive the OTP</span>
                        <button className={styles.otpsend}
                            onClick={(e) => {
                                handleCreateNewOTP(e)
                                setTimer(180)
                            }}
                        >RESEND OTP</button>
                    </>}
            </div>
            <button onClick={() => close(false)} className={styles.closeBtn}>Close</button>
        </div>
    )
}
