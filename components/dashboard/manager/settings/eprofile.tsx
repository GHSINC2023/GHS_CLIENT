import React, { useEffect, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { getUserProfile } from '../../../../util/account/profile.query'
import { updateUserProfile } from '../../../../util/account/profile.mutation'
import styles from '../../../../styles/components/dashboard/settings/profile.module.scss'
import Message from '../../../message/message'


interface Profile {
    firstname: string
    lastname: string
    birthday: string
    phone: string
    city?: string
    province?: string
    street?: string
    zipcode?: string
}

export default function Eprofile({ userid }: any) {



    const [ message, setMessage ] = useState(false)
    const [ render, setRender ] = useState(false)

    const { loading, data } = useQuery(getUserProfile, {
        variables: {
            userId: userid
        }
    })

    useEffect(() => {
        if (!render) {
            data.getUserByID.map(({ profile }: any) => {
                profile.map(({ firstname, lastname, birthday, phone, profileAddress }: any) => {
                    if (profileAddress.length === 0) {
                        setUser({
                            firstname: firstname,
                            lastname: lastname,
                            birthday: birthday,
                            phone: phone,
                        })
                    } else {
                        profileAddress.map(({ city, zipcode, province, street }: any) => (
                            setUser({

                                firstname: firstname,
                                lastname: lastname,
                                birthday: birthday,
                                phone: phone,
                                city: city,
                                province: province,
                                zipcode: zipcode, street: street
                            })
                        ))
                    }
                })
            })

            setRender(true)
        }
    }, [ data.getUserByID, render ])

    const [ user, setUser ] = useState<Profile>({
        firstname: "",
        birthday: "",
        city: "",
        lastname: "",
        phone: "",
        province: "",
        street: "",
        zipcode: "",
    })



    const [ updateProfile, { data: updateData } ] = useMutation(updateUserProfile, {
        variables: {
            userId: userid,
            profile: {
                birthday: user.birthday,
                firstname: user.firstname,
                lastname: user.lastname,
                phone: `${user.phone}`
            },
            address: {
                city: user.city,
                province: user.province,
                street: user.street,
                zipcode: user.zipcode
            }
        },
        onCompleted: () => {
            setMessage(true)
        },
        refetchQueries: [ getUserProfile ],
        onQueryUpdated: async (obserableQuery) => {
            return await obserableQuery.refetch()
        }
    })


    const onHandleUserProfile = (e: any) => {
        e.preventDefault()
        updateProfile()
    }


    useEffect(() => {
        setTimeout(() => {
            setMessage(false)
        }, 1000)
    }, [ message ])


    return (
        <>
            {loading ? null : data.getUserByID.map(({ userID, profile }: any) => (
                profile.map(({ firstname, lastname, birthday, phone, profileAddress }: any) => (
                    <form className={styles.container} key={userID}>
                        <h2>Edit Profile</h2>
                        {updateData && message ? <div className={styles.message}>
                            <Message label='Successfully Update' message='' status='success' />
                        </div> : null}
                        <div>
                            <h2 className={styles.h}>Profile</h2>
                            <div className={styles.PAContainer}>
                                <div>
                                    <label>Firstname</label>
                                    <input type="text" defaultValue={firstname} onChange={e => setUser({ ...user, firstname: e.target.value })} />
                                </div>
                                <div>
                                    <label>Lastname</label>
                                    <input type="text" defaultValue={lastname} onChange={e => setUser({ ...user, lastname: e.target.value })} />
                                </div>
                                <div>
                                    <label>Birthday</label>
                                    <input type="date" defaultValue={birthday}
                                        onChange={e => setUser({ ...user, birthday: e.target.value })} />
                                </div>
                                <div>
                                    <label>Phone</label>
                                    <input type="tel" defaultValue={phone}
                                        onChange={e => setUser({ ...user, phone: e.target.value })} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className={styles.h}>Address</h2>
                            {profileAddress.length === 0 ?
                                <div className={styles.PAContainer}>
                                    <div>
                                        <label>Street</label>
                                        <input type="text" onChange={e => setUser({ ...user, street: e.target.value })} />
                                    </div>
                                    <div>
                                        <label>Province</label>
                                        <input type="text" onChange={e => setUser({ ...user, province: e.target.value })} />
                                    </div>
                                    <div>
                                        <label>City</label>
                                        <input type="text" onChange={e => setUser({ ...user, city: e.target.value })} />
                                    </div>
                                    <div>
                                        <label>Zipcode</label>
                                        <input type="text" maxLength={4} onChange={e => setUser({ ...user, zipcode: e.target.value })} />
                                    </div>
                                </div> : profileAddress.map(({ addressID, city, province, street, zipcode }: any) => (
                                    <div className={styles.PAContainer} key={addressID}>
                                        <div>
                                            <label>City</label>
                                            <input type="text" defaultValue={city} onChange={e => setUser({ ...user, city: e.target.value })} />
                                        </div>
                                        <div>
                                            <label>Province</label>
                                            <input type="text" defaultValue={province} onChange={e => setUser({ ...user, province: e.target.value })} />
                                        </div>
                                        <div>
                                            <label>Street</label>
                                            <input type="text" defaultValue={street} onChange={e => setUser({ ...user, street: e.target.value })} />
                                        </div>
                                        <div>
                                            <label>Zipcode</label>
                                            <input type="text" defaultValue={zipcode} maxLength={4} onChange={e => setUser({ ...user, zipcode: e.target.value })} />
                                        </div>
                                    </div>
                                ))}


                        </div>
                        <div className={styles.save}>
                            <button onClick={onHandleUserProfile}>Save</button>
                        </div>
                    </form>
                ))
            ))}
        </>
    )
}
