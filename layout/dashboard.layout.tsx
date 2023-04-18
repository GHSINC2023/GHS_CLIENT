
import React, { ReactNode } from 'react'
import dynamic from 'next/dynamic'
import styles from '../styles/components/dashboard/layout.module.scss';

const Header = dynamic(() => import('../components/dashboard/headers'), {
    ssr: false
})
const Sidebar = dynamic(() => import('../components/dashboard/sidebar'), {
    ssr: false
})
interface Props {
    children: ReactNode
}

export default function Dashboard({ children }: Props) {
    return (
        <div className={styles.container}>
            <Sidebar />
            {children}

            {/* <div className={styles.child}>
                <Sidebar />
                <div className={styles.subChild}>
                    <Header />

                </div>
            </div> */}
        </div>
    )
}
