import React, { useEffect, useState } from 'react'
import styles from '../../styles/components/main/jobs/ids.module.scss'
import Head from 'next/head'
import parse from 'html-react-parser'
import Image from 'next/image'
import { client } from '../_app'
import { getAllJobQuery, getJobById } from '../../util/job/job.query'

import { details } from '../../interface/jobs.interface.query'
import Apply from '../../components/main/apply'

export const getStaticPaths = async () => {
    const { data: { getAllJobPost } } = await client.query({
        query: getAllJobQuery,
    })

    const paths = getAllJobPost.map(({ jobPostID }: any) => {
        return { params: { id: jobPostID } }
    })
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async (context: any) => {
    const getIds = context.params.id
    const { data: { getJobPostById } } = await client.query({
        query: getJobById,
        variables: {
            jobPostId: getIds
        }
    })


    return {
        props: {
            job: getJobPostById
        }
    }
}
export default function ID({ job }: any) {
    const [ apply, setApply ] = useState(false)

    useEffect(() => {
        if (apply) {
            document.body.style.overflowY = 'hidden'
        } else {
            document.body.style.overflowY = 'scroll'
        }
    }, [ apply ])

    const onHandleApplication = () => {
        setApply(() => !apply)
    }
    return (
        job.map(({ title, jobPostID, details, description, qualification, responsibilities }: any) => (
            <div key={jobPostID} className={styles.containter}>
                <Head>
                    <title>{title}</title>
                </Head>
                {apply ?
                    <div className={styles.application}>
                        <Apply jobid={jobPostID} open={apply} close={setApply} />
                    </div> : null}
                <div className={styles.background}></div>
                <div className={styles.cont}>
                    <div className={styles.job}>
                        <div className={styles.header}>
                            <h2>{title}</h2>
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
                        <button onClick={onHandleApplication}>Apply Now</button>
                    </div>
                    <div className={styles.jr}>
                        <div className={styles.header}>
                            <h2>Job Related</h2>
                        </div>
                    </div>
                </div>
            </div>
        ))
    )
}
