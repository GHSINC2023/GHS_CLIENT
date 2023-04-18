import React, { useEffect, useRef, useState } from 'react'
import styles from '../../../../styles/components/dashboard/post/card.module.scss'
import DeleteCard from '../../card/deleteCard'
import Message from '../../../message/message'
import jwtDecode from 'jwt-decode'
import Cookies from 'js-cookie'
import { statused } from '../../../../util/values/filter'
import { useRouter } from 'next/router'
import { jobStatusMutation } from '../../../../util/job/job.mutation'
import { useMutation } from '@apollo/client'
import { format, addDays, formatDuration, intervalToDuration } from 'date-fns'
import { createArchiveJob } from '../../../../util/archive/archive.mutation'

export default function CardPost({ id, title, description, status, author, createdAt }: any) {
    const router = useRouter()


    const [ jobID, setJobID ] = useState("")
    const [ deleteID, setDeleteID ] = useState("")
    const [ roles, setRoles ] = useState("")

    const [ dateArch ] = useState(format(addDays(new Date(createdAt), 30), "MMMM dd, yyyy"))


    useEffect(() => {
        const cookies = Cookies.get("ghs_access_token")
        if (cookies) {
            const { role }: any = jwtDecode(cookies)
            setRoles(role)
        }
    }, [])
    const [ message, setMessage ] = useState(false)

    const handleOptionIDRef = useRef<HTMLDivElement>(null)
    const handleOptionClick = () => {
        setJobID(() => id)
        if (id === jobID) {
            setJobID(() => "")
        }
    }


    const [ createArchive ] = useMutation(createArchiveJob)

    useEffect(() => {
        if (format(new Date(createdAt), "MMMM dd, yyyy") === dateArch) {
            createArchive({
                variables: {
                    jobPostId: id
                }
            })
        } else {
            formatDuration(intervalToDuration({
                start: new Date(createdAt),
                end: new Date(dateArch)
            }), {
                delimiter: ', ',
            })

        }
    }, [ createArchive, createdAt, dateArch, id ])


    useEffect(() => {
        const handleClick = (e: any) => {
            if (handleOptionIDRef.current && !handleOptionIDRef.current.contains(e.target)) {
                let clicks = 0;
                clicks++;
                if (clicks === 1) {
                    setTimeout(() => {
                        setJobID("")
                    }, 100)
                }
            }
        }

        document.addEventListener("mousedown", handleClick)
        return () => {
            document.removeEventListener("mousedown", handleClick)
        }
    }, [ jobID ])

    const [ statusUpdate, { data } ] = useMutation(jobStatusMutation)


    const updateJobStatus = (e: any) => {
        e.preventDefault()
        statusUpdate({
            variables: {
                status: e.target.value,
                jobPostId: id
            },
            onCompleted: () => {
                setMessage(true)
            },
            onQueryUpdated: (observableQuery) => {
                return observableQuery.refetch()
            },
            fetchPolicy: "network-only",

        })
    }

    useEffect(() => {
        setTimeout(() => {
            setMessage(false)
        }, 1500)
    }, [ message ])
    return (
        <div key={id} className={styles.card}>
            {deleteID === id ? <div className={styles.delete}>
                <DeleteCard jobids={id} close={setDeleteID} />
            </div> : null}
            {data && message ? <div className={styles.message}> <Message label={'Successfully Updated'} status={'success'} message={''} /> </div> : null}
            <div className={styles.cardHead}>
                <h2>{title}</h2>
                {status === "inProgress" ?
                    <div className={styles.options}>
                        <button onClick={handleOptionClick}>
                            <div />
                            <div />
                            <div />
                        </button>
                        {id === jobID ? <div ref={handleOptionIDRef} className={styles.update}>
                            {statused.map(({ name, value }) => (
                                <button onClick={updateJobStatus} key={name} value={value}>
                                    {name}
                                </button>
                            ))}
                        </div> : null}
                    </div> :
                    null
                }
            </div>
            <div className={styles.cardBody}>
                <div className={styles.author}>
                    <h4>Posted By: </h4>
                    <h3>{author}</h3>
                </div>
                <div className={styles.descriptions}>
                    <p>{description.substring(0, 150)}</p>
                </div>
            </div>
            <div className={styles.btnContainer}>
                {/* {status === "rejected" ? null : <button onClick={() => {
                    setDeleteID(() => id)
                    if (id === deleteID) {
                        setDeleteID(() => "")
                    }
                }}>Delete</button>} */}
                <button onClick={() => router.push(`/dashboard/${roles}/post/${id}`)}>View</button>
            </div>
        </div>
    )
}
