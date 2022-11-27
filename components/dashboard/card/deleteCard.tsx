import React from 'react'
import styles from '../../../styles/components/dashboard/card/delete.module.scss'
import { jobDeleteMutation } from '../../../util/job/job.mutation'
import { useMutation } from '@apollo/client'

export default function DeleteCard({ jobids, close }: any) {

    const [ JobPostDelete ] = useMutation(jobDeleteMutation)

    const deleteJobById = (e: any) => {
        e.preventDefault()
        JobPostDelete({
            variables: {
                jobPostId: jobids
            },
            update: (cache) => {
                return cache.modify({
                    fields: {
                        getJobByStatus(existingPost, { readField }) {
                            return existingPost.filter((statusRef: any) => jobids !== readField('jobPostID', statusRef))
                        }
                    }
                })
            }
        })
    }

    const closeDiv = () => {
        close(() => "")
    }

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <h2>Delete</h2>
                <p>Are you sure you want to delete the post?</p>
                <div className={styles.btnDel}>
                    <button onClick={closeDiv}>Cancel</button>
                    <button type="button" onClick={deleteJobById}>Yes, Delete</button>
                </div>
            </div>
        </div>
    )
}
