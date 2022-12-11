import React, { FC } from 'react'
import Dashboard from '../../../../layout/dashboard.layout'
import PageWithLayout from '../../../../layout/page.layout'
import Head from 'next/head'


const Settings: FC = () => {
    return (
        <div>
            <Head>
                <title>Settings</title>
            </Head>
        </div>
    )
}


(Settings as PageWithLayout).layout = Dashboard

export default Settings