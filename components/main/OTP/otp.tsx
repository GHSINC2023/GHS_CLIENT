import React, { useCallback, useEffect, useState } from 'react'
import styles from '../../../styles/components/main/application/otp.module.scss'
import { useMutation } from '@apollo/client'
import { createOTPS, verifyMyOTP } from '../../../util/OTP/otp.mutation'

export default function OTPS({ email, applicantForm }: any) {

    const [ timer, setTimer ] = useState(180)

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
    const [ verifyMyOTPs, { error } ] = useMutation(verifyMyOTP, {

        onCompleted: () => {
            applicantForm()
        },
        onError: (e) => {
            console.log(e.message)
        }
    })
    useEffect(() => {
        if (!timer) return
        const interv = setInterval(() => {
            setTimer(() => timer - 1)
        }, 1000)

        return () => clearInterval(interv)
    }, [ timer ])




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
            {error ? <div>
                {error.message}
            </div> : null}
            <div className={styles.enterOTP}>

                <form id="form" onSubmit={handleCreateNewOTP}>
                    <input type="text" inputMode='numeric'
                        value={one}
                        autoFocus
                        onChange={e => setOne(e.target.value)}
                        autoComplete='one-time-code' maxLength={1} />
                    <input type="text" inputMode='numeric'
                        value={two}
                        autoFocus
                        onChange={e => setTwo(e.target.value)}
                        autoComplete='one-time-code' maxLength={1} />
                    <input type="text" inputMode='numeric'
                        value={three}
                        autoFocus
                        onChange={e => setThree(e.target.value)}
                        autoComplete='one-time-code' maxLength={1} />
                    <input type="text" inputMode='numeric'
                        value={four}
                        autoFocus
                        onChange={e => setFour(e.target.value)}
                        autoComplete='one-time-code' maxLength={1} />
                    <input type="text" inputMode='numeric'
                        value={five}
                        autoFocus
                        onChange={e => setFive(e.target.value)}
                        autoComplete='one-time-code' maxLength={1} />
                    <input type="text" inputMode='numeric'
                        value={six}
                        autoFocus
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
        </div>
    )
}
