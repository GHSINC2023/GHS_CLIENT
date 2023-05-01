import Head from 'next/head'
import React, { FC, useEffect, useState } from 'react'
import Dashboard from '../../../../layout/dashboard.layout'
import PageWithLayout from '../../../../layout/page.layout'
import styles from '../../../../styles/components/dashboard/notification/ids.module.scss'
import { notificationAllQuery, notificationById } from '../../../../util/notifications/notification.query'
import { jobStatusMutation } from '../../../../util/job/job.mutation'
import { Details } from '../../../../interface/edit.interface'
import { statused } from '../../../../util/values/filter'
import { client } from '../../../_app'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import parse from 'html-react-parser'
import Image from 'next/image'

export const getStaticPaths = async () => {

    const { data: { getAllNotification } } = await client.query({
        query: notificationAllQuery,
    })

    const paths = getAllNotification.map(({ notificationID }: any) => {
        return { params: { id: notificationID } }
    })

    return {
        paths, fallback: true
    }
}

export const getStaticProps = async (context: any) => {
    const getId = context.params.id
    const { data: { getNotificationID } } = await client.query({
        query: notificationById,
        variables: {
            notificationId: getId
        }
    })

    return {
        props: {
            notifications: getNotificationID
        },
        revalidate: 10
    }
}

const Notification: FC = ({ notifications, role }: any) => {
    const router = useRouter()

    const [ statuses, setStatus ] = useState(false)
    const [ id, setID ] = useState("")

    useEffect(() => {
        notifications.map(({ notificationJob }: any) => {
            notificationJob.map(({ jobPostID }: any) => {
                setID(jobPostID)
            })
        })
    }, [ id, notifications ])

    const [ updateJobAndNotif ] = useMutation(jobStatusMutation)
    const updateNotificationStatus = (e: any) => {
        updateJobAndNotif({
            variables: {
                jobPostId: id,
                status: e.target.value
            },
            onCompleted: data => {
                router.back()
            },

        })
    }


    if (router.isFallback) {
        return <div>Loading...</div>
    }
    return (
        <div className={styles.container}>
            {notifications.map(({ notificationID, user, notificationJob }: any) => (
                user.map(({ profile }: any) => (
                    notificationJob.map(({ details, title, description, qualification, responsibilities, status }: any) => (
                        <div className={styles.notificationCard} key={notificationID}>
                            <Head>
                                <title>{title}</title>
                            </Head>
                            <div className={styles.header}>
                                <div className={styles.headerSub}>
                                    <h2>{title}</h2>
                                    {profile.map(({ firstname, lastname }: any) => (
                                        <span key={firstname}> {lastname}, {firstname}</span>
                                    ))}
                                </div>
                                {status === "waiting" ? <div className={styles.headerSubBtn}>
                                    <button className={statuses === true ? styles.active : styles.normal} onClick={() => setStatus(() => !statuses)}>
                                        {status === "inProgress" ? "In Progress" : null}
                                    </button>
                                    {statuses ? <div className={styles.statusedChanged}>
                                        {statused.map(({ value, name }) => (
                                            <button onClick={updateNotificationStatus} key={name} value={value}>{name}</button>
                                        ))}
                                    </div> : null}
                                </div> : null}
                            </div>
                            <div className={styles.details}>
                                {details.map(({ jobDetailsID, location, jobType, workType, salary }: Details) => (
                                    <div className={styles.detailsContainer} key={jobDetailsID}>
                                        <div className={styles.location}>
                                            <Image src="/icon/map-marker-line.svg" alt="" height={20} width={20} />
                                            <div className={styles.loc}>
                                                {location.map((locations) => (
                                                    <span key={locations}>
                                                        {locations}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className={styles.jobTypes}>
                                            <Image src="/icon/clock-line.svg" alt="" height={20} width={20} />
                                            {jobType.map((jobtypes) => (
                                                <span key={jobtypes}>{jobtypes}</span>
                                            ))}
                                        </div>
                                        <div className={styles.workType}>
                                            <Image src="/icon/briefcase.svg" alt="" height={20} width={20} />
                                            {workType.map((workType) => (
                                                <span key={workType}>{workType}</span>
                                            ))}
                                        </div>
                                        <div className={styles.salary}>
                                            <Image src="/icon/money-line.svg" alt="" height={20} width={20} />
                                            <span>{salary}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className={styles.body}>
                                <div className={styles.overview}>
                                    <h2>Overview</h2>
                                    <p>{description}</p>
                                </div>
                                <div className={styles.qualitification}>
                                    <h2>Qualification</h2>
                                    <div>{parse(qualification)}</div>
                                </div>
                                <div className={styles.responsibilities}>
                                    <h2>Responsibilities</h2>
                                    <div>{parse(responsibilities)}</div>
                                </div>
                            </div>

                        </div>
                    ))
                ))
            ))}
        </div>
    )
}

(Notification as PageWithLayout).layout = Dashboard
export default Notification
