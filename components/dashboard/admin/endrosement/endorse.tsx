import React, { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import styles from '../../../../styles/components/dashboard/endorsement/endorse.module.scss'
import { endorseTo } from '../../../../util/endorse/endorse.query'
import { CreateEndorse } from '../../../../util/endorse/endorse.mutation'
import Message from '../../../message/message'
import Image from 'next/image'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
export default function Endorse({ endorsementID, close }: any) {

    const [ pages, setPages ] = useState(0)
    const [ message, setMessage ] = useState(false)
    const [ userid, setUserId ] = useState("")


    useEffect(() => {
        const cookies = Cookies.get("ghs_access_token")
        if (cookies) {
            const { userID }: any = jwtDecode(cookies)
            setUserId(userID)
        }
    }, [])

    const limit = 10


    const { loading, data, error } = useQuery(endorseTo, {
        variables: {
            limit: limit,
            offset: pages * limit
        },
        onError: error => {
            console.log(error.message)
        }
    })

    const [ createEndorse, { data: dataEndorse } ] = useMutation(CreateEndorse)

    const sendEndorsement = (e: any) => {
        e.preventDefault()
        createEndorse({
            variables: {
                endorsementId: endorsementID,
                companyId: e.target.value,
                userId: userid
            },
            onCompleted: data => {
                setMessage(true)
            },
            onError: error => {
                console.log(error.message)
            }
        })
    }

    useEffect(() => {
        setTimeout(() => {
            setMessage(false)
        }, 1500)
    }, [ message ])

    return (
        <div className={styles.container}>
            {dataEndorse && message ? <div className={styles.message}> <Message label={'Successfully Endorse'} status={'success'} message={''} /> </div> : null}
            <div className={styles.header}>
                <h2>Endorse</h2>
                <button onClick={() => close(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d02222" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
            <div className={styles.body}>
                {loading ? "Loading" : data.getEmployerCompany.length === 0 ? "None" : data.getEmployerCompany.map(({ companyID, companyName }: any) => (
                    <div className={styles.company} key={companyID}>
                        <h2>{companyName}</h2>
                        {!dataEndorse ? <button onClick={sendEndorsement} value={companyID}>
                            Endorse
                        </button> : dataEndorse.createEndorse.company[ 0 ].companyID === companyID ? <button onClick={sendEndorsement} value={companyID}>
                            <Image src="/dashboard/send-line.svg" alt="" height={25} width={25} />
                        </button> : <button onClick={sendEndorsement} value={companyID}>
                            Endorse
                        </button>
                        }
                    </div>
                ))
                }
            </div>
            <div className={styles.footer}>
                <button disabled>Prev</button>
                <button>Next</button>
            </div>
        </div>

    )
}
