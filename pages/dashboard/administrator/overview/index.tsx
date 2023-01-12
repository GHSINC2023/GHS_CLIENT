import React, { FC } from 'react'
import Dashboard from '../../../../layout/dashboard.layout'
import PageWithLayout from '../../../../layout/page.layout'
import Head from 'next/head'
import styles from '../../../../styles/components/dashboard/overview/overview.module.scss'
import ApplicationChart from '../../../../components/chart/applicationChart'
import EndorsementChart from '../../../../components/chart/endorsementChart'
import { useQuery } from '@apollo/client'
import { getApplications } from '../../../../util/applicaiton/application.query'
import { getAllEndorsement as getEd } from '../../../../util/endorsement/endorsement.query'
import { getCompanyEmloyer } from '../../../../util/user/user.query'
import MainChart from '../../../../components/chart/mainChart'
import { getAllJobCount } from '../../../../util/job/job.query'
import JobPostChart from '../../../../components/chart/jobPostChart'


const Overview: FC = () => {

    const { loading, data: applicationData, error } = useQuery(getApplications)
    const {loading: loadEndorsement, data: endorsementData } = useQuery(getEd)
    const { loading: loadEmployer, data: employerData } = useQuery(getCompanyEmloyer)
    const { loading: loadJob, data: jobData} = useQuery(getAllJobCount)
    

    if(loading || loadEndorsement || loadEmployer || loadJob) return null
    return (
        <div className={styles.container}>
            <Head>
                <title>Overview</title>
            </Head>
            <div className={styles.main}>
                <div className={styles.box}>
                    <h2>Applicants</h2>
                    <span>{applicationData.getAllApplication.length}</span>
                    <ApplicationChart />
                </div>
                <div className={styles.box}>
                  <h2>Endorsement</h2>
                  <span>{endorsementData.getEndorsementAll.length}</span>
                  <EndorsementChart />
                </div>
                <div className={styles.box}>
                    <h2>Post</h2>
                    <span>{jobData.getAllCountJob.length}</span>
                    <JobPostChart />
                </div>
            </div>
            <div className={styles.mainChart}>
                <div className={styles.mChart}>
                    <MainChart />
                </div>
            </div>
        </div>
    )
}



(Overview as PageWithLayout).layout = Dashboard

export default Overview