import React, { useState, useEffect } from 'react'
import styles from '../../styles/components/dashboard/endorsement/endorse.module.scss'
import { useMutation, useQuery } from '@apollo/client'
import { CreateEndorse } from '../../util/endorse/endorse.mutation'
import Message from '../message/message'
import { endorsementById } from '../../util/endorsement/endorsement.query'

export default function CompanyCard({ name, endorsementID, id, userid, company }: any) {


    const [ message, setMessage ] = useState(false)
    const [ createEndorse, { data } ] = useMutation(CreateEndorse)

    const sendEndorsement = (e: any) => {
        e.preventDefault()
        createEndorse({
            variables: {
                endorsementId: endorsementID,
                companyId: id,
                userId: userid
            },
            onCompleted: () => {
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
        }, 2000)
    }, [ message ])


    return (
        <div className={styles.company}>
            {data && message ? <div className={styles.message}> <Message label={'Successfully Endorsed'} status={'success'} message={''} /> </div> : null}
            <h2>{name}</h2>

            {company.includes(name) ? <button disabled>Endorsed</button> : <button onClick={sendEndorsement}>Endorse</button>}

        </div>
    )
}
