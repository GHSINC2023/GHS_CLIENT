import React, { useState, useEffect } from 'react'
import styles from '../../../styles/components/dashboard/appli/applicant.module.scss'
import { useMutation } from '@apollo/client'
import Message from '../../message/message'
import { terminateApplication } from '../../../util/applicaiton/application.mutation'
import { useRouter } from 'next/router'

export default function TerminationApplicant({ id, close }: any) {

    const [ deleteSingleUser, { data } ] = useMutation(terminateApplication)
    const [ message, setMessage ] = useState(false)
    const router = useRouter()

    const singleUserForm = (e: any) => {
        e.preventDefault()
        deleteSingleUser({
            variables: {
                applicantId: id
            },
            onCompleted: data => {
                close(false)
                setMessage(true)
                router.push("/")
            },
            onError: error => {
                console.log(error.message)
            },
            refetchQueries: [],
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
                <h2>Termination</h2>
                <p>Are you sure you want to Terminate this application?</p>
                <div className={styles.btnDel}>
                    <button onClick={closeDiv}>Cancel</button>
                    <button type="button" onClick={singleUserForm}>Yes, Terminate</button>
                </div>
            </div>
        </div>
    )
}
