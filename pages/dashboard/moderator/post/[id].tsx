import React, { FC, useState } from 'react'
import { jobQueries, getJobById } from '../../../../util/job/job.query'
import { client } from '../../../_app'
import Dashboard from '../../../../layout/dashboard.layout'
import PageWithLayout from '../../../../layout/page.layout'
import Image from 'next/image'
import styles from '../../../../styles/components/dashboard/post/id.module.scss'
import Head from 'next/head'
import parse from 'html-react-parser'
import { details } from '../../../../interface/jobs.interface.query'
import Edit from '../../../../components/dashboard/moderator/post/edit'

export const getStaticPaths = async () => {
    const { data: { jobQuery } } = await client.query({
        query: jobQueries
    })

    const paths = jobQuery.map(({ jobPostID }: any) => {
        return { params: { id: jobPostID } }
    })
    return {
        paths, fallback: true
    }
}

export const getStaticProps = async (context: any) => {
    const getId = context.params.id
    const { data: { getJobPostById } } = await client.query({
        query: getJobById,
        variables: {
            jobPostId: getId
        }
    })
    return {
        props: {
            job: getJobPostById
        },
        revalidate: 10
    }
}
const ID: FC = ({ job }: any) => {
    const [ edited, setEdited ] = useState(false)



    return (
        job.map(({ title, jobPostID, details, description, qualification, responsibilities, status }: any) => (
            <div key={jobPostID} className={styles.containter}>
                <Head>
                    <title>{title}</title>
                </Head>
                {edited ? <div className={styles.edit}>
                    <Edit title={title} id={jobPostID} details={details} description={description} responsibilities={responsibilities} qualification={qualification} close={setEdited} open={edited} />
                </div> : null}
                <div className={styles.job}>
                    <div className={styles.header}>
                        <h2>{title}</h2>
                        {status === 'rejected' ? null : <div className={styles.options}>
                            <button onClick={() => setEdited(() => !edited)}>
                                <Image src="/dashboard/edit-pen-2-line.svg" alt="" height={25} width={25} />
                            </button>
                            <span>Edit</span>
                        </div>}
                    </div>
                    <div className={styles.details}>
                        {details.map(({ jobDetailsID, jobType, location, salary, workType }: details) => (
                            <div className={styles.detailsContainer} key={jobDetailsID}>
                                {/* locations */}
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
                                {/* jobTypes */}
                                <div className={styles.jobTypes}>
                                    <Image src="/icon/clock-line.svg" alt="" height={20} width={20} />
                                    {jobType.map((jobtypes) => (
                                        <span key={jobtypes}>{jobtypes}</span>
                                    ))}
                                </div>
                                {/* WorkTypes */}
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
                        <div>
                            <h2>Overview</h2>
                            <p>{description}</p>
                        </div>
                        <div>
                            <h2>Qualifications</h2>
                            <div>{parse(qualification)}</div>
                        </div>
                        <div>
                            <h2>Responsibilities</h2>
                            <div>{parse(responsibilities)}</div>
                        </div>
                    </div>
                </div>
            </div>
        ))
    )
}


(ID as PageWithLayout).layout = Dashboard
export default ID