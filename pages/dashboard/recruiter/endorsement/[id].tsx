import React, { FC, useState, useEffect } from 'react'
import styles from '../../../../styles/components/dashboard/endorsement/view.module.scss'
import { endorsementById, getAllEndorsement, endorsementComment } from '../../../../util/endorsement/endorsement.query'
import { commentEndorsement } from '../../../../util/endorsement/endorsement.mutation'
import { format } from 'date-fns'
import { client } from '../../../_app'
import { useMutation } from '@apollo/client'
import { getEndorsementFeed } from '../../../../util/endorse/endorse.query'
import { formatDistance } from 'date-fns'
import Message from '../../../../components/message/message'
import PageWithLayout from '../../../../layout/page.layout'
import Dashboard from '../../../../layout/dashboard.layout'
import Head from 'next/head'
import dynamic from 'next/dynamic'

const Endorse = dynamic(() => import("../../../../components/dashboard/recruiter/endrosement/endorse"), {
    ssr: false
})


export const getStaticPaths = async () => {
    const { data: { getEndorsementAll } } = await client.query({
        query: getAllEndorsement
    })

    const paths = getEndorsementAll.map(({ endorsementID }: any) => {
        return { params: { id: endorsementID } }
    })
    return {
        paths, fallback: true
    }
}


export const getStaticProps = async (context: any) => {
    const getId = context.params.id
    const { data: { getEndorsementById } } = await client.query({
        query: endorsementById,
        variables: {
            endorsementId: getId
        },

    })
    const { data: { getEndorsementCommnet } } = await client.query({
        query: endorsementComment,
        variables: {
            endorsementId: getId
        },
    })

    const { data: { getEndorsementFeedback } } = await client.query({
        query: getEndorsementFeed,
        variables: {
            endorsementId: getId
        },
    })

    return {
        props: {
            endorsement: getEndorsementById,
            comments: getEndorsementCommnet,
            feedback: getEndorsementFeedback
        }
    }
}

const EndorseviewView: FC = ({ endorsement, comments, feedback }: any) => {
    const [ endorse, setEndorse ] = useState(false)
    const [ comment, setComment ] = useState("")
    const [ message, setMessage ] = useState(false)
    const [ id, setId ] = useState("")


    useEffect(() => {
        endorsement.map(({ endorsementID }: any) => {
            setId(endorsementID)
        })
    }, [ endorsement ])

    useEffect(() => {
        setTimeout(() => {
            setMessage(false)
        }, 2000)
    }, [])

    const [ createComment, { data } ] = useMutation(commentEndorsement)


    const submitCommentForm = (e: any) => {
        e.preventDefault()
        createComment({
            variables: {
                endorsementId: id,
                comments: {
                    message: comment,
                    notes: ""
                }
            },
            onCompleted: () => {
                setMessage(true)
            },
            refetchQueries: [ {
                query: endorsementById,
                variables: {
                    endorsementId: id
                }
            } ],
            onQueryUpdated: (observableQuery) => {
                return observableQuery.refetch()
            }
        })
    }

    useEffect(() => {
        setTimeout(() => setMessage(false), 2000)
    }, [ message ])
    return (
        <div className={styles.container}>
            {endorse ? <div className={styles.end}>
                <Endorse endorsementID={id} close={setEndorse} />
            </div> : null}
            {
                data && message ? <div> <Message label={"Successfully create a Comment"} status={'success'} message={''} /> </div> : null
            }
            <div className={styles.endorse}>
                <div className={styles.body}>
                    <div className={styles.endorse}>
                        <h2>Personal Information</h2>
                        <button onClick={() => setEndorse(() => !endorse)}>Endorse</button>
                    </div>
                    <div className={styles.newTable}>
                        <table>
                            {
                                endorsement.map(({ endorsementID, Status, createdAt, endorseBy, applicants }: any) => (
                                    applicants.map(({ applicantProfile, email }: any) => (
                                        applicantProfile.map(({ firstname, lastname, birthday, phone }: any) => (
                                            <tbody key={endorsementID}>
                                                <Head>
                                                    <title>{`${firstname} ${lastname}`}</title>
                                                </Head>
                                                <tr>
                                                    <th>Email</th>
                                                    <td>{email}</td>
                                                </tr>
                                                <tr>
                                                    <th>Name</th>
                                                    <td>{firstname} {lastname}</td>
                                                </tr>
                                                <tr>
                                                    <th>Birthday</th>
                                                    <td>{format(new Date(birthday), "MMMM dd, yyyy")}</td>
                                                </tr>
                                                <tr>
                                                    <th>Phone</th>
                                                    <td>{phone.includes(+63) ? phone.substring(3, 13) : phone}</td>
                                                </tr>
                                                <tr>
                                                    <th>Status</th>
                                                    <td className={styles.status}>
                                                        {Status}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Endorse Date</th>
                                                    <td>{format(new Date(createdAt), "MMMM dd, yyyy")}</td>
                                                </tr>
                                                {endorseBy.map(({ profile }: any) => (
                                                    profile.map(({ profileID, firstname, lastname }: any) => (
                                                        <tr key={profileID}>
                                                            <th>Endorse By</th>
                                                            <td>{firstname} {lastname}</td>
                                                        </tr>
                                                    ))
                                                ))}
                                            </tbody>
                                        ))
                                    ))
                                ))
                            }
                        </table>
                    </div>
                </div>
                {comments.length === 0 ?
                    < div className={styles.formContainer}>
                        <form onSubmit={submitCommentForm}>
                            <textarea placeholder='Comment Here' value={comment} onChange={e => setComment(e.target.value)} />
                            <button disabled={!comment} type="submit">Save</button>
                        </form>
                    </div>
                    :

                    comments.map(({ commentID, message }: any) => (
                        <div key={commentID} className={styles.comments}>
                            <h2>Comment</h2>
                            <span>{message}</span>
                        </div>
                    ))
                }
            </div>
            <div className={styles.feedback}>
                <div className={styles.headers}>
                    <h2>Employer Feedback</h2>
                </div>
                <div className={styles.body}>
                    {feedback.map(({ endorseID, endorseStatus, feedback, company }: any) => (
                        <div className={styles.bodyContainer} key={endorseID} >
                            {
                                feedback.map(({ feedbackID, feedback, createdAt }: any) => (
                                    <div className={styles.feedcontainer} key={feedbackID}>
                                        <div className={styles.info}>
                                            {company.map(({ companyName }: any) => (
                                                <div className={styles.hel} key={companyName}>
                                                    <h2>{companyName}</h2>
                                                    <span>
                                                        {endorseStatus === "approved" ? "Approved" : null}
                                                        {endorseStatus === "rejected" ? "Rejected" : null}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className={styles.feed}>
                                            <span>{feedback}</span>
                                        </div>
                                        < span className={styles.date}>{formatDistance(new Date(createdAt), new Date(), { addSuffix: true })}</span>
                                    </div>
                                ))
                            }

                        </div>
                    ))}
                </div>
            </div >
        </div >
    )
}

(EndorseviewView as PageWithLayout).layout = Dashboard
export default EndorseviewView
