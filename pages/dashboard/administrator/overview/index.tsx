import React, { FC } from 'react'
import Dashboard from '../../../../layout/dashboard.layout'
import PageWithLayout from '../../../../layout/page.layout'
import Head from 'next/head'
const Overview: FC = () => {
    return (
        <div>
            <Head>
                <title>Overview</title>
            </Head>
        </div>
    )
}



(Overview as PageWithLayout).layout = Dashboard

export default Overview