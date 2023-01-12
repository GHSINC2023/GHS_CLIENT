import React, { FC, useState } from 'react'
import PageWithLayout from '../../../../layout/page.layout'
import Dashboard from '../../../../layout/dashboard.layout'
import Head from 'next/head'
import styles from '../../../../styles/components/dashboard/settings/settings.module.scss'
import { tabs } from '../../../../util/values/filter'
import User from '../../../../components/dashboard/admin/settings/user'
import jwtDecode from 'jwt-decode'

const Settings: FC = ({ userid }: any) => {
    const [ tab, setTabs ] = useState("user")

    const changeTabValue = (e: any) => {
        setTabs(e.target.value)
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Settings</title>
            </Head>
            <div className={styles.header}>
                <h2>Settings</h2>
            </div>
            <User userid={userid} />
        </div >
    )
}

(Settings as PageWithLayout).layout = Dashboard
export default Settings

export const getServerSideProps = async (context: any) => {
    const cookies = context.req.cookies['ghs_access_token']
    const { userID }: any = jwtDecode(cookies)
    return {
        props: {
            userid: userID
        }
    }
}
