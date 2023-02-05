import React, { FC, useState } from 'react'
import PageWithLayout from '../../../../layout/page.layout'
import Dashboard from '../../../../layout/dashboard.layout'
import Head from 'next/head'
import styles from '../../../../styles/components/dashboard/settings/settings.module.scss'
import { tabs } from '../../../../util/values/filter'
import jwtDecode from 'jwt-decode'
import Account from '../../../../components/dashboard/admin/settings/account'
import CPass from '../../../../components/dashboard/admin/settings/cpass'
import Log from '../../../../components/dashboard/admin/settings/log'
import Eprofile from '../../../../components/dashboard/admin/settings/eprofile'
import Pin from '../../../../components/dashboard/admin/settings/pin'
const Settings: FC = ({ userid }: any) => {
    const [ tab, setTabs ] = useState("account")

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
            <div className={styles.con}>
                <div className={styles.tabs}>
                    {tabs.map(({ name, value }) => (
                        <button key={name} onClick={changeTabValue}
                            className={value === tab ? styles.active : ""}
                            value={value}>{name}</button>
                    ))}
                </div>
                {tab === "account" ? <Account userid={userid} /> : null}
                {tab === "log" ? <Log userid={userid} /> : null}
                {tab === "cpass" ? <CPass userid={userid} /> : null}
                {tab === "eprof" ? <Eprofile userid={userid} /> : null}
                {tab === "pin" ? <Pin userid={userid} /> : null}
            </div>
        </div >
    )
}

(Settings as PageWithLayout).layout = Dashboard
export default Settings

export const getServerSideProps = async (context: any) => {
    const cookies = context.req.cookies[ 'ghs_access_token' ]
    const { userID }: any = jwtDecode(cookies)
    return {
        props: {
            userid: userID
        }
    }
}
