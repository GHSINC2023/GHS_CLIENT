import React, { FC, useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '../../../../styles/components/dashboard/user/create.module.scss'
import Image from 'next/image'
import Message from '../../../message/message'
import { useMutation, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { createUserGHS } from '../../../../util/user/user.mutation'
import { uservalues } from '../../../../util/user/user.enum'

interface UserForm {
    email: string
    password: string
    firstname: string
    lastname: string
    bday: string
    phone: string
}

interface Props {
    closed: any
    opens: any
}

const Create: FC<Props> = ({ closed, opens }) => {
    const [ open, setOpened ] = useState(false)
    const [ message, setMessage ] = useState(false)
    const router = useRouter()
    const [ role, setRoles ] = useState("")
    const [ users, setUser ] = useState<UserForm>({
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        bday: "",
        phone: ""
    })
    const selectRoles = (e: any) => {
        setRoles(() => e.target.dataset.id)
        setOpened(() => !open)
    }
    const [ userSubmit, { data } ] = useMutation<UserForm>(createUserGHS)

    const { loading, data: enumvalues, error } = useQuery(uservalues, {
        variables: {
            name: "roles"
        }
    })

    useEffect(() => {
        setTimeout(() => {
            setMessage(false)
        }, 1000)
    }, [ message ])

    const formSubmitUser = (e: any) => {
        e.preventDefault();
        userSubmit({
            variables: {
                auth: {
                    email: users.email,
                    password: users.password
                },
                role: role,
                profile: {
                    firstname: users.firstname,
                    lastname: users.lastname,
                    phone: `+630${users.phone}`,
                    birthday: users.bday
                },
            },
            onCompleted: data => {
                if (data) {
                    setRoles("")
                    setUser({
                        bday: "",
                        email: "",
                        firstname: "",
                        lastname: "",
                        password: "",
                        phone: "",
                    })
                    role: ""
                    setMessage(() => !message)
                }
            },
            onError: error => {
                console.log(error.message)
            }
        })
    }
    return (
        <div className={styles.container}>
            <Head>
                <title>Create User</title>
            </Head>
            {
                data && message ?
                    <div className={styles.message}>
                        <Message status={'success'} label="Successfully Created" message='You have successfully created an User' />
                    </div> :
                    null
            }
            <form>
                <div className={styles.header}>
                    <h2>Create Users</h2>
                    <button onClick={() => closed(() => !opens)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D02222" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <div className={styles.formEmailPass}>
                    <div className={styles.email}>
                        <label>Email Address</label>
                        <input type="email" value={users.email} onChange={e => setUser({ ...users, email: e.target.value })} placeholder='Email Address' />
                    </div>
                    <div className={styles.pass}>
                        <label>Password</label>
                        <input type="password" value={users.password} onChange={e => setUser({ ...users, password: e.target.value })} placeholder='Password' />
                    </div>
                </div>

                <div className={styles.formContainer}>
                    <div className={styles.firstName}>
                        <label>Firstname</label>
                        <input type="text" value={users.firstname} onChange={e => setUser({ ...users, firstname: e.target.value })} placeholder='Firstname' />
                    </div>
                    <div className={styles.lastName}>
                        <label>Lastname</label>
                        <input type="tex" value={users.lastname} onChange={e => setUser({ ...users, lastname: e.target.value })} placeholder='Lastname' />
                    </div>
                </div>
                <div className={styles.formInfo}>
                    <div className={styles.role}>
                        <label>Role</label>
                        <div className={styles.roles}>
                            <div className={styles.rolesContainer}>
                                <h2>Select: </h2>
                                {role ? <span className={styles.role}>{role}</span> : null}
                            </div>
                            <button type="button" onClick={() => setOpened(() => !open)}>
                                <Image src="/dashboard/caret.svg" alt="" height={25} width={25} />
                            </button>
                        </div>
                        {open ? <ul>
                            {loading ? "Loading" : enumvalues.__type.enumValues.map(({ name }: any) => (
                                <li onClick={selectRoles} data-id={name} key={name}>{name}</li>
                            ))}
                        </ul> : null}
                    </div>
                    <div className={styles.bday}>
                        <label>Birthday</label>
                        <input type="date" value={users.bday} onChange={e => setUser({ ...users, bday: e.target.value })} />
                    </div>
                    <div className={styles.phone}>
                        <label>Phone</label>
                        <input maxLength={10} type="tel" value={users.phone} onChange={e => setUser({ ...users, phone: e.target.value })} placeholder='+63 912345678' />
                    </div>
                </div>
                <div className={styles.btnContainer}>
                    <button onClick={() => router.push("/dashboard/administrator/user")} type='button'>Cancel</button>
                    <button disabled={!users.email || !users.bday || !users.firstname || !users.lastname || !users.password || !users.phone || !role} type="submit" onClick={formSubmitUser}>Save</button>
                </div>
            </form>
        </div>
    )
}

export default Create