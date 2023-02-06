import React, { useState, useEffect } from 'react'
import styles from '../../../../styles/components/dashboard/user/delete.module.scss'
import { useMutation } from '@apollo/client'
import { deleteUserById } from '../../../../util/user/user.mutation'
import Message from '../../../message/message'
import { getUserByProfileID, getUserRoles } from '../../../../util/user/user.query'


export default function DeleteUser({ id, close }: any) {

    const [ deleteSingleUser, { data } ] = useMutation(deleteUserById)
    const [ message, setMessage ] = useState(false)

    const singleUserForm = (e: any) => {
        e.preventDefault()
        deleteSingleUser({
            variables: {
                userId: id
            },
            onCompleted: data => {
                close(() => "")
                setMessage(true)
            },
            onError: error => {
                console.log(error.message)
            },
            refetchQueries: [ getUserRoles ],
            onQueryUpdated: async (observableQuery) => {
                return await observableQuery.refetch()
            }
        }
        )
    }
    const closeDiv = () => {
        close(() => "")
    }

    useEffect(() => {
        setTimeout(() => {
            setMessage(false)
        }, 1500)
    }, [ message ])
    return (
        <div className={styles.container}>
            {data && message ?
                <div>
                    <Message label='Successfully Deleted User' message='' status={'success'} />
                </div> :
                null
            }
            <div className={styles.box}>
                <h2>Delete</h2>
                <p>Are you sure you want to delete this user?</p>
                <div className={styles.btnDel}>
                    <button onClick={closeDiv}>Cancel</button>
                    <button type="button" onClick={singleUserForm}>Yes, Delete</button>
                </div>
            </div>
        </div>
    )
}
