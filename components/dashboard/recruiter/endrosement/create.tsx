import React, { useState } from 'react'
import { CreateEndorse } from '../../../../interface/create.interface'
import { useMutation } from '@apollo/client'
import { endorsementCreate } from '../../../../util/endorsement/endorsement.mutation'
import { useRouter } from 'next/router'
import styles from '../../../../styles/components/dashboard/endorsement/create.module.scss'
import Head from 'next/head'
import Message from '../../../message/message'

export default function Create({ userid, close }: any) {

    const router = useRouter()
    const [ create, setCreate ] = useState<CreateEndorse>({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        birthday: "",
        city: "",
        province: "",
        zipcode: "",
        street: ""
    })
    const [ createdEndorsement, { data } ] = useMutation(endorsementCreate)


    const formsubmit = (e: any) => {
        e.preventDefault()
        createdEndorsement({
            variables: {
                userId: userid,
                email: create.email,
                profile: {
                    firstname: create.firstname,
                    lastname: create.lastname,
                    phone: `+630${create.phone}`,
                    birthday: create.birthday
                },
                address: {
                    city: create.city,
                    province: create.province,
                    zipcode: create.zipcode,
                    street: create.street
                }

            },
            onCompleted: data => {
                const { createEndorsement } = data;
                router.push(`/dashboard/administrator/endorsement/${createEndorsement.endorsementID}`)
            },
            onError: error => {
                console.log(error)
            }
        })
    }
    return (
        <div className={styles.container}>
            <Head>
                <title>Create Endorsement</title>
            </Head>
            <div className={styles.formContainer}>
                {data ?
                    <div className={styles.message}>
                        <Message status='success' label='Successfully Created' message='You have successfully created an endorsement.' />
                    </div>
                    : null
                }
                <form onSubmit={formsubmit}>
                    <div className={styles.header}>
                        <h2>Create Endorsement</h2>
                        <button onClick={() => close(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D02222" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                    <div className={styles.info}>
                        <div>
                            <label>Firstname</label>
                            <input value={create.firstname} onChange={e => setCreate({ ...create, firstname: e.target.value })} type="text" placeholder='Firstname' />
                            <label>Lastname</label>
                            <input value={create.lastname} onChange={e => setCreate({ ...create, lastname: e.target.value })} type="text" placeholder="Lastname" />
                            <label>Email Address</label>
                            <input value={create.email} onChange={e => setCreate({ ...create, email: e.target.value })} type="email" placeholder="Email Address" />
                            <label>Phone</label>
                            <input maxLength={10} value={create.phone} onChange={e => setCreate({ ...create, phone: e.target.value })} type="tel" placeholder='Phone' />
                            <label>Birthday</label>
                            <input type="date" value={create.birthday} onChange={e => setCreate({ ...create, birthday: e.target.value })} />
                        </div>
                        <div>
                            <label>Street</label>
                            <input type="text" placeholder="street" value={create.street} onChange={e => setCreate({ ...create, street: e.target.value })} />
                            <label>City</label>
                            <input type="text" placeholder='City' value={create.city} onChange={e => setCreate({ ...create, city: e.target.value })} />
                            <label>Province</label>
                            <input type="text" placeholder='Province' value={create.province} onChange={e => setCreate({ ...create, province: e.target.value })} />
                            <label>Zipcode</label>
                            <input type="text" maxLength={4} placeholder='Zipcode' value={create.zipcode} onChange={e => setCreate({ ...create, zipcode: e.target.value })} />
                        </div>
                        <button disabled={!create.firstname || !create.lastname || !create.phone || !create.birthday || !create.city || !create.province || !create.street || !create.zipcode} type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
